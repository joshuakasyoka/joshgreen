#!/usr/bin/env node
/**
 * Optimize portfolio images for faster loading.
 *
 * - Resizes images wider/taller than the display max (default 1840px @2x for 920px layout)
 * - Recompresses PNG/JPEG in place (with backup)
 * - Generates WebP siblings for PNG/JPEG (used by OptimizedImage component)
 *
 * Usage:
 *   npm run optimize:images              # optimize + generate webp
 *   npm run optimize:images -- --dry-run # preview savings only
 *   npm run optimize:images -- --max-width 1600 --webp-quality 78
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const BACKUP_DIR = path.join(ROOT, 'public', '.image-backups');

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg']);

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipBackup = args.includes('--skip-backup');
const maxWidth = Number(getArg('--max-width', '1840'));
const maxHeight = Number(getArg('--max-height', '1840'));
const webpQuality = Number(getArg('--webp-quality', '80'));
const jpegQuality = Number(getArg('--jpeg-quality', '82'));
const minSavingsBytes = Number(getArg('--min-savings', '1024'));

function getArg(flag, fallback) {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx === args.length - 1) return fallback;
  return args[idx + 1];
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (RASTER_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function backupFile(filePath) {
  const rel = path.relative(IMAGES_DIR, filePath);
  const backupPath = path.join(BACKUP_DIR, rel);
  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  try {
    await fs.access(backupPath);
  } catch {
    await fs.copyFile(filePath, backupPath);
  }
}

async function optimizeRaster(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalStat = await fs.stat(filePath);
  const originalSize = originalStat.size;

  let pipeline = sharp(filePath, { failOn: 'none', limitInputPixels: false }).rotate();
  let meta;
  try {
    meta = await pipeline.metadata();
  } catch (err) {
    console.warn(`  skip (unreadable): ${path.relative(IMAGES_DIR, filePath)} — ${err.message}`);
    return null;
  }
  const needsResize =
    (meta.width && meta.width > maxWidth) || (meta.height && meta.height > maxHeight);

  if (needsResize) {
    pipeline = pipeline.resize({
      width: maxWidth,
      height: maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  let outputBuffer;
  if (ext === '.png') {
    outputBuffer = await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: meta.hasAlpha ? false : true })
      .toBuffer();
  } else if (ext === '.jpg' || ext === '.jpeg') {
    outputBuffer = await pipeline.jpeg({ quality: jpegQuality, mozjpeg: true }).toBuffer();
  } else if (ext === '.webp') {
    outputBuffer = await pipeline.webp({ quality: webpQuality }).toBuffer();
  } else {
    return null;
  }

  const saved = originalSize - outputBuffer.length;
  const shouldReplace = saved >= minSavingsBytes;

  return {
    kind: 'raster',
    filePath,
    originalSize,
    newSize: shouldReplace ? outputBuffer.length : originalSize,
    saved: shouldReplace ? saved : 0,
    shouldReplace,
    outputBuffer: shouldReplace ? outputBuffer : null,
    dimensions: `${meta.width}x${meta.height}`,
  };
}

async function generateWebp(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SOURCE_EXT.has(ext)) return null;

  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
  const sourceStat = await fs.stat(filePath);

  let pipeline = sharp(filePath, { failOn: 'none', limitInputPixels: false }).rotate();
  let meta;
  try {
    meta = await pipeline.metadata();
  } catch (err) {
    console.warn(`  skip webp (unreadable): ${path.relative(IMAGES_DIR, filePath)} — ${err.message}`);
    return null;
  }
  const needsResize =
    (meta.width && meta.width > maxWidth) || (meta.height && meta.height > maxHeight);

  if (needsResize) {
    pipeline = pipeline.resize({
      width: maxWidth,
      height: maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const webpBuffer = await pipeline.webp({ quality: webpQuality }).toBuffer();
  let previousSize = 0;
  try {
    previousSize = (await fs.stat(webpPath)).size;
  } catch {
    previousSize = 0;
  }

  const baseline = Math.max(previousSize, sourceStat.size);
  const saved = baseline - webpBuffer.length;

  return {
    kind: 'webp',
    filePath: webpPath,
    sourcePath: filePath,
    originalSize: baseline,
    newSize: webpBuffer.length,
    saved: Math.max(0, saved),
    shouldReplace: true,
    outputBuffer: webpBuffer,
  };
}

async function applyResult(result) {
  if (!result || !result.shouldReplace || !result.outputBuffer) return;

  if (!skipBackup && result.kind === 'raster') {
    await backupFile(result.filePath);
  }

  if (!dryRun) {
    await fs.writeFile(result.filePath, result.outputBuffer);
  }
}

async function main() {
  console.log('Portfolio image optimizer');
  console.log(`  dir:         ${IMAGES_DIR}`);
  console.log(`  max size:    ${maxWidth}x${maxHeight}`);
  console.log(`  webp qual:   ${webpQuality}`);
  console.log(`  mode:        ${dryRun ? 'DRY RUN (no files written)' : 'write'}`);
  console.log('');

  let files;
  try {
    files = await walk(IMAGES_DIR);
  } catch (err) {
    console.error(`Could not read ${IMAGES_DIR}:`, err.message);
    process.exit(1);
  }

  if (!files.length) {
    console.log('No images found.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  const rows = [];

  for (const filePath of files.sort()) {
    const rel = path.relative(IMAGES_DIR, filePath);
    const ext = path.extname(filePath).toLowerCase();

    try {
    if (SOURCE_EXT.has(ext)) {
      const rasterResult = await optimizeRaster(filePath);
      if (rasterResult) {
        totalBefore += rasterResult.originalSize;
        totalAfter += rasterResult.newSize;
        if (rasterResult.saved > 0) {
          rows.push({
            rel,
            before: rasterResult.originalSize,
            after: rasterResult.newSize,
            note: rasterResult.dimensions,
          });
          await applyResult(rasterResult);
        }
      }

      const webpResult = await generateWebp(filePath);
      if (webpResult) {
        totalBefore += webpResult.originalSize;
        totalAfter += webpResult.newSize;
        rows.push({
          rel: path.relative(IMAGES_DIR, webpResult.filePath),
          before: webpResult.originalSize,
          after: webpResult.newSize,
          note: 'webp',
        });
        await applyResult(webpResult);
      }
    } else if (ext === '.webp') {
      const rasterResult = await optimizeRaster(filePath);
      if (rasterResult && rasterResult.saved > 0) {
        totalBefore += rasterResult.originalSize;
        totalAfter += rasterResult.newSize;
        rows.push({
          rel,
          before: rasterResult.originalSize,
          after: rasterResult.newSize,
          note: 'webp recompress',
        });
        await applyResult(rasterResult);
      }
    }
    } catch (err) {
      console.warn(`  failed: ${rel} — ${err.message}`);
    }
  }

  console.log('Optimized files:');
  if (!rows.length) {
    console.log('  (nothing to change — images already within targets)');
  } else {
    for (const row of rows) {
      const pct = row.before ? Math.round((1 - row.after / row.before) * 100) : 0;
      console.log(
        `  ${row.rel}\n    ${formatBytes(row.before)} → ${formatBytes(row.after)} (−${pct}%)${row.note ? ` · ${row.note}` : ''}`
      );
    }
  }

  console.log('');
  console.log(`Total: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}`);
  console.log(`Saved: ${formatBytes(Math.max(0, totalBefore - totalAfter))}`);

  if (!dryRun && !skipBackup) {
    console.log(`\nOriginals backed up to public/.image-backups/`);
  }

  if (dryRun) {
    console.log('\nRe-run without --dry-run to apply changes.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Optimize portfolio videos for faster loading.
 *
 * - Converts .mov → H.264 .mp4 (better web support, much smaller)
 * - Recompresses existing .mp4 when savings are meaningful
 * - Strips audio (portfolio videos are muted)
 * - Caps width at 1840px (2× the 920px display max)
 * - Updates src references automatically when extensions change
 *
 * Requires ffmpeg: brew install ffmpeg
 *
 * Usage:
 *   npm run optimize:videos
 *   npm run optimize:videos:dry-run
 *   npm run optimize:videos -- --crf 30 --max-width 1280
 */

import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const BACKUP_DIR = path.join(ROOT, 'public', '.video-backups');
const SRC_DIR = path.join(ROOT, 'src');
const VIDEO_EXT = new Set(['.mov', '.mp4']);

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipBackup = args.includes('--skip-backup');
const skipRefs = args.includes('--skip-refs');
const maxWidth = Number(getArg('--max-width', '1840'));
const crf = Number(getArg('--crf', '28'));
const preset = getArg('--preset', 'medium');
const minSavingsBytes = Number(getArg('--min-savings', '65536'));

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

function requireFfmpeg() {
  const result = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  if (result.status !== 0) {
    console.error('ffmpeg not found. Install with: brew install ffmpeg');
    process.exit(1);
  }
}

async function walk(dir, filterExt = null) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath, filterExt)));
    } else if (!filterExt || filterExt.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

function probeVideo(filePath) {
  const result = spawnSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=width,height,codec_name',
      '-show_entries',
      'format=duration,size',
      '-of',
      'json',
      filePath,
    ],
    { encoding: 'utf8' }
  );

  if (result.status !== 0) return null;

  try {
    const data = JSON.parse(result.stdout);
    const stream = data.streams?.[0] || {};
    const format = data.format || {};
    return {
      width: stream.width || 0,
      height: stream.height || 0,
      codec: stream.codec_name || 'unknown',
      duration: Number(format.duration || 0),
      size: Number(format.size || 0),
    };
  } catch {
    return null;
  }
}

function buildScaleFilter(width) {
  if (!width || width <= maxWidth) return null;
  return `scale='min(${maxWidth},iw)':-2:flags=lanczos`;
}

function encodeVideo(inputPath, outputPath) {
  const meta = probeVideo(inputPath);
  const scale = buildScaleFilter(meta?.width);

  const ffmpegArgs = [
    '-hide_banner',
    '-loglevel',
    'error',
    '-i',
    inputPath,
    '-c:v',
    'libx264',
    '-crf',
    String(crf),
    '-preset',
    preset,
    '-movflags',
    '+faststart',
    '-an',
    '-y',
  ];

  if (scale) {
    ffmpegArgs.splice(ffmpegArgs.indexOf('-movflags'), 0, '-vf', scale);
  }

  ffmpegArgs.push(outputPath);

  const result = spawnSync('ffmpeg', ffmpegArgs, { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(result.stderr?.trim() || 'ffmpeg encode failed');
  }
}

async function backupFile(filePath) {
  const rel = path.relative(IMAGES_DIR, filePath);
  const backupPath = path.join(BACKUP_DIR, rel);
  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  if (!existsSync(backupPath)) {
    await fs.copyFile(filePath, backupPath);
  }
}

function publicPathForFile(filePath) {
  const rel = path.relative(path.join(ROOT, 'public'), filePath).split(path.sep).join('/');
  return `/${rel}`;
}

async function updateSourceReferences(oldPublicPath, newPublicPath) {
  if (oldPublicPath === newPublicPath) return [];

  const sourceFiles = await walk(SRC_DIR);
  const updated = [];

  for (const file of sourceFiles) {
    if (!/\.(js|jsx|ts|tsx|json)$/.test(file)) continue;
    const original = await fs.readFile(file, 'utf8');
    if (!original.includes(oldPublicPath)) continue;

    const next = original.split(oldPublicPath).join(newPublicPath);
    if (!dryRun) {
      await fs.writeFile(file, next);
    }
    updated.push(path.relative(ROOT, file));
  }

  return updated;
}

function targetOutputPath(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  return path.join(dir, `${base}.mp4`);
}

async function optimizeVideo(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const rel = path.relative(IMAGES_DIR, filePath);
  const outputPath = targetOutputPath(filePath);
  const tempPath = `${outputPath}.optimizing.tmp.mp4`;
  const originalStat = await fs.stat(filePath);
  const meta = probeVideo(filePath);

  if (!meta) {
    console.warn(`  skip (unreadable): ${rel}`);
    return null;
  }

  if (dryRun) {
    encodeVideo(filePath, tempPath);
    const newStat = await fs.stat(tempPath);
    await fs.unlink(tempPath).catch(() => {});

    const saved = originalStat.size - newStat.size;
    const extensionChanged = ext === '.mov';
    const oldPublicPath = publicPathForFile(filePath);
    const newPublicPath = publicPathForFile(outputPath);

    return {
      rel,
      before: originalStat.size,
      after: newStat.size,
      saved,
      shouldReplace: saved >= minSavingsBytes || extensionChanged,
      meta,
      oldPublicPath,
      newPublicPath,
      extensionChanged,
      removesOriginal: extensionChanged && filePath !== outputPath,
    };
  }

  encodeVideo(filePath, tempPath);
  const newStat = await fs.stat(tempPath);
  const saved = originalStat.size - newStat.size;
  const extensionChanged = ext === '.mov';
  const shouldReplace = saved >= minSavingsBytes || extensionChanged;

  if (!shouldReplace) {
    await fs.unlink(tempPath);
    return {
      rel,
      before: originalStat.size,
      after: originalStat.size,
      saved: 0,
      shouldReplace: false,
      meta,
      oldPublicPath: publicPathForFile(filePath),
      newPublicPath: publicPathForFile(filePath),
      extensionChanged: false,
      removesOriginal: false,
    };
  }

  if (!skipBackup) {
    await backupFile(filePath);
  }

  if (filePath !== outputPath && existsSync(outputPath)) {
    await fs.unlink(outputPath);
  }

  await fs.rename(tempPath, outputPath);

  if (filePath !== outputPath) {
    await fs.unlink(filePath);
  }

  return {
    rel,
    before: originalStat.size,
    after: newStat.size,
    saved,
    shouldReplace: true,
    meta,
    oldPublicPath: publicPathForFile(filePath),
    newPublicPath: publicPathForFile(outputPath),
    extensionChanged,
    removesOriginal: filePath !== outputPath,
  };
}

async function main() {
  requireFfmpeg();

  console.log('Portfolio video optimizer');
  console.log(`  dir:       ${IMAGES_DIR}`);
  console.log(`  max width: ${maxWidth}px`);
  console.log(`  crf:       ${crf}`);
  console.log(`  preset:    ${preset}`);
  console.log(`  mode:      ${dryRun ? 'DRY RUN (temp encodes only)' : 'write'}`);
  console.log('');

  const files = (await walk(IMAGES_DIR, VIDEO_EXT)).sort();
  if (!files.length) {
    console.log('No videos found.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  const rows = [];
  const refUpdates = new Set();

  for (const filePath of files) {
    const rel = path.relative(IMAGES_DIR, filePath);
    process.stdout.write(`Processing ${rel}...\n`);

    try {
      const result = await optimizeVideo(filePath);
      if (!result) continue;

      if (result.shouldReplace) {
        totalBefore += result.before;
        totalAfter += result.after;
        rows.push(result);

        if (result.extensionChanged && !skipRefs) {
          const updatedFiles = await updateSourceReferences(result.oldPublicPath, result.newPublicPath);
          updatedFiles.forEach((f) => refUpdates.add(f));
        }
      } else {
        console.log(`  kept original (${formatBytes(result.before)} — savings below threshold)`);
      }
    } catch (err) {
      console.warn(`  failed: ${rel} — ${err.message}`);
    }
  }

  console.log('\nOptimized videos:');
  if (!rows.length) {
    console.log('  (nothing changed)');
  } else {
    for (const row of rows) {
      const pct = row.before ? Math.round((1 - row.after / row.before) * 100) : 0;
      console.log(
        `  ${row.rel}\n    ${formatBytes(row.before)} → ${formatBytes(row.after)} (−${pct}%) · ${row.meta.width}x${row.meta.height}${row.extensionChanged ? ' · mov→mp4' : ''}`
      );
    }
  }

  console.log('');
  console.log(`Total: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}`);
  console.log(`Saved: ${formatBytes(Math.max(0, totalBefore - totalAfter))}`);

  if (!dryRun && !skipBackup) {
    console.log('\nOriginals backed up to public/.video-backups/');
  }

  if (refUpdates.size) {
    console.log('\nUpdated references in:');
    [...refUpdates].forEach((file) => console.log(`  ${file}`));
  }

  if (dryRun) {
    console.log('\nRe-run without --dry-run to apply changes.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

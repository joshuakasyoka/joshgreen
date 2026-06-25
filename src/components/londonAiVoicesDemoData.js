export const ACCENT = '#c8ff00';
export const BG = '#000000';

export const FILTER_MODES = ['story', 'sentiment', 'location'];

function seededNoise(i, seed = 1) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function buildTagBarHeights(count = 120) {
  const bars = [];
  const mu = 0.34;
  const sigma = 0.155;

  for (let i = 0; i < count; i += 1) {
    const t = i / Math.max(count - 1, 1);
    const bell = Math.exp(-((t - mu) ** 2) / (2 * sigma ** 2)) * 100;
    const noise = (seededNoise(i) - 0.5) * 7 * (bell / 100);
    const height = Math.round(Math.max(2, bell + noise));

    bars.push(height);
  }
  return bars;
}

const TAG_POOL = [
  'access', 'accountability', 'agriculture', 'algorithms', 'automation', 'bias',
  'care', 'censorship', 'children', 'citizenship', 'climate', 'collaboration',
  'community', 'conflict', 'consent', 'creativity', 'culture', 'cybersecurity',
  'data', 'democracy', 'dignity', 'disability', 'discrimination', 'diversity',
  'economy', 'education', 'employment', 'energy', 'entertainment', 'equality',
  'ethics', 'fairness', 'families', 'finance', 'freedom', 'future', 'governance',
  'health', 'housing', 'humanity', 'identity', 'immigration', 'inclusion',
  'inclusivity', 'inequality', 'infrastructure', 'innovation', 'insurance',
  'integration', 'intelligence', 'intersectionality', 'journalism', 'justice',
  'labor', 'language', 'law', 'leadership', 'learning', 'legacy', 'legislation',
  'literacy', 'livelihood', 'locality', 'logistics', 'loneliness', 'longevity',
  'management', 'marginalization', 'markets', 'media', 'medicine', 'migration',
  'mindfulness', 'misinformation', 'mobility', 'monitoring', 'morality', 'mortality',
  'neighborhood', 'neutrality', 'nutrition', 'obsolescence', 'openness', 'opportunity',
  'oversight', 'participation', 'partnership', 'patients', 'peace', 'policy',
  'politics', 'pollution', 'poverty', 'power', 'prediction', 'prejudice',
  'privacy', 'productivity', 'prosperity', 'protection', 'protest', 'public',
  'quality', 'racism', 'rationing', 'recognition', 'recovery', 'recruitment',
  'reform', 'regulation', 'reliability', 'religion', 'representation', 'research',
  'resilience', 'responsibility', 'retail', 'rights', 'risk', 'robotics',
  'safety', 'science', 'security', 'seniors', 'services', 'skills',
  'society', 'solidarity', 'speech', 'standards', 'stewardship', 'strategy',
  'students', 'surveillance', 'sustainability', 'systems', 'teaching', 'technology',
  'tolerance', 'trade', 'training', 'transparency', 'transport', 'trust',
  'truth', 'unemployment', 'unions', 'urbanism', 'utility', 'values',
  'vulnerability', 'welfare', 'wellbeing', 'wisdom', 'work', 'workforce',
  'workplace', 'youth',
].sort();

function buildTagEntries(count = 120) {
  const heights = buildTagBarHeights(count);
  const labels = TAG_POOL.slice(0, count);

  return labels.map((label, index) => ({
    label,
    height: heights[index],
    count: label === 'fairness' ? 1 : Math.max(1, Math.round(heights[index] / 12)),
  }));
}

export const TAG_ENTRIES = buildTagEntries(120);
export const TAG_BARS = TAG_ENTRIES.map((entry) => entry.height);
export const FAIRNESS_BAR_INDEX = TAG_ENTRIES.findIndex((entry) => entry.label === 'fairness');
export const FAIRNESS_BAR_LABEL = 'justice';

export const getMatchingBarIndices = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return TAG_ENTRIES.map((_, index) => index).filter(
    (index) => TAG_ENTRIES[index].label.toLowerCase().startsWith(q)
  );
};

export const getTagTooltipLabel = (index) => {
  const entry = TAG_ENTRIES[index];
  if (!entry) return '';
  return `${entry.label}: ${entry.count}`;
};

// Tallest bar fills ~45% of chart height — matches the live tag view
export const TAG_BAR_MAX_SCALE = 0.45;

export const getTagBarHeightPercent = (height, maxHeight = Math.max(...TAG_BARS)) =>
  (height / maxHeight) * TAG_BAR_MAX_SCALE * 100;

export const CONTRIBUTION = {
  date: '11/05/2025',
  quote: 'With justice and inclusivity',
  tags: ['justice', 'inclusivity', 'equality', 'fairness'],
  portrait: '/images/web-development/london-ai-voices/contribution-portrait.png',
};

function dist2d(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function buildForceGraph() {
  const coreCount = 68;
  const nodes = [];

  for (let i = 0; i < coreCount; i += 1) {
    const angle = seededNoise(i, 2) * Math.PI * 2;
    const radius = Math.pow(seededNoise(i, 3), 0.7) * 0.24;
    nodes.push({
      x: 0.54 + Math.cos(angle) * radius * 1.35,
      y: 0.5 + Math.sin(angle) * radius * 0.62,
    });
  }

  const outlierPositions = [
    [0.24, 0.38], [0.18, 0.52], [0.26, 0.62], [0.3, 0.28],
    [0.78, 0.36], [0.82, 0.5], [0.76, 0.6], [0.7, 0.66],
    [0.48, 0.24], [0.58, 0.72], [0.38, 0.7], [0.62, 0.22],
    [0.14, 0.46], [0.86, 0.44],
  ];

  outlierPositions.forEach(([x, y]) => {
    nodes.push({ x, y, outlier: true });
  });

  const linkSet = new Set();
  const links = [];
  const addLink = (a, b) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (!linkSet.has(key)) {
      linkSet.add(key);
      links.push([a, b]);
    }
  };

  nodes.forEach((node, i) => {
    const maxDist = node.outlier ? 0.34 : 0.14;
    const neighborCount = node.outlier ? 1 : 3;
    const neighbors = nodes
      .map((other, j) => ({ j, d: i === j ? Infinity : dist2d(node, other) }))
      .filter(({ d }) => d < maxDist)
      .sort((a, b) => a.d - b.d)
      .slice(0, neighborCount);
    neighbors.forEach(({ j }) => addLink(i, j));
  });

  const degree = new Array(nodes.length).fill(0);
  links.forEach(([a, b]) => {
    degree[a] += 1;
    degree[b] += 1;
  });

  return {
    nodes: nodes.map((node, id) => ({
      id,
      x: node.x,
      y: node.y,
      r: Math.min(6.5, Math.max(2.6, 2.2 + degree[id] * 0.75 + (node.outlier ? -0.35 : 0))),
    })),
    links,
  };
}

const FORCE_GRAPH = buildForceGraph();

export const NETWORK_NODES = FORCE_GRAPH.nodes;
export const NETWORK_LINKS = FORCE_GRAPH.links;
export const NETWORK_HIGHLIGHT_NODES = [8, 18, 27, 35];
export const NETWORK_CONTRIBUTION_NODE = NETWORK_HIGHLIGHT_NODES[0];

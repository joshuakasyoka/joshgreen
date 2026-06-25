export const DEMO_ARTIFACTS = [
  {
    id: 14,
    type: 'text',
    water: 2.4,
    generator: 'Visitor',
    created: '25 Apr 2025',
    preview: 'Here is no water but only rock\nRock and no water and the sandy road',
    author: 'T.S. ELIOT',
  },
  {
    id: 13,
    type: 'simulation',
    water: 5.8,
    generator: 'Maya K.',
    created: '24 Apr 2025',
    preview: 'Interactive water simulation',
  },
  {
    id: 12,
    type: 'audio',
    water: 3.1,
    generator: 'Alex T.',
    created: '23 Apr 2025',
    preview: 'Procedural water audio',
  },
  {
    id: 11,
    type: 'text',
    water: 1.9,
    generator: 'Sam R.',
    created: '22 Apr 2025',
    preview: 'From silicon dreams, artifact eleven flows',
  },
  {
    id: 10,
    type: 'simulation',
    water: 4.2,
    generator: 'Priya D.',
    created: '21 Apr 2025',
    preview: 'Grid simulation — dampening 0.42',
  },
  {
    id: 9,
    type: 'audio',
    water: 2.7,
    generator: 'Jon W.',
    created: '20 Apr 2025',
    preview: 'Liquid archive resonance',
  },
];

export const FILTER_TYPES = ['All', 'Text', 'Simulation', 'Audio'];

export const TYPE_SHOWCASE = {
  text: DEMO_ARTIFACTS.find((item) => item.type === 'text'),
  simulation: DEMO_ARTIFACTS.find((item) => item.type === 'simulation'),
  audio: DEMO_ARTIFACTS.find((item) => item.type === 'audio'),
};

export const TOTAL_WATER = DEMO_ARTIFACTS.reduce((sum, item) => sum + item.water, 0);

export const filterArtifacts = (artifacts, { filter = 'All', query = '' }) => {
  const normalized = query.trim().toLowerCase();
  return artifacts.filter((item) => {
    const matchesFilter =
      filter === 'All' || item.type === filter.toLowerCase();
    const matchesQuery =
      !normalized || String(item.id).includes(normalized.replace('#', ''));
    return matchesFilter && matchesQuery;
  });
};

export const GENERATE_NAME = 'Visitor';
export const GENERATE_PREVIEW = {
  id: 15,
  type: 'text',
  water: 2.1,
  generator: GENERATE_NAME,
  created: '25 Apr 2025',
  preview: 'Here is no water but only rock\nRock and no water and the sandy road',
  author: 'T.S. ELIOT',
};

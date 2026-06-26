export const RESEARCH_QUOTE = {
  text: 'If ecology pans the map for a woodland survey, structures loses their crossing review — we were stepping on each other every day.',
  role: 'GIS lead',
  programme: 'HS2 ecology workstream',
};

export const RESEARCH_TRANSCRIPT = {
  role: 'GIS lead',
  programme: 'HS2 ecology workstream',
  lines: [
    {
      id: 'intro',
      speaker: 'Josh',
      text: 'Walk me through how your team uses the programme map day to day.',
    },
    {
      id: 'shared-view',
      speaker: 'GIS lead',
      text: 'We live in the shared Moata view — ecology, structures, and utilities all work from the same programme layers.',
      insights: ['shared Moata view'],
    },
    {
      id: 'josh-change',
      speaker: 'Josh',
      text: 'What happens when one team changes the map?',
    },
    {
      id: 'conflict',
      speaker: 'GIS lead',
      text: 'If ecology pans for a woodland survey, structures loses their crossing review. We were stepping on each other every day.',
      insights: ['stepping on each other every day', 'structures loses their crossing review'],
    },
    {
      id: 'josh-state',
      speaker: 'Josh',
      text: 'So it is the shared state, not the tools?',
    },
    {
      id: 'shared-state',
      speaker: 'GIS lead',
      text: 'Exactly. Everyone needed the same data, but not the same view extent or layer toggles at the same time.',
      insights: ['same view extent or layer toggles'],
    },
    {
      id: 'followup',
      speaker: 'Josh',
      text: 'What would need to change for that to feel safe?',
    },
    {
      id: 'spaces',
      speaker: 'GIS lead',
      text: 'We needed our own space on the programme — same layers, but isolated map state.',
      insights: ['isolated map state'],
    },
    {
      id: 'josh-comments',
      speaker: 'Josh',
      text: 'And once teams had their own space — comments?',
    },
    {
      id: 'comments-close',
      speaker: 'GIS lead',
      text: 'Comments and metadata were a second problem. Feedback was trapped in email until we could anchor threads to the map.',
      insights: ['trapped in email', 'anchor threads to the map'],
    },
  ],
};

export const RESEARCH_FINDINGS = [
  { id: 'shared-state', label: 'Shared map state conflicts', value: 92, priority: true },
  { id: 'isolated-spaces', label: 'No isolated team workspaces', value: 84, priority: true },
  { id: 'email-trap', label: 'Feedback trapped in email', value: 71, priority: false },
  { id: '3d-outside', label: '3D review outside Moata', value: 63, priority: false },
  { id: 'metadata', label: 'Thread metadata missing', value: 58, priority: false },
];

export const WIREFRAME_TEAMS = [
  { id: 'ecology', label: 'Ecology', color: '#22c55e', x: 28, y: 38 },
  { id: 'structures', label: 'Structures', color: '#3b82f6', x: 58, y: 52 },
  { id: 'utilities', label: 'Utilities', color: '#f59e0b', x: 42, y: 68 },
];

export const WIREFRAME_SHARED_MESSAGES = {
  ecology: { initials: 'SP', text: 'Mark corridor?' },
  structures: { initials: 'JM', text: 'Pile coords' },
  utilities: { initials: 'DW', text: 'Route clash' },
};

export const WIREFRAME_SHARED_CONNECTIONS = [
  ['ecology', 'structures'],
  ['structures', 'utilities'],
  ['ecology', 'utilities'],
];

export const WIREFRAME_SPACES = [
  {
    id: 'ecology',
    label: 'Ecology space',
    color: '#22c55e',
    points: [
      { id: 'e1', x: 34, y: 40 },
      { id: 'e2', x: 66, y: 40 },
      { id: 'e3', x: 50, y: 62 },
    ],
    connections: [
      ['e1', 'e2'],
      ['e2', 'e3'],
      ['e1', 'e3'],
    ],
    threads: [
      { initials: 'SP', text: 'Mark this corridor?' },
      { initials: 'KL', text: 'Layer updated' },
    ],
  },
  {
    id: 'structures',
    label: 'Structures space',
    color: '#3b82f6',
    points: [
      { id: 's1', x: 36, y: 44 },
      { id: 's2', x: 50, y: 34 },
      { id: 's3', x: 64, y: 54 },
    ],
    connections: [
      ['s1', 's2'],
      ['s2', 's3'],
    ],
    threads: [
      { initials: 'JM', text: 'Pile coords here' },
      { initials: 'AR', text: 'Pinned on map' },
    ],
  },
  {
    id: 'utilities',
    label: 'Utilities space',
    color: '#f59e0b',
    points: [
      { id: 'u1', x: 40, y: 42 },
      { id: 'u2', x: 60, y: 54 },
    ],
    connections: [
      ['u1', 'u2'],
    ],
    threads: [
      { initials: 'DW', text: 'Route clash?' },
      { initials: 'LT', text: 'Resolved in space' },
    ],
  },
];

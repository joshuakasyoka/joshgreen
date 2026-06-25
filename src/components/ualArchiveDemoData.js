export const DEMO_ARTEFACTS = [
  {
    id: 'a1',
    title: 'Memory Cloth',
    project: 'Intergenerational Weaving',
    tags: { methods: ['participatory'], themes: ['Cultural Identity'] },
    color: '#d8cfc0',
  },
  {
    id: 'a2',
    title: 'Sound Walk Map',
    project: 'Urban Listening',
    tags: { methods: ['audiorecording'], themes: ['Urban Ecology'] },
    color: '#b8cdd9',
  },
  {
    id: 'a3',
    title: 'Shared Table',
    project: 'Community Kitchen',
    tags: { methods: ['participatory'], themes: ['Food Systems'] },
    color: '#c9d4b8',
  },
  {
    id: 'a4',
    title: 'Thread Archive',
    project: 'Intergenerational Weaving',
    tags: { methods: ['participatory'], themes: ['Cultural Identity'] },
    color: '#e2d2c3',
  },
  {
    id: 'a5',
    title: 'Neighbourhood Atlas',
    project: 'Mapping Belonging',
    tags: { methods: ['mapping'], themes: ['Urban Ecology'] },
    color: '#c5c0d8',
  },
  {
    id: 'a6',
    title: 'Voice Collage',
    project: 'Urban Listening',
    tags: { methods: ['audiorecording'], themes: ['Urban Ecology'] },
    color: '#b0c4c8',
  },
  {
    id: 'a7',
    title: 'Recipe Cards',
    project: 'Community Kitchen',
    tags: { methods: ['participatory'], themes: ['Food Systems'] },
    color: '#d4cdb0',
  },
  {
    id: 'a8',
    title: 'Loom Studies',
    project: 'Intergenerational Weaving',
    tags: { methods: ['participatory'], themes: ['Intergenerational Practice'] },
    color: '#dcc8b8',
  },
];

export const DEMO_COLLABORATIONS = [
  {
    id: 'c1',
    title: 'Intergenerational Weaving',
    pills: ['Southwark Fabrics', 'Elder Craft Circle'],
    color: '#d8cfc0',
  },
  {
    id: 'c2',
    title: 'Urban Listening',
    pills: ['Deptford Sound Lab', 'Local History Archive'],
    color: '#b8cdd9',
  },
  {
    id: 'c3',
    title: 'Community Kitchen',
    pills: ['Peckham Food Co-op', 'Camberwell College'],
    color: '#c9d4b8',
  },
  {
    id: 'c4',
    title: 'Mapping Belonging',
    pills: ['Southwark Fabrics', 'Deptford Sound Lab'],
    color: '#c5c0d8',
  },
];

export const DEMO_COLLABORATIONS_BY_PARTNER = [
  {
    id: 'p1',
    title: 'Southwark Fabrics',
    pills: ['Intergenerational Weaving', 'Mapping Belonging'],
    color: '#d8cfc0',
  },
  {
    id: 'p2',
    title: 'Deptford Sound Lab',
    pills: ['Urban Listening', 'Mapping Belonging'],
    color: '#b8cdd9',
  },
  {
    id: 'p3',
    title: 'Elder Craft Circle',
    pills: ['Intergenerational Weaving'],
    color: '#e2d2c3',
  },
  {
    id: 'p4',
    title: 'Peckham Food Co-op',
    pills: ['Community Kitchen'],
    color: '#c9d4b8',
  },
];

export const DEMO_GLOSSARY = {
  Methods: ['participatory', 'audiorecording', 'mapping', 'co-design'],
  Collaborators: ['Southwark Fabrics', 'Deptford Sound Lab', 'Elder Craft Circle'],
};

export const DEMO_GLOSSARY_DEFINITIONS = {
  participatory:
    'A mode of design that actively involves stakeholders, communities, or users in shaping outcomes rather than treating them as passive recipients.',
  audiorecording:
    'The use of recorded sound — interviews, ambient audio, or spoken testimony — as a research and making method.',
  mapping:
    'Spatial and relational methods for tracing connections between people, places, and practices across a project.',
  'co-design':
    'Collaborative design processes where students and partners share authorship over research questions and outcomes.',
  'Southwark Fabrics':
    'A community textile studio partnering with students on intergenerational making workshops.',
  'Deptford Sound Lab':
    'A local audio collective supporting field recording and neighbourhood listening projects.',
  'Elder Craft Circle':
    'A group of older makers sharing craft knowledge with postgraduate design students.',
};

export function filterArtefacts(artefacts, { query = '', activeTag = null } = {}) {
  return artefacts.filter((artefact) => {
    if (activeTag) {
      const tagValues = Object.values(artefact.tags || {}).flat();
      if (!tagValues.some((tag) => tag.toLowerCase().includes(activeTag.toLowerCase()))) {
        return false;
      }
    }
    if (query) {
      const haystack = [artefact.title, artefact.project, ...Object.values(artefact.tags || {}).flat()]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query.toLowerCase())) return false;
    }
    return true;
  });
}

export function filterCollaborations(entries, query = '') {
  if (!query) return entries;
  const q = query.toLowerCase();
  return entries.filter((entry) => {
    const haystack = [entry.title, ...entry.pills].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}

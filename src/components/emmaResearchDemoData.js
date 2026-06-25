export const EMMA_RESEARCH_TRANSCRIPT = [
  {
    speaker: 'GIS specialist',
    text: 'I can write the spatial SQL — but every project admin still asks me to run the same buffer queries.',
    insights: ['every project admin still asks me to run the same buffer queries'],
    attribution: 'GIS lead, infrastructure programme',
  },
  {
    speaker: 'Project admin',
    text: 'I just need to show the site boundary and a consultation zone — I should not have to open a query builder.',
    insights: ['show the site boundary and a consultation zone'],
    attribution: 'Programme manager, regional delivery',
  },
  {
    speaker: 'GIS specialist',
    text: 'The layer tree is deep. Ecology, transport, constraints — finding the right project layers takes longer than the analysis.',
    insights: ['finding the right project layers takes longer than the analysis'],
    attribution: 'Senior spatial analyst',
  },
  {
    speaker: 'Project admin',
    text: 'If I could ask in plain language which layers matter for this corridor, I would not need GIS training.',
    insights: ['ask in plain language which layers matter'],
    attribution: 'Project coordinator',
  },
  {
    speaker: 'GIS specialist',
    text: 'Detailed spatial queries are fine for me — but the platform should not assume everyone wants SQL.',
    insights: ['the platform should not assume everyone wants SQL'],
    attribution: 'GIS lead, infrastructure programme',
  },
];

export const EMMA_RESEARCH_FINDINGS = [
  {
    label: 'Project layers hard to discover in deep layer trees',
    value: 88,
    priority: true,
  },
  {
    label: 'Spatial tools assume GIS specialist expertise',
    value: 85,
    priority: true,
  },
  {
    label: 'Ad-hoc analysis blocked by SQL knowledge gap',
    value: 79,
    priority: false,
  },
  {
    label: 'Simple map views buried in specialist workflows',
    value: 72,
    priority: false,
  },
  {
    label: 'Bundles and working sets unclear to non-GIS roles',
    value: 65,
    priority: false,
  },
];

export const EMMA_FRAMING_NOTES = [
  {
    id: 'layers-1',
    text: 'Which ecology layers exist for this corridor?',
    theme: 'layers',
    left: '1%',
    top: '8%',
    scatterLeft: '68%',
    scatterTop: '10%',
  },
  {
    id: 'layers-2',
    text: 'Transport network for HGV access',
    theme: 'layers',
    left: '1%',
    top: '52%',
    scatterLeft: '8%',
    scatterTop: '18%',
  },
  {
    id: 'spatial-1',
    text: '25 km buffer without opening SQL',
    theme: 'spatial',
    left: '25%',
    top: '8%',
    scatterLeft: '54%',
    scatterTop: '36%',
  },
  {
    id: 'spatial-2',
    text: 'Write the spatial query for me',
    theme: 'spatial',
    left: '25%',
    top: '52%',
    scatterLeft: '22%',
    scatterTop: '44%',
  },
  {
    id: 'simple-1',
    text: 'Just show me the site boundary',
    theme: 'simple',
    left: '49%',
    top: '8%',
    scatterLeft: '74%',
    scatterTop: '52%',
  },
  {
    id: 'simple-2',
    text: 'Draw a consultation zone on the map',
    theme: 'simple',
    left: '49%',
    top: '52%',
    scatterLeft: '12%',
    scatterTop: '62%',
  },
  {
    id: 'discovery-1',
    text: 'Bundle ecology layers for this phase',
    theme: 'discovery',
    left: '73%',
    top: '8%',
    scatterLeft: '58%',
    scatterTop: '70%',
  },
  {
    id: 'discovery-2',
    text: 'Spatial tool is buried in the menu',
    theme: 'discovery',
    left: '73%',
    top: '52%',
    scatterLeft: '30%',
    scatterTop: '82%',
  },
];

export const EMMA_FRAMING_THEMES = {
  layers: { label: 'Layer discovery' },
  spatial: { label: 'Spatial queries' },
  simple: { label: 'Simple map views' },
  discovery: { label: 'Tools & bundles' },
};

export const EMMA_GOVERNANCE_QUOTE = {
  speaker: 'GIS governance lead',
  text: 'If natural language can change the shared map without asking, no one on the programme will trust what they are looking at.',
  insights: ['change the shared map without asking'],
  attribution: 'Regional infrastructure programme',
};

export const EMMA_GOVERNANCE_PERMISSION = {
  title: 'Add Transport Network to layer tree',
  command: 'addLayerGroup("Transport Network")',
};

export const EMMA_GOVERNANCE_RISK_LAYERS = [
  { name: 'Road network', checked: false },
  { name: 'Rail network', checked: false },
  { name: 'Transport Network', checked: false },
];

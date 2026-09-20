export const EMMA_RESEARCH_TRANSCRIPT = [
  {
    speaker: 'GIS specialist',
    text: 'I can write the spatial SQL - but every project admin still asks me to run the same buffer queries.',
    insights: ['every project admin still asks me to run the same buffer queries'],
    attribution: 'GIS lead, infrastructure programme',
  },
  {
    speaker: 'Project admin',
    text: 'I just need to show the site boundary and a consultation zone - I should not have to open a query builder.',
    insights: ['show the site boundary and a consultation zone'],
    attribution: 'Programme manager, regional delivery',
  },
  {
    speaker: 'GIS specialist',
    text: 'The layer tree is deep. Ecology, transport, constraints - finding the right project layers takes longer than the analysis.',
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
    text: 'Detailed spatial queries are fine for me - but the platform should not assume everyone wants SQL.',
    insights: ['the platform should not assume everyone wants SQL'],
    attribution: 'GIS lead, infrastructure programme',
  },
];

export const EMMA_RESEARCH_FINDINGS = [
  {
    label: 'Carbon queries stuck behind specialist reporting tools',
    value: 91,
    priority: true,
  },
  {
    label: 'Land management questions need plain-language entry',
    value: 87,
    priority: true,
  },
  {
    label: 'GIS spatial tools assume specialist expertise',
    value: 84,
    priority: true,
  },
  {
    label: 'Each product inventing its own chat entry points',
    value: 76,
    priority: false,
  },
  {
    label: 'Cross-product answers hard without a shared assistant',
    value: 68,
    priority: false,
  },
];

export const EMMA_FRAMING_NOTES = [
  {
    id: 'gis-1',
    text: 'Keep spatial depth for GIS specialists',
    theme: 'gis',
    left: '1%',
    top: '8%',
    scatterLeft: '68%',
    scatterTop: '10%',
  },
  {
    id: 'gis-2',
    text: 'Plain-language map queries for admins',
    theme: 'gis',
    left: '1%',
    top: '52%',
    scatterLeft: '8%',
    scatterTop: '18%',
  },
  {
    id: 'land-1',
    text: 'Land status without a separate chatbot',
    theme: 'land',
    left: '25%',
    top: '8%',
    scatterLeft: '54%',
    scatterTop: '36%',
  },
  {
    id: 'land-2',
    text: 'Parcel and constraint questions in chat',
    theme: 'land',
    left: '25%',
    top: '52%',
    scatterLeft: '22%',
    scatterTop: '44%',
  },
  {
    id: 'carbon-1',
    text: 'Carbon totals in everyday language',
    theme: 'carbon',
    left: '49%',
    top: '8%',
    scatterLeft: '74%',
    scatterTop: '52%',
  },
  {
    id: 'carbon-2',
    text: 'Scenario compare without specialist tools',
    theme: 'carbon',
    left: '49%',
    top: '52%',
    scatterLeft: '12%',
    scatterTop: '62%',
  },
  {
    id: 'shared-1',
    text: 'One entry point across the suite',
    theme: 'shared',
    left: '73%',
    top: '8%',
    scatterLeft: '58%',
    scatterTop: '70%',
  },
  {
    id: 'shared-2',
    text: 'Same principles, product-specific depth',
    theme: 'shared',
    left: '73%',
    top: '52%',
    scatterLeft: '30%',
    scatterTop: '82%',
  },
];

export const EMMA_FRAMING_THEMES = {
  gis: { label: 'GIS' },
  land: { label: 'Land' },
  carbon: { label: 'Carbon' },
  shared: { label: 'Shared strategy' },
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

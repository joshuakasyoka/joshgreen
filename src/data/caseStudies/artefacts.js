// Artefacts - influencing Mott MacDonald's EMMA initiative to make geospatial
// artefacts its first major artefact type, and defining how artefacts work.
// Demos are modelled on the EMMA interactive demo & motion reference
// (emma-animation-documentation.vercel.app).

const SITUATION = [
  'EMMA - Mott MacDonald\'s new natural language assistant - was a ',
  { text: 'well-funded new initiative' },
  ', and an opportunity to bolster support for older products like Moata Geospatial. I had to sit across teams to establish what a ',
  { text: 'new artefact framework' },
  ' might look like for users.',
];

const TASK = [
  'The task was to convince senior teams that ',
  { text: 'Moata Geospatial and the EMMA initiative were compatible' },
  ' - and to design ',
  { text: 'conversational and multimodal interactions' },
  ' for a new artefact framework: dialogue patterns, prompts and interaction flows that are ',
  { text: 'clear, inclusive and trustworthy' },
  '. That meant exploring several ways to solve the same problem through conversation and natural language, then prototyping and testing them with the teams who would use them - using geospatial as the worked example.',
];

// Illustrative research findings for the deck's first action.
const FINDINGS = [
  'Twenty interviews with GIS specialists, engineers and bid teams, ',
  { text: 'informed by user research and behavioural data' },
  ', surfaced ten recurring GIS use cases people might want from EMMA. Querying map data in plain language came up most and underpinned several others - finding layers, checking buffers, summarising constraints - so it became the first thing we designed for. I then ',
  { text: 'documented the rationale' },
  ' behind each conversation design decision, so non-specialists could follow it, challenge it and build on it.',
];

const LOOP = [
  'Querying map data works as a ',
  { text: 'small loop' },
  ' rather than a single answer: ask in chat, see it on the map, refine it there, and carry that context back into the conversation. Two transitions matter most - ',
  { text: 'chat to map, and map back to chat' },
  ' - and each turn of the loop gets the user closer to their goal.',
];

const LIAISE = [
  'Liaised with the ',
  { text: 'Group AI team' },
  ' to clarify their needs and expectations before decisions were made: better workflows around ',
  { text: 'project bidding' },
  ', and a new artefact framework.',
  { break: true },
  'I saw an opportunity for ',
  { text: 'geospatial artefacts' },
  ' to serve both, and brought the two teams together - EMMA needed the framework articulated; Geospatial needed ',
  { text: 'more users on the platform' },
  '.',
  { break: true },
  'I weighed the positives, negatives and risks of each option, kept decisions at the ',
  { text: 'right level' },
  ', and drew conclusions from evidence that was often incomplete.',
];

const MAKE_THE_CASE = [
  'I prototyped and tested ',
  { text: 'new dialogue patterns, prompts and interaction flows' },
  ' with real users - exploring multiple approaches to solving the same problems through conversation and natural language. The thread was how people might use GIS data from EMMA to ',
  { text: 'inform a project bid' },
  '.',
  { break: true },
  'Querying map data to create an editable table is one example among several: taking GIS data and turning it into ',
  { text: 'summaries and artefacts' },
  ' users can act on. I shared the rationale with teammates and stakeholders as we went, feeding those experiments into ',
  { text: 'AI conversation design principles and reusable dialogue patterns' },
  '.',
];

const FRAMEWORK = [
  'I designed ',
  { text: 'conversational and multimodal' },
  ' experiences that are ',
  { text: 'clear, inclusive and trustworthy' },
  ' - not by hiding what the agent does, but by showing it.',
  { break: true },
  'Breaking an agent action into steps builds trust: it surfaces the ',
  { text: 'workflow a specialist already knows' },
  ', the APIs being called, and how the task breaks down. Creating a borehole is the worked example - the user drops a pin and asks in plain language; EMMA shows each step as it approaches the work, so the user can follow, challenge or stop it.',
];

const DECISION = [
  'By showcasing and demonstrating the ',
  { text: 'value of GIS data for EMMA' },
  ', I helped establish a pattern for artefact interactions - one the EMMA team then chose as their ',
  { text: 'first major artefact type' },
  '.',
  { break: true },
  'I explained and documented the ',
  { text: 'conversation design rationale' },
  ' so non-specialists could follow it, contributed to a community of practice, and shared knowledge across teams to help others build skills in this emerging area - collaborating closely with product, research, engineering and other designers to deliver a ',
  { text: 'joined-up service' },
  '.',
];

const REFLECTION = [
  'I made sure I understood what each team actually needed before pushing a recommendation, kept calls ',
  { text: 'close to the work' },
  ' rather than escalating everything, and left room for people to push back or offer a better idea. The evidence was rarely complete - so I compared options for upside, downside and risk, then committed even when the picture was fuzzy or the answer wasn\'t the popular one.',
];

const artefactsCaseStudy = {
  id: 19,
  name: 'Artefact Framework',
  date: '2026',
  description: 'Bringing diverse stakeholders together around a new artefact framework for Mott MacDonald - and the interactions that make it work.',
  fullDescription: 'Making the case that Moata Geospatial and EMMA, Mott MacDonald\'s new natural language assistant, were compatible - which led the EMMA team to build geospatial artefacts first, on an artefact framework I helped define.',
  website: 'https://emma-animation-documentation.vercel.app/',
  roleHighlights: ['Stakeholder Influence', 'Product Strategy', 'Interaction Design'],
  overview: [...SITUATION, ' ', ...TASK],
  startingPoint: 'EMMA was well funded and new; Moata Geospatial was established. Senior teams needed convincing the two belonged together.',
  outcome: 'The EMMA team chose geospatial artefacts as their first major artefact type, built on an artefact framework covering creation, exchange, actions and moving between artefact and chat.',
  techStack: 'Stack: React, GSAP (Flip, ScrollTrigger, CustomWiggle), Leaflet, CARTO Positron tiles. Motion reference documents each component\'s states and the GSAP behind it.',
  images: [
    {
      demo: 'emma-artefact-panel',
      caption: 'A geospatial artefact opens beside the conversation',
      sectionHeading: 'Prototyping Interactions',
      body: MAKE_THE_CASE,
    },
    {
      demo: 'emma-artefact-sketch',
      caption: 'Context carried from the map into the chat and back',
      sectionHeading: 'Clear, Inclusive, Trustworthy',
      body: FRAMEWORK,
    },
    {
      demo: 'emma-artefact-table',
      caption: 'An editable result table for a sketched area',
      sectionHeading: 'The Decision',
      body: DECISION,
    },
  ],
  caseStudyBlocks: {
    before: [
      {
        id: 'opportunity',
        heading: 'Understanding the Opportunity',
        body: LIAISE,
        demo: 'emma-artefact-open-close',
        caption: 'Opening a geospatial artefact, then closing it again',
      },
    ],
    after: [
      {
        id: 'reflections',
        heading: 'Reflections',
        body: REFLECTION,
      },
    ],
  },
  // Presentation-only structure for /present/artefacts, told as STAR.
  presentation: {
    client: 'Mott MacDonald',
    situation: { body: SITUATION, demo: 'emma-situation-diagram' },
    task: { body: TASK, demo: 'emma-task-diagram' },
    actions: [
      { subLabel: 'Understanding the Opportunity', body: LIAISE, demo: 'emma-artefact-open-close' },
      { subLabel: 'Research Findings', body: FINDINGS, demo: 'artefacts-use-cases' },
      { subLabel: 'The Loop', body: LOOP, demo: 'artefacts-loop' },
      { subLabel: 'Prototyping Interactions', body: MAKE_THE_CASE, demo: 'emma-artefact-table' },
      { subLabel: 'Clear, Inclusive, Trustworthy', body: FRAMEWORK, demo: 'emma-artefact-sketch' },
    ],
    results: { body: DECISION, demo: 'emma-artefact-panel' },
    reflection: { body: REFLECTION, demo: 'emma-reflection-diagram' },
  },
};

export default artefactsCaseStudy;

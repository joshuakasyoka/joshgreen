// Single source of truth for the EMMA case study - used by the portfolio
// case-study view and the /present/emma presentation route.
// Focus: a portfolio-wide natural language strategy that pulled three Moata
// products toward one shared AI surface (EMMA), rather than one-off chatbots.

const SITUATION = [
  'Three Moata products - ',
  { text: 'GIS, land management and carbon accounting' },
  ' - were each drifting toward their own one-off chatbot, even though they sit in the same product suite. Separate entry points, separate tone, separate conversation logic - and no shared way to teach the organisation how to talk to the tools.',
];

const TASK = [
  'The task was to decide whether a ',
  { text: 'single, portfolio-wide approach' },
  ' would serve users and the business better than each product building its own - and to shape ',
  { text: 'conversational and multimodal experiences' },
  ' that stay clear, inclusive and trustworthy across that suite.',
];

const INTERVIEWS = [
  'I grounded the decision in ',
  { text: 'in-depth interviews' },
  ' across a cross-section of the work: product managers, delivery teams and domain specialists - archaeologists, ecologists and engineers from Mott MacDonald - plus deep conversations with Mettle designers already shaping the individual products.',
  { break: true },
  'Those sessions surfaced where natural language would genuinely help, where it would get in the way, and what each product\'s users were actually trying to finish - evidence before strategy, not the other way round.',
];

const WORKSHOPS = [
  'Building on those findings, I facilitated ',
  { text: 'discovery workshops' },
  ' with Mettle Design Studio and Mott MacDonald - keeping the network of product, design and client contacts warm so we could move shared objectives together rather than in parallel.',
  { break: true },
  'I challenged the assumption that each product needed its own chatbot, and compromised where product-specific depth still mattered. The room had to stay ',
  { text: 'open to every opinion and challenge' },
  ' - using people\'s different experiences of GIS, land and carbon, and making sure nobody was shut out of the decision.',
];

const STRATEGY = [
  'I defined a set of ',
  { text: 'common dialogue patterns' },
  ' - reusable prompts, flows and interaction shapes, deliberately varied per product but rooted in the same principles. We prototyped and tested them with the teams who would use them, trying more than one conversational route to the same job before locking anything in.',
  { break: true },
  'Design decisions were written down so product, research, engineering and other designers could ',
  { text: 'see the rationale' },
  ', push back and carry it into their own work - and I stayed approachable when a better idea turned up mid-way.',
];

const GUIDANCE = [
  'The patterns we tested only mattered if teams could ',
  { text: 'pick them up and reuse them' },
  '. I translated what worked into shared libraries, tone-of-voice guidance and conversation design patterns - so GIS, land and carbon were drawing from the same playbook rather than inventing chat from scratch.',
  { break: true },
  'Familiar entry points, goal confirmation, route options and change breakdowns are examples of what landed in that guidance - written so product, research and engineering could ',
  { text: 'apply the pattern' },
  ', not just read about it.',
];

const TRUST = [
  'Where the strategy met the product, multimodal actions had to stay ',
  { text: 'visible and governable' },
  ' - permission cards, structured confirmations and audit traces so users could follow what the assistant was about to do. We tried more than one dialogue pattern for the same job, then kept the ones that stayed ',
  { text: 'clear, inclusive and trustworthy' },
  ' in practice.',
  { break: true },
  'Traceability is what makes that ',
  { text: 'accessible' },
  ': when every step and API call is shown, specialists and non-specialists can follow the same path - and stop or challenge it - without needing to know the system from the inside.',
];

const RESULTS = [
  'That work became the foundation for the ',
  { text: 'Moata Product Suite AI Strategy' },
  ' - a shared library of guidelines, tone-of-voice principles and reusable conversation patterns that stopped each product inventing its own natural language strategy and chat entry points.',
  { break: true },
  'It pulled the separate products toward one central surface: ',
  { text: 'EMMA' },
  '. We also made templates for where natural language should show up inside a user journey, so embedding AI felt like part of the interaction - not a bolt-on chatbot per product.',
];

const REFLECTION = [
  'Getting three product teams to one strategy depended less on the deck and more on ',
  { text: 'how people worked together' },
  ': relationships across Mettle and Mott MacDonald, genuine care for the people carrying the work, and looking after wellbeing when the pressure to ship separate chatbots was high.',
  { break: true },
  'I tried to keep the environment inclusive - every challenge welcome, no voice talked over - and to stay available when someone brought a better idea. Conversation design became a ',
  { text: 'shared discipline' },
  ' because the network held, not because a document said so.',
];

const emmaCaseStudy = {
  id: 10,
  name: 'EMMA Strategy',
  date: '2026',
  description: 'A portfolio-wide natural language strategy that pulled Moata GIS, land management and carbon accounting toward one shared AI surface - EMMA - instead of three one-off chatbots.',
  fullDescription: 'Three Moata products were heading toward separate chatbots. Through interviews, discovery workshops and shared conversation principles, I defined reusable dialogue patterns that became the Moata Product Suite AI Strategy - the foundation for embedding AI centrally through EMMA.',
  website: 'https://emma-animation-documentation.vercel.app/',
  roleHighlights: ['Conversation Design', 'Product Strategy', 'Cross-team Facilitation'],
  overview: [...SITUATION, ' ', ...TASK],
  startingPoint: 'GIS, land management and carbon accounting were each inventing their own chat experience inside one product suite.',
  outcome: 'A shared Moata Product Suite AI Strategy - guidelines, tone principles and reusable patterns - that brought the products toward EMMA as one central AI surface.',
  techStack: 'Stack: discovery interviews and workshops, portfolio conversation strategy, EMMA chat surface on Moata products. AI note: reusable dialogue patterns, governed multimodal actions, RAG over internal sources.',
  images: [
    {
      demo: 'emma-research-quote',
      caption: 'Programme interviews across product and domain',
      sectionHeading: 'Evidence First',
      body: INTERVIEWS,
    },
    {
      demo: 'emma-problem-framing',
      caption: 'Discovery workshops - prioritising the strategy together',
      sectionHeading: 'Design Together',
      body: WORKSHOPS,
    },
    {
      demo: 'emma-chat-exchange',
      caption: 'Goal, routes, change, breakdown, next ask',
      sectionHeading: 'Common Dialogue Patterns',
      body: STRATEGY,
    },
    {
      demo: 'emma-workspace',
      caption: 'A familiar entry point - one pattern written into the shared guidance',
      sectionHeading: 'Patterns into Guidance',
      body: GUIDANCE,
    },
    {
      demo: 'emma-library-diagram',
      caption: 'Shared library sitting over GIS, land and carbon',
      sectionHeading: 'Into EMMA',
      body: RESULTS,
    },
    {
      demo: 'emma-permissions',
      caption: 'Trust before the map changes',
      sectionHeading: 'Clear & Trustworthy',
      body: TRUST,
    },
    {
      demo: 'emma-action-card',
      caption: 'Structured cards for completed actions',
      sectionHeading: 'Dialogue in Practice',
      body: [
        'Prompts and flows were prototyped in real product contexts - layer adds, tool opens, spatial queries - so the reusable patterns weren\'t abstract. Each completed action lands as a ',
        { text: 'structured card' },
        ' in the thread, keeping the exchange scannable and shareable.',
      ],
    },
  ],
  caseStudyBlocks: {
    before: [
      {
        id: 'challenge',
        heading: 'Challenge',
        demo: 'emma-chat-threads',
        caption: 'One suite, risk of three separate chats',
        body: [...SITUATION, { break: true }, ...TASK],
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
  // Presentation-only structure for /present/emma, told as STAR.
  presentation: {
    client: 'Mott MacDonald',
    situation: { body: SITUATION, demo: 'emma-chat-threads' },
    task: { body: TASK, demo: 'emma-insight-graph' },
    actions: [
      { subLabel: 'Evidence First', body: INTERVIEWS, demo: 'emma-research-quote' },
      { subLabel: 'Design Together', body: WORKSHOPS, demo: 'emma-problem-framing' },
      { subLabel: 'Common Dialogue Patterns', body: STRATEGY, demo: 'emma-chat-exchange' },
      { subLabel: 'Patterns into Guidance', body: GUIDANCE, demo: 'emma-workspace' },
      { subLabel: 'Clear & Trustworthy', body: TRUST, demo: 'emma-permissions' },
    ],
    results: {
      body: RESULTS,
      demo: 'emma-library-diagram',
    },
    reflection: { body: REFLECTION, demo: 'emma-two-speeds-diagram' },
  },
};

export default emmaCaseStudy;

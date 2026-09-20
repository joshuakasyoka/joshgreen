// Moata Geospatial - map-native comments for Mott MacDonald's GIS platform.
// Shared by the portfolio case-study view and /present/moata-geospatial.
// Framed around how project teams communicate: clear, trustworthy channels
// on the map instead of email and PowerPoint.
const moataGeospatialCaseStudy = {
  id: 5,
  name: 'Moata Geospatial',
  date: '2026',
  description: 'Lead product design on Moata Geospatial - rebuilding how infrastructure teams communicate on the map, so spatial context and project conversation stay together across 2D and 3D.',
  overview: [
    'Moata Geospatial is ',
    { text: "Mott MacDonald's GIS platform" },
    ' for civil engineering. This case study follows one thread: designing a ',
    { text: 'map-native comments system' },
    ' so teams could talk to each other clearly and honestly on the map - building trust in the platform instead of defaulting to email, external tools and PowerPoint.',
  ],
  fullDescription: 'Moata Geospatial is Mott MacDonald\'s GIS platform for infrastructure programmes. As lead product designer I designed and shipped map-native comments - a clearer digital channel for project communication across 2D and 3D, shaped around how different disciplines actually talk to each other.',
  website: 'https://add-layers.vercel.app/',
  startingPoint: 'Spatial context and project talk had come apart - teams left the map to communicate elsewhere. Interviews showed workspaces had to ship before metadata, panels or 3D commenting could matter.',
  outcome: 'Project spaces, map-anchored comments with audit trails, a processing panel, and unified 2D/3D commenting - each layer making communication on the platform clearer, easier to follow, and worth using.',
  techStack: 'Product design, interaction design, prototyping, motion design.',
  roleHighlights: ['Communication Design', 'Product Strategy', 'Cross-discipline Facilitation'],
  images: [
    {
      demo: 'moata-blank-screen',
      caption: 'Moata Geospatial - shared workspace',
      sectionHeading: 'Challenge',
      body: [
        "Teams weren't commenting in the GIS platform - they ",
        { text: 'defaulted to email, external tools, and PowerPoint' },
        '. Spatial context and project conversation came apart. The job was to introduce a ',
        { text: 'better method of communicating' },
        ' on the map itself - clear enough to trust, simple enough that complex programme issues stayed easy to follow.',
      ],
    },
    {
      demo: 'moata-research-quote',
      caption: 'User interviews - shared map pain',
      sectionHeading: 'User Interviews',
      body: [
        'I spoke with GIS admins, specialists and technicians alongside ecology, archaeology and engineering experts - programmes from under 200 to over 500 people. The brief was to stay ',
        { text: 'open-minded and impartial' },
        ', respect the different interests in the room, and understand how each discipline actually talks on a live job - not how we wished they would.',
      ],
    },
    {
      demo: 'moata-problem-wireframe',
      caption: 'Problem framing - shared map structure',
      sectionHeading: 'Problem Framing',
      body: [
        'What people feared was simple once we said it plainly: ',
        { text: 'comments would get lost' },
        ', the audit trail was weak, and there was no way to filter the noise. Underneath that, every discipline - ecology, structures, utilities, archaeology - ',
        { text: 'shared the same map space' },
        ', so individual needs got buried.',
        { break: true },
        'Explaining that structural problem without jargon mattered - so project leads and specialists could see the same picture. What they needed was confidence that ',
        { text: 'team-level conversation' },
        ' could happen without disrupting, or being disrupted by, the rest of the programme.',
      ],
    },
    {
      demo: 'moata-spaces',
      caption: 'Create and switch between project spaces',
      sectionHeading: 'Project spaces',
      body: [
        'We introduced ',
        { text: 'Project Spaces' },
        ' - a digital channel that let teams pull layers into a private or shared environment scoped to their workstream. It took individual needs seriously: ecology could talk about ecology without shouting across the whole map. That became the foundation for the ',
        { text: 'comments infrastructure' },
        ' that followed - better communication for the money than another bolt-on tool.',
      ],
    },
    {
      demo: 'moata-map-comment',
      caption: 'Place a comment from the draw toolbar',
      sectionHeading: 'Comments on the Map',
      body: [
        'Most users ',
        { text: "didn't know commenting was even possible" },
        '. A persistent toolbar made the next step obvious - comment on a feature, coordinate or layer - so the invitation to talk on the map was ',
        { text: 'clear and hard to miss' },
        '. Language and placement on the UI mattered as much as the feature itself.',
      ],
    },
    {
      demo: 'moata-insight-graph',
      caption: 'Research synthesis - collaboration blockers ranked',
      sectionHeading: 'What we heard',
      body: [
        'With spaces shipping, I went back to the interviews and ranked what still blocked good communication. Shared map state had been the loudest message; once that was addressed, we could hear the next layer - metadata, panels, 3D parity - and ',
        { text: 'improve where the conversation still failed' },
        '.',
      ],
    },
    {
      demo: 'moata-comments',
      caption: 'Map comment - status and metadata',
      sectionHeading: 'Comment Metadata',
      body: [
        'Comments alone were not enough - a message without status or history is hard to trust. Working with project leads, we co-defined a ',
        { text: 'metadata model' },
        ' so threads stayed followable: status, task links, coordinates, type, activity. When the news was difficult - a clash, a delay, a rejected mark-up - the record had to stay ',
        { text: 'clear and sensitive' },
        ', not lost in a chat scroll.',
      ],
    },
    {
      demo: 'moata-comments-panel',
      caption: 'Open a comment in the side panel',
      sectionHeading: 'Comments panel',
      body: [
        'Users also needed a ',
        { text: 'permanent home for the conversation' },
        ' - not only pins on the canvas. A right-hand panel brought threads into a searchable list: open a card for the full exchange, properties and audit trail, still beside the map. Complex programme talk, made ',
        { text: 'easy to scan and understand' },
        '.',
      ],
    },
    {
      demo: 'moata-comments-grid',
      caption: 'Filter comments and widen the panel for a grid view',
      sectionHeading: 'Filter & Scan',
      body: [
        'Rather than a separate filter screen, users drag the panel wider and cards reflow into a ',
        { text: 'two-column grid' },
        '. Another way to read the same conversation - so teams can monitor what is open at a glance and act where communication is stalling.',
      ],
    },
    {
      demo: 'moata-model-viewer',
      caption: 'Comment on 3D assets in the model viewer',
      sectionHeading: '2D and 3D Unified',
      body: [
        'Teams were still exporting feedback from ',
        { text: 'Rhino and Grasshopper' },
        ' because 3D had no equal voice on the platform. Unifying comments across 2D and 3D meant one digital channel instead of parallel workarounds - making the most of what Moata already was, rather than asking people to buy or learn another tool.',
      ],
    },
    {
      demo: 'moata-tabs',
      caption: 'Tab system - switch between panels',
      sectionHeading: 'Panel Tabs',
      body: [
        'A small change with a large effect on how people talk day to day: ',
        { text: 'tabbed panels' },
        ' so users move between comments, layers and tools without losing their place. Less friction in the channel means more of the real conversation stays on the map.',
      ],
    },
    {
      demo: 'moata-map-pins',
      caption: 'Comment threads across the programme map',
      sectionHeading: 'Map at Scale',
      body: [
        'Project Spaces gave teams room to talk in smaller groups; project managers still needed a ',
        { text: 'unified view' },
        ' across the programme. The comments infrastructure supports both - granular conversation where people need it, and oversight when the whole picture matters - so communication scales without losing clarity.',
      ],
    },
  ],
  caseStudyBlocks: {
    after: [
      {
        id: 'reflections',
        heading: 'Reflection',
        body: [
          'Getting multidisciplinary teams to leave email for the map meant building ',
          { text: 'trust through clearer communication' },
          ' - saying hard things simply, staying open to conflicting interests, and checking whether the new channel was actually working.',
          { break: true },
          'We watched how people used spaces, panels and 3D comments after each release, and adjusted when the message still wasn\'t landing. The lasting shift was not a feature list; it was bringing ',
          { text: 'project conversation back onto the map' },
          ' in a way people could follow.',
        ],
      },
    ],
  },
};

// Presentation-only structure, told as STAR. The case study's first section
// (Challenge) sets the situation, its last (Map at Scale) is the result, and
// everything between is an action.
const sections = moataGeospatialCaseStudy.images;
const challenge = sections.find((section) => section.sectionHeading === 'Challenge');
const atScale = sections.find((section) => section.sectionHeading === 'Map at Scale');

moataGeospatialCaseStudy.presentation = {
  client: 'Mott MacDonald',
  situation: { body: challenge.body, demo: challenge.demo },
  task: {
    body: [
      'As lead product designer, the task was to design a ',
      { text: 'map-native comments system' },
      ' that made project communication ',
      { text: 'clear, trustworthy and easy to follow' },
      ' - so teams would talk on the map across 2D and 3D instead of splitting spatial work from conversation.',
    ],
    demo: 'moata-task-diagram',
  },
  actions: sections
    .filter((section) => section !== challenge && section !== atScale)
    .map((section) => ({ subLabel: section.sectionHeading, body: section.body, demo: section.demo })),
  results: { body: atScale.body, demo: atScale.demo },
  reflection: { demo: 'moata-reflection-diagram' },
};

export default moataGeospatialCaseStudy;

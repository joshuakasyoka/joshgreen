// Project Review - a tool for running the monthly project control meeting,
// designed from the MPR discovery study (Discovery repo, studies/mpr).
// Public copy: counts and paraphrased guidelines only - no participants,
// roles or quotes. App figures and actions are illustrative.
// Framed around delivering a new product at pace through effective decisions:
// clear ownership in the review, evidence-led calls, and shipping a loop
// that starts each month where the last one ended.

const SITUATION = [
  'Every month, each project holds a control review - safety, client, scope, deliverables, money and actions. Ten discovery interviews showed the process scored well on compliance, yet was described as ',
  { text: 'a paper trail nobody acts on' },
  ': inputs assembled by hand, the meeting an update on work already done, and commitments rebuilt from email afterwards. Roles were unclear, priorities got lost between months, and nobody owned the follow-through.',
];

const TASK = [
  'Design and ship a tool for running the review ',
  { text: 'month to month' },
  ' - fast enough for a live programme, clear enough that everyone knows their role, and honest about whether a project is healthy. The product had to ',
  { text: 'prompt a better conversation' },
  ' and turn commitments into tracked work, without adding bureaucracy that would slow delivery.',
];

const RESEARCH = [
  'I clarified what stakeholders needed before locking the shape of the product - running interviews through the same research pipeline as Win Room: 292 observations, 76 themes, ',
  { text: '50 findings and 16 design guidelines' },
  ', each counted by participant. From incomplete and sometimes conflicting evidence I pulled three configurations to build first: pre-fill and verify, capture and follow through, and prompt the conversation - ',
  { text: 'decisions close to the work' },
  ', not escalated for the sake of process.',
];

const PROMPT = [
  'The agenda is the meeting, so each section opens with ',
  { text: 'discussion points' },
  ' that set priorities and expectations in plain language - not a blank form. Sections are marked as discussed as the review moves on, and before it closes the tool flags anything ',
  { text: 'not yet covered' },
  '. That keeps ownership visible in the room and gets a better conversation out of people without writing it for them.',
];

const PREFILL = [
  'Figures arrive from the ',
  { text: 'systems of record' },
  ' before the meeting - the right resource for a timely review - set against last month so movement stands out. Gaps are ',
  { text: 'flagged rather than left blank' },
  ', every value shows its source, and compliance with how project data should be handled sits in the design rather than as a later patch. Decisions in the room rest on interpretable data, not a scramble of spreadsheets.',
];

const CAPTURE = [
  'Actions are captured in the meeting, assigned and ',
  { text: 'sent to their owner' },
  ' - roles and responsibilities made explicit while the decision is still warm. When the next month opens they wait under Last month\'s actions, where the team records ',
  { text: 'whether they actually happened' },
  '. Performance expectations are reviewed in the open; success is visible when an action closes.',
];

const RESULTS = [
  'A new product shipped as a loop rather than a form: pre-filled, discussed, captured and carried forward - so ',
  { text: 'each month starts where the last one ended' },
  '. Timely quality outcomes from clear process standards, the right data in the room, and decisions that did not wait for perfect certainty.',
];

const REFLECTION = [
  'Building this quickly meant deciding with evidence that was never complete - weighing upside, downside and risk, inviting challenge on the three configurations, and committing when the popular answer was still "another spreadsheet".',
  { break: true },
  'One template had to stretch from a ten-minute review to a major programme. Treating that ',
  { text: 'variation as a design input' },
  ' kept delivery moving instead of designing for an average that does not exist. The sample leaned towards oversight roles, so the people who run projects day to day are ',
  { text: 'the next to test with' },
  ' - and the next place to adjust expectations.',
];

const monthlyProjectReviewCaseStudy = {
  id: 21,
  name: 'Project Review',
  date: '2026',
  description: 'A new product for the monthly project review - shipped at pace through clear ownership, evidence-led decisions, and a loop that starts each month where the last one ended.',
  fullDescription: 'Project Review turns the monthly control meeting from a paper trail into a delivery loop: figures pre-filled from systems of record, an agenda that sets priorities in the room, and actions owned through to the next month. Built from ten discovery interviews and 16 design guidelines - a product designed and decided quickly without cutting the quality of the call.',
  roleHighlights: ['Delivery at Pace', 'Effective Decisions', 'Product Design'],
  overview: [
    'Project Review is a tool for running the ',
    { text: 'monthly project control meeting' },
    ' - built quickly from discovery evidence and sixteen guidelines, around one idea: ',
    { text: 'each month should start where the last one ended' },
    '.',
  ],
  startingPoint: 'The monthly review scored on compliance but failed on delivery - unclear ownership, hand-assembled inputs, and commitments that died in email.',
  outcome: 'A review loop shipped at pace: pre-filled figures, prompted conversation, owned actions, and a record that carries into next month.',
  techStack: 'Discovery interviews, thematic analysis, design guidelines, interaction design, prototyping.',
  images: [
    { demo: 'mpr-situation', caption: 'The monthly review today', sectionHeading: 'The Review Today', body: SITUATION },
    { demo: 'mpr-task', caption: 'Three configurations from 16 guidelines', sectionHeading: 'The Task', body: TASK },
    { demo: 'mpr-research', caption: 'From interviews to guidelines', sectionHeading: 'Research', body: RESEARCH },
    { demo: 'mpr-agenda', caption: 'Work down the agenda; see what is not yet covered', sectionHeading: 'Prompt the Conversation', body: PROMPT },
    { demo: 'mpr-data', caption: 'Figures pre-filled, gaps flagged, sources shown', sectionHeading: 'Pre-fill and Verify', body: PREFILL },
    { demo: 'mpr-actions', caption: 'An action captured in October, closed in November', sectionHeading: 'Capture and Follow Through', body: CAPTURE },
    { demo: 'mpr-cycle', caption: 'The monthly loop', sectionHeading: 'The Monthly Loop', body: RESULTS },
  ],
  caseStudyBlocks: {
    after: [
      {
        id: 'reflections',
        heading: 'Reflection',
        body: REFLECTION,
        demo: 'mpr-scale',
        caption: 'One tool, very different reviews',
      },
    ],
  },
  presentation: {
    client: 'Mott MacDonald',
    situation: { body: SITUATION, demo: 'mpr-situation' },
    task: { body: TASK, demo: 'mpr-task' },
    actions: [
      { subLabel: 'Research', body: RESEARCH, demo: 'mpr-research' },
      { subLabel: 'Prompt the Conversation', body: PROMPT, demo: 'mpr-agenda' },
      { subLabel: 'Pre-fill and Verify', body: PREFILL, demo: 'mpr-data' },
      { subLabel: 'Capture and Follow Through', body: CAPTURE, demo: 'mpr-actions' },
    ],
    results: { body: RESULTS, demo: 'mpr-cycle' },
    reflection: { body: REFLECTION, demo: 'mpr-scale' },
  },
};

export default monthlyProjectReviewCaseStudy;

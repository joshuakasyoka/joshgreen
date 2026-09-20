// Win Room - discovery research into how Mott MacDonald finds, pursues and
// wins work, run through the Discovery research pipeline.
//
// Public copy: method and aggregate counts only. No participant ids, roles,
// quotes or client names - the study's source notes may not be quoted as
// participant speech, and its alias maps are re-identification keys.
// Framed around delivering agentic research at pace: clear ownership, gated
// process, secure handling of evidence, and quality on a deadline.

const SITUATION = [
  'Mott MacDonald\'s ',
  { text: 'Win Room' },
  ' programme needed to move fast on how the firm finds, pursues and wins work - without guessing. Before any tool shipped, we had to show how pursuits are ',
  { text: 'actually won today' },
  ', who owns each step, and where a tool could help without slowing the people already under pressure.',
];

const TASK = [
  'The task was discovery research that could keep pace with the programme: conclusions ',
  { text: 'defended line by line' },
  ', every guideline traceable to what someone said, and a process clear enough that researchers, engineers and stakeholders each knew ',
  { text: 'their role and what "done" looked like' },
  '.',
];

const PIPELINE = [
  'I built a ',
  { text: 'study-agnostic research pipeline' },
  ' - eight gated stages from protocol to guidelines - so the work had a standard way of running, not a one-off scramble. Order is enforced; steps that fail silently when run out of sequence are refused. Everyone can see the priorities for the stage they are on, and what they are expected to deliver before the next gate opens.',
];

const INGEST = [
  'Nine interviews with senior pursuit and business development leads were ingested twice: ',
  { text: 'meeting summaries' },
  ' (453 observations) and ',
  { text: 'verbatim transcripts' },
  ' (1,469 paragraphs). Pseudonymising participants and hiding session logistics was non-negotiable - ',
  { text: 'security and privacy requirements' },
  ' sat inside the delivery, not as an afterthought - so sensitive material never counted as evidence.',
];

const PROCESS = [
  'Stitching the interviews gave a ',
  { text: '13-step picture of pursue and win' },
  ', with clear ownership at each gate - decision to pursue, decision to bid, first and second review. The earliest, relationship-led steps have ',
  { text: 'no milestone at all' },
  ', which is where a tool had the most room to help people deliver without inventing process from scratch every time.',
];

const CODEBOOK = [
  'Codes were sorted by one question: ',
  { text: 'would they have said this if no tool were being considered?' },
  ' That standard kept Part A (how pursue and win works today) separate from Part B (what people want from a tool), so performance of the analysis stayed honest - we were not rewarding themes that only appeared because a product was in the room.',
];

const SOURCES = [
  'The transcript codebook (115 codes) was built ',
  { text: 'before the summary codebook (86 codes) was read' },
  ', so neither shaped the other. Where both agree, the theme holds up either way. Ambivalence the summaries dropped - doubts about AI above all - stayed in as counter-cases. When the evidence was awkward, we kept it rather than smoothing the story to look finished sooner.',
];

const REACH = [
  'Most themes surfaced with the ',
  { text: 'first participants' },
  ' - later interviews mainly backed those up rather than inventing a new picture. Counting by people, not mentions, made that pattern visible: early voices set the map; subsequent ones tested whether it held.',
  { break: true },
  'Codes that never left a single voice (38 of 115 in the transcript draft) stayed marked as thin - the first to challenge when deciding what is strong enough to ship as a guideline.',
];

const RESULTS = [
  'On the clock: two independent draft codebooks and a process map, ready for researcher review - ',
  { text: 'timely, quality outcomes' },
  ' with the right tooling behind them. Strongest themes in both sources: work is won before the tender notice, partners fill capability gaps, AI is already in pursuit - and ',
  { text: 'relationships and judgement stay human' },
  '.',
];

const REFLECTION = [
  'Delivering agentic research at pace meant being clear about ownership: ',
  { text: 'scripts count, people judge' },
  '. Tooling enumerates and validates; proposing a code or writing a finding stays with reading. Nothing promotes without review.',
  { break: true },
  'In a tight programme that split of responsibility kept quality up when the volume was hard - and made it easier to ask others to hold the same standard, rather than rush a tidy answer that would not stand up.',
];

const winRoomCaseStudy = {
  id: 20,
  name: 'Win Room',
  date: '2026',
  description: 'Agentic discovery research into how Mott MacDonald finds, pursues and wins work - a gated pipeline that kept ownership clear, evidence secure, and findings defensible at pace.',
  fullDescription: 'Nine discovery interviews on pursue-and-win, run through a gated research pipeline: pseudonymised ingest from two sources, clear stage ownership, participant-based counts, and guidelines ready for review without sacrificing security or quality for speed.',
  roleHighlights: ['User Research', 'Research Ops', 'Delivery at Pace'],
  overview: [
    'Discovery research for Mott MacDonald\'s ',
    { text: 'Win Room' },
    ' programme - nine interviews on how pursuits are found, pursued and won, run through a ',
    { text: 'gated research pipeline' },
    ' so the team could deliver defensible findings at pace without cutting corners on privacy or quality.',
  ],
  startingPoint: 'The programme needed pursue-and-win understood fast - with clear ownership of each research stage, and evidence handled to security standards.',
  outcome: 'Two independent draft codebooks, a 13-step process map and themes that hold across both sources - timely quality outputs ready for researcher review.',
  techStack: 'Semi-structured interviews, thematic analysis, a Python research pipeline with agent skills per stage.',
  images: [
    { demo: 'wr-study-frame', caption: 'One question, nine interviews, two sources', sectionHeading: 'The Study', body: SITUATION },
    { demo: 'wr-trace', caption: 'Every guideline traces back to a moment', sectionHeading: 'Traceability', body: TASK },
    { demo: 'wr-pipeline', caption: 'Eight gated stages, paused at codebook review', sectionHeading: 'The Pipeline', body: PIPELINE },
    { demo: 'wr-ingest', caption: 'Raw interview to pseudonymised observations', sectionHeading: 'Ingest & Redaction', body: INGEST },
    { demo: 'wr-process', caption: 'Pursue and win, as the interviews describe it', sectionHeading: 'Mapping the Process', body: PROCESS },
    { demo: 'wr-codebook', caption: 'The sorting rule behind the codebook', sectionHeading: 'Building the Codebook', body: CODEBOOK },
    { demo: 'wr-sources', caption: 'Two drafts, built independently, compared', sectionHeading: 'Two Sources', body: SOURCES },
    { demo: 'wr-reach', caption: 'Early interviews raise most themes; later ones corroborate', sectionHeading: 'Reach, Not Volume', body: REACH },
    { demo: 'wr-themes', caption: 'Themes both drafts agree on', sectionHeading: 'Strongest Themes', body: RESULTS },
  ],
  caseStudyBlocks: {
    after: [
      {
        id: 'reflections',
        heading: 'Reflection',
        body: REFLECTION,
        demo: 'wr-judgement',
        caption: 'Scripts count; people judge',
      },
    ],
  },
  presentation: {
    client: 'Mott MacDonald',
    situation: { body: SITUATION, demo: 'wr-study-frame' },
    task: { body: TASK, demo: 'wr-trace' },
    actions: [
      { subLabel: 'The Pipeline', body: PIPELINE, demo: 'wr-pipeline' },
      { subLabel: 'Ingest & Redaction', body: INGEST, demo: 'wr-ingest' },
      { subLabel: 'Mapping the Process', body: PROCESS, demo: 'wr-process' },
      { subLabel: 'Building the Codebook', body: CODEBOOK, demo: 'wr-codebook' },
      { subLabel: 'Two Sources', body: SOURCES, demo: 'wr-sources' },
      { subLabel: 'Reach, Not Volume', body: REACH, demo: 'wr-reach' },
    ],
    results: { body: RESULTS, demo: 'wr-chat' },
    reflection: { body: REFLECTION, demo: 'wr-judgement' },
  },
};

export default winRoomCaseStudy;

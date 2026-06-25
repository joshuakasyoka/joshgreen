import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import OptimizedImage, { getWebpSrc } from './OptimizedImage';
import ProjectEmbed from './ProjectEmbed';
import DoodlerTableDemo from './DoodlerTableDemo';
import DoodlerNewDoodleDemo from './DoodlerNewDoodleDemo';
import DoodlerEditDoodleDemo from './DoodlerEditDoodleDemo';
import DoodlerJourneyDemo from './DoodlerJourneyDemo';
import DoodlerLibraryDemo from './DoodlerLibraryDemo';
import MoataBlankScreenDemo from './MoataBlankScreenDemo';
import MoataCommentsDemo from './MoataCommentsDemo';
import MoataMapCommentDemo from './MoataMapCommentDemo';
import MoataCommentsPanelDemo from './MoataCommentsPanelDemo';
import MoataCommentsGridDemo from './MoataCommentsGridDemo';
import MoataModelViewerDemo from './MoataModelViewerDemo';
import MoataTimeSliderDemo from './MoataTimeSliderDemo';
import MoataTabsDemo from './MoataTabsDemo';
import MoataMapPinsDemo from './MoataMapPinsDemo';
import MoataResearchQuoteDemo from './MoataResearchQuoteDemo';
import MoataInsightGraphDemo from './MoataInsightGraphDemo';
import MoataProblemWireframeDemo from './MoataProblemWireframeDemo';
import MoataSpacesDemo from './MoataSpacesDemo';
import Moata3dVersionTimelineDemo from './Moata3dVersionTimelineDemo';
import Moata3dVersionPropertiesDemo from './Moata3dVersionPropertiesDemo';
import Moata3dAssetRingDemo from './Moata3dAssetRingDemo';
import Moata3dAssetSelectDemo from './Moata3dAssetSelectDemo';
import MoataAppOverviewDemo from './MoataAppOverviewDemo';
import UalArchiveFilterDemo from './UalArchiveFilterDemo';
import UalArchiveForceGraphDemo from './UalArchiveForceGraphDemo';
import UalArchiveCollaborationsDemo from './UalArchiveCollaborationsDemo';
import UalArchiveGlossaryDemo from './UalArchiveGlossaryDemo';
import LondonAiVoicesTagViewDemo from './LondonAiVoicesTagViewDemo';
import LondonAiVoicesNetworkDemo from './LondonAiVoicesNetworkDemo';
import LondonAiVoicesContributionDemo from './LondonAiVoicesContributionDemo';
import CommunityBoardDemo from './CommunityBoardDemo';
import AIDeploymentGameDemo from './AIDeploymentGameDemo';
import ImageLabelingDemo from './ImageLabelingDemo';
import DigitalWaterGenerateDemo from './DigitalWaterGenerateDemo';
import DigitalWaterArchiveDemo from './DigitalWaterArchiveDemo';
import DigitalWaterSimulationDemo from './DigitalWaterSimulationDemo';
import DigitalWaterTypesDemo from './DigitalWaterTypesDemo';
import EmmaToggleLayersDemo from './EmmaToggleLayersDemo';
import EmmaBundleDemo from './EmmaBundleDemo';
import EmmaSpatialQueryDemo from './EmmaSpatialQueryDemo';
import EmmaActionCardDemo from './EmmaActionCardDemo';
import EmmaPermissionsDemo from './EmmaPermissionsDemo';
import EmmaWorkspaceDemo from './EmmaWorkspaceDemo';
import EmmaChatThreadsDemo from './EmmaChatThreadsDemo';
import EmmaResearchQuoteDemo from './EmmaResearchQuoteDemo';
import EmmaProblemFramingDemo from './EmmaProblemFramingDemo';
import EmmaGovernanceInsightDemo from './EmmaGovernanceInsightDemo';
import CaseStudyNav from './CaseStudyNav';
import FloatingLetters from './FloatingLetters';

const toIndexNavLabel = (text) =>
  String(text).trim().split(/\s+/).filter(Boolean).slice(0, 2).join(' ');

const INLINE_TERM_CLASS = 'case-study-inline-term';

const renderInlineTerm = (text) => (
  <code className={INLINE_TERM_CLASS}>{text}</code>
);

const Portfolio = ({ isDarkMode, toggleDarkMode }) => {
  const [projects] = useState({
    'Creative Projects': [
      { 
        id: 1, 
        name: 'London AI Voices', 
        date: 'May 2025', 
        description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
        overview: [
          'London AI Voices collects citizen perspectives on AI — stories, sentiments, and locations across the city. A submission form would bury ',
          { text: 'how those voices connect' },
          '; I worked through tag, network, and card views until readers could move from themes to individual stories without losing the thread.',
        ],
        fullDescription: 'An interactive website and digital platform designed to collect and visualize citizen voices and perspectives on the subject of Artificial Intelligence, enabling Londoners to share their experiences and concerns about AI development in their communities.', 
        website: 'https://aivoicesmap.vercel.app/',
        startingPoint: 'Londoners needed somewhere to share AI concerns, but the tricky part was showing how voices relate — not just collecting them. The brief started with contribution flow, duplicate risk, and which browse mode answered which reader question.',
        outcome: 'A live archive where readers move from tag frequency to network clusters to individual stories — each mode prototyped until session tests showed people could actually explore, not just submit.',
        techStack: 'React, Next.js, Mapbox, Vercel, Tailwind CSS',
        images: [
          { src: '/images/web-development/london-ai-voices/01.01.png', caption: 'London AI Voices at exhibition' },
          {
            demo: 'laiv-tag-view',
            caption: 'Tag view — browse themes by frequency',
            sectionHeading: 'Explore tags',
            body: [
              'Each contribution is tagged with themes like ',
              { text: 'justice, fairness, and inclusivity' },
              '. The tag view lays those themes out as a bar chart — taller bars mean more voices. Search narrows the set instantly; bar height and hover counts were tuned from tests on which themes readers reached for first.',
            ],
          },
          {
            demo: 'laiv-network',
            caption: 'Network view — see how stories connect',
            sectionHeading: 'See connections',
            body: [
              'Tags answered frequency but not relationship — the network view was the fix. It links contributions that share themes or sentiments: dense nodes show where Londoners\' concerns overlap, outliers surface perspectives a bar chart would bury.',
            ],
          },
          {
            demo: 'laiv-contribution',
            caption: 'Contribution card — read a single voice',
            sectionHeading: 'Read a voice',
            body: [
              'Selecting a bar or node opens the ',
              { text: 'contribution card' },
              ' — portrait, quote, date, and clickable tags. The card view was tuned last from tests on how readers jumped between related themes without losing place in the archive.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'The tricky part was not collecting voices but showing how they connect — duplicate entries and empty search were edge cases to solve before opening the map UI. Shipping each browse mode as working code let us watch where readers stalled and tighten the archive around ',
                { text: 'actual exploration paths' },
                ', not assumed curiosity.',
              ],
            },
          ],
        },
      },
      { 
        id: 2, 
        name: 'Tate Modern Exhibit', 
        date: 'April 2025', 
        description: 'Tate Modern exhibit exploring the water consumption of generative AI', 
        overview: [
          'Database of Digital Water is a Tate Modern installation about AI\'s ',
          { text: 'hidden water cost' },
          '. Visitors create liquid artifacts with measured footprints, archive them, and experience each through text, simulation, or audio — the tricky part was making every mode feel equally clear on a loud gallery floor.',
        ],
        fullDescription: 'An interactive digital exhibit commissioned by Tate Modern that explores and visualizes the significant water consumption and environmental impact of generative AI technologies, revealing the hidden resource costs behind AI training and generation processes.', 
        website: 'https://digital-water-database.vercel.app/',
        startingPoint: 'Tate Modern needed visitors to feel litres, not just read them — the first design question was how to map water cost to ripples, verse, and audio without one mode dominating the plinth.',
        outcome: 'An installation where generation, archive, and simulation each answer the same question differently — balanced from footfall tests on which artifact types people actually opened.',
        techStack: 'React, Three.js, WebGL, Vercel, CSS3',
        images: [
          { src: '/images/web-development/tate-modern/02.01.png', caption: 'Tate Modern exhibit — visitor at the installation' },
          {
            demo: 'dwd-generate',
            caption: 'Generate a liquid artifact',
            sectionHeading: 'Create an artifact',
            body: [
              'Visitors enter their name and choose a ',
              { text: 'text, image, or audio' },
              ' output. Each generation is assigned a ',
              { text: 'water cost in litres' },
              ' — making the invisible resource use of AI creation visible at the point of making.',
            ],
          },
          {
            demo: 'dwd-archive',
            caption: 'Browse the liquid archive',
            sectionHeading: 'Explore the archive',
            body: [
              'Every artifact is stored in the ',
              { text: 'Database of Digital Water' },
              ', with running totals for artifact count and cumulative litres used. Visitors filter by type, search by ID, and browse the grid — the cumulative counters make the exhibition\'s growing cost visible in real time.',
            ],
          },
          {
            demo: 'dwd-simulation',
            caption: 'Interactive water simulation',
            sectionHeading: 'Run the simulation',
            body: [
              'Abstract litres needed a sensory anchor — opening an artifact reveals an ',
              { text: 'interactive water simulation' },
              ' driven by its properties. Visitors start and stop ripples and toggle procedural audio, turning data into something felt, not just read.',
            ],
          },
          {
            demo: 'dwd-types',
            caption: 'Text, simulation, and audio artifacts',
            sectionHeading: 'Three artifact types',
            body: [
              'Each liquid artifact takes one of three forms: ',
              { text: 'text' },
              ' rendered as glowing verse on a dark canvas, ',
              { text: 'simulation' },
              ' as a procedural ripple grid, or ',
              { text: 'audio' },
              ' as generative water sounds. Filtering the archive switches between these distinct modes of experiencing the same underlying water cost.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'The hard question was making litres tangible on a loud gallery floor — I moved between layout and code until generation, archive, and simulation each answered it differently, then used ',
                { text: 'footfall at the plinth' },
                ' to see which artifact types people actually opened.',
              ],
            },
          ],
        },
      },
      { 
        id: 4, 
        name: 'Community AI Tools', 
        date: 'Jan 2025', 
        description: 'Selection of digital tools to enhance community literacy on Algorithm Development', 
        overview: [
          'Community AI Tools walks passers-by through the algorithm lifecycle — problem framing, data labelling, deployment trade-offs. The lifecycle is ',
          { text: 'too abstract' },
          ' for street debate unless each stage becomes something you can argue with; each demo was built as an interactive we could test on the plinth the same week.',
        ],
        fullDescription: 'A curated selection of accessible digital tools and educational resources designed to enhance community literacy and understanding of algorithm development, empowering local communities to participate more effectively in AI governance discussions and decision-making processes.', 
        website: 'https://ai-voices-archive-gb91gago5-josh-greens-projects.vercel.app/',
        startingPoint: 'Communities needed to feel algorithm trade-offs, not read about them — each demo had to answer one lifecycle question legible at arm\'s length, without a facilitator.',
        outcome: 'Three interactives that turn abstract stages into arguable moments — what to optimise for, what labelling costs, what deployment sacrifices.',
        techStack: 'React, Python, TensorFlow, Vercel, Chart.js',
        images: [
          { src: '/images/web-development/community-ai-tools/04.06.png', caption: 'Community AI Tools at exhibition' },
          {
            demo: 'community-board',
            caption: 'Problem framing — collect and rank community complaints',
            sectionHeading: 'Problem framing',
            body: [
              'Before any model trains, someone has to ',
              { text: 'define the problem' },
              '. The community note board lets residents submit concerns, ranks them by importance, and surfaces an AI-generated synthesis — so groups debate what algorithms should optimise for, not just what engineers assumed.',
            ],
          },
          {
            demo: 'ai-deployment-game',
            caption: 'Deployment game — weigh trade-offs as hurdles approach',
            sectionHeading: 'Deployment & integration',
            body: [
              'At the deployment stage, every yes/no choice shifts ',
              { text: 'efficiency, cost, ethics, humanity, and innovation' },
              '. Players answer personalised questions by jumping lanes as hurdles approach — then see a radar chart of their implementation priorities and the trade-offs they made along the way.',
            ],
          },
          {
            demo: 'image-labeling',
            caption: 'Tagging station — label training data from the crowd',
            sectionHeading: 'Data collection & training',
            body: [
              'Before a model can run, someone has to ',
              { text: 'label the data' },
              '. The tagging station pulls auto-uploaded iPhone videos from YouTube, pays microwages per label, and tracks earnings against time — making the hidden labour and environmental cost of training visible to passers-by.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Each civic demo had to solve one abstract lifecycle question at arm\'s length — the constraint was legibility on a plinth, not comprehensiveness. Building in code meant we could ',
                { text: 'test on the street' },
                ' the same week and cut anything that needed a facilitator.',
              ],
            },
          ],
        },
      },

  
    ],
    'Product Design': [
      { 
        id: 5, 
        name: 'Geospatial', 
        date: 'May 2024', 
        description: 'Encouraging safer collaboration on shared Moata maps — from isolated project spaces to map-native comments across 2D and 3D.',
        overview: [
          'On Moata Geospatial, infrastructure teams shared ',
          { text: 'one live map' },
          ' — any pan, layer toggle, or sketch changed the view for everyone. With PM and engineering I worked through isolated project spaces first, then map-native comments and panels until teams could collaborate safely across 2D and 3D.',
        ],
        fullDescription: 'Encouraging safer collaboration on shared Moata maps — from isolated project spaces to map-native comments across 2D and 3D.',
        website: 'https://www.mottmac.com/en/digital-solutions/',
        startingPoint: 'Every team stepped on each other\'s map state — domain interviews showed isolated workspaces had to ship before thread metadata, panel grids, or 3D commenting could matter.',
        outcome: 'Project spaces, map-anchored comments with audit trails, a processing panel, and unified 2D/3D commenting — each layer solving the next collaboration failure we found in QA.',
        techStack: 'Product design, interaction design, prototyping, motion design.',
        images: [
          {
            demo: 'moata-blank-screen',
            caption: 'Geospatial — shared workspace',
            sectionHeading: 'Challenge',
            body: [
              'Large programmes ran on ',
              { text: 'one shared map' },
              '. Any change — view, extent, layers — altered the workspace for every user. Map comments ',
              { text: 'vanished when another team panned away' },
              ', before isolated state or thread metadata could help.',
            ],
          },
          {
            demo: 'moata-research-quote',
            caption: 'Domain interviews — shared map pain',
            sectionHeading: 'Domain Interviews',
            body: [
              'Domain interviews across HS2 workstreams kept surfacing the same pattern — we ',
              { text: 'pulled out the key lines' },
              ' and the same lines came up in every session: one live map meant ecology, structures, and utilities were stepping on each other daily.',
            ],
          },
          {
            demo: 'moata-problem-wireframe',
            caption: 'Problem wireframe — one map to project spaces',
            sectionHeading: 'Shared map conflict',
            body: [
              'A simplified wireframe made the failure mode legible to PM and engineering: three workstreams ',
              { text: 'fighting over one view' },
              '. Project spaces became the first ship — isolated map state spun up from the programme layers, ',
              { text: 'letting each silo communicate on its own map' },
              ' even as cross-team visibility stayed limited.',
            ],
          },
          {
            demo: 'moata-spaces',
            caption: 'Create and switch between project spaces',
            sectionHeading: 'Project spaces',
            body: [
              'We introduced ',
              { text: 'project spaces' },
              ' — isolated workspaces spun up from the main project layers. PM and engineering aligned here first: an ecology team within HS2 could own its layers and map state without breaking the shared programme view everything else depended on.',
            ],
          },
          {
            demo: 'moata-map-comment',
            caption: 'Place a comment from the draw toolbar',
            sectionHeading: 'Comments on the map',
            body: [
              'Comments needed to live where engineers already work — we brought them into the ',
              { text: 'draw toolbar' },
              '. Drop a pin on a feature, layer, or coordinate and discussion stays anchored to what you are looking at, without a separate annotation tool.',
            ],
          },
          {
            demo: 'moata-insight-graph',
            caption: 'Research synthesis — collaboration blockers ranked',
            sectionHeading: 'What we heard',
            body: [
              'With spaces shipping, we revisited interview notes as a ',
              { text: 'ranked set of blockers' },
              '. Shared map state and missing workspaces had topped the list — metadata, panels, and 3D parity were the next layer once teams could collaborate without conflict.',
            ],
          },
          {
            demo: 'moata-comments',
            caption: 'Map comment — status and metadata',
            sectionHeading: 'Comment metadata',
            body: [
              'Comments on their own weren\'t enough — they had to be ',
              { text: 'trackable' },
              '. Co-defined with programme leads: status, task links, coordinates, type, and activity history — without that metadata, threads would be impossible to follow across a live infrastructure programme.',
            ],
          },
          {
            demo: 'moata-comments-panel',
            caption: 'Open a comment in the side panel',
            sectionHeading: 'Comments panel',
            body: [
              'Users also wanted a ',
              { text: 'more permanent home for comments' },
              '. The right-hand panel gathers every thread into a searchable list — open a card to read the full conversation, properties, and audit trail, while keeping the map in view.',
            ],
          },
          {
            demo: 'moata-comments-grid',
            caption: 'Filter comments and widen the panel for a grid view',
            sectionHeading: 'Comments grid',
            body: [
              'Processing many threads meant ',
              { text: 'filtering the feed' },
              ' and giving the panel more room. Users drag the left edge to stretch the comments panel — cards reflow into a ',
              { text: 'two-column grid' },
              ' so they can scan open items without opening each thread.',
            ],
          },
          {
            demo: 'moata-model-viewer',
            caption: 'Comment on 3D assets in the model viewer',
            sectionHeading: '2D and 3D unified',
            body: [
              '2D comments were useless if 3D review still meant Rhino — the hard part was ',
              { text: 'one commenting model' },
              ' across GIS and ACC models. Users anchor feedback to model elements in the viewer, scrub versions, and inspect properties without exporting out.',
            ],
          },
          {
            demo: 'moata-tabs',
            caption: 'Tab system — switch between panels',
            sectionHeading: 'Panel tabs',
            body: [
              'Comments and tools had lived in ',
              { text: 'stacked panels' },
              ', which made context-switching slow. A tabbed side panel lets users jump between layers, tools, and comments in place — add a tab, switch mode, close when done — without resetting the map behind it.',
            ],
          },
          {
            demo: 'moata-map-pins',
            caption: 'Comment threads across the programme map',
            sectionHeading: 'Map at scale',
            body: [
              'At programme scale the map fills with ',
              { text: 'anchored threads' },
              ' — ecology, structures, utilities, each pin tied to coordinates and audit history. Reviewers needed that density on the main map without opening a separate annotations layer.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'One shared map was the root problem — project spaces unlocked everything else. I stayed through build and QA until tab switching and grid resize held under ',
                { text: 'real programme threads' },
                ', not scripted walkthroughs.',
              ],
            },
          ],
        },
      },
      { 
        id: 10, 
        name: 'EMMA', 
        date: '2025', 
        description: 'An internal AI assistant that brings natural-language control to Moata Geospatial — layers, bundles, and spatial tools from a governed side-panel chat.',
        fullDescription: 'EMMA is an internal AI assistant designed with Mott MacDonald to improve how knowledge is discovered, trusted, and shared across a global workforce of over 20,000 employees. A key entry point was embedding EMMA inside Moata Geospatial so engineers could describe GIS tasks in plain language — toggling layers, loading working bundles, running spatial queries — without leaving the map.',
        website: '',
        overview: [
          'GIS on Moata assumed specialist knowledge — deep layer trees, SQL-backed spatial queries, buried analysis tools. We set out to ',
          { text: 'democratise GIS through natural language' },
          ': project admins describe a boundary or zone; GIS specialists still get detailed queries — all from a governed side-panel chat that never silently changes the map.',
        ],
        startingPoint: 'Workshops with GIS leads and project admins surfaced two audiences on one platform — specialists who want SQL depth, admins who just need the right layers and a site boundary. We mapped those intents on post-its before designing consent flows.',
        outcome: 'Layers, bundles, and spatial queries open from conversation — specialists review pre-filled SQL; project admins get plain-language layer discovery — every action gated by permission cards and auditable API traces.',
        techStack: 'Stack: secure enterprise cloud, retrieval over internal corpora, Moata Geospatial integration. AI note: intent detection for layer, bundle, and spatial-query commands; RAG-first answers with mandatory citations; bounded generation for 20k+ employee governance.',
        images: [
          {
            demo: 'emma-workspace',
            caption: 'Ask EMMA from inside the map workspace',
            sectionHeading: 'Natural language on the map',
            body: [
              'EMMA lives in a ',
              { text: 'dockable side panel' },
              ' beside the live map — engineers describe the site problem in plain language, and EMMA interprets the GIS intent before proposing any action. Paired with engineering from day one so the panel met real workspace constraints, not a detached chat window.',
            ],
          },
          {
            demo: 'emma-research-quote',
            caption: 'Programme interview — GIS democratisation',
            sectionHeading: 'Programme interviews',
            body: [
              'Interviews across infrastructure programmes kept returning to the same split — specialists buried in SQL, admins blocked by layer trees. We ',
              { text: 'highlighted transcript lines' },
              ' that shaped the natural-language model: plain requests for boundaries, buffers, and project layers.',
            ],
          },
          {
            demo: 'emma-problem-framing',
            caption: 'Mapping intents workshop — post-it synthesis',
            sectionHeading: 'Problem framing',
            body: [
              'Before wireframes, we ran ',
              { text: 'mapping-intent workshops' },
              ' with GIS specialists and project admins — sticky notes clustered into layer discovery, spatial queries, simple map views, and tool bundles. Two audiences, one platform.',
            ],
          },
          {
            demo: 'emma-chat-threads',
            caption: 'Threaded chats per GIS task',
            sectionHeading: 'Context per project',
            body: [
              'Each geospatial task gets its own ',
              { text: 'conversation thread' },
              ' — substation siting, ecology bundles, spatial queries — so context stays attached to the work, not lost in a single endless chat.',
            ],
          },
          {
            demo: 'emma-governance-insight',
            caption: 'Trust insight — consent before the map changes',
            sectionHeading: 'Design insight',
            body: [
              'Programme interviews surfaced a hard constraint — teams were ',
              { text: 'afraid of natural language taking full control' },
              ' of the shared map. Permissions with an explicit Allow step became the design response: EMMA proposes, the engineer consents, then the API runs.',
            ],
          },
          {
            demo: 'emma-permissions',
            caption: 'Consent before EMMA changes the map',
            sectionHeading: 'Governed changes',
            body: [
              'Silent map mutation was a non-starter — proposed actions surface a ',
              { text: 'permission request card' },
              ' and nothing changes until the engineer taps Allow. The challenge was making governance feel like speed, not friction.',
            ],
          },
          {
            demo: 'emma-toggle-layers',
            caption: '“Bring the transport layers forward”',
            sectionHeading: 'Layers from conversation',
            body: [
              'Once approved, a simple ',
              { text: '“yes”' },
              ' activates road and rail overlays on the live map — confirmed in chat with a structured layer card, no manual search through the layer gallery.',
            ],
          },
          {
            demo: 'emma-action-card',
            caption: 'Confirmation cards inside the thread',
            sectionHeading: 'Structured confirmations',
            body: [
              'Every completed action renders as a ',
              { text: 'structured card' },
              ' in the chat — layer adds show a layers icon; tool opens expose the APIs EMMA ran, expandable for audit and replay.',
            ],
          },
          {
            demo: 'emma-bundle',
            caption: '“Set up an ecologist working bundle”',
            sectionHeading: 'Working sets in one ask',
            body: [
              'Curated ',
              { text: 'layer bundles' },
              ' open pre-selected in Add Layer → Bundles — five ecology constraint layers ready to review and add in a single action, triggered from conversation.',
            ],
          },
          {
            demo: 'emma-spatial-query',
            caption: '“Run a spatial query on the corridor”',
            sectionHeading: 'Analysis tools pre-filled',
            body: [
              'Spatial analysis follows the same pattern — EMMA opens ',
              { text: 'Spatial Query' },
              ' with input layer, buffer, and target pre-filled so specialists review SQL-backed settings while project admins never touch the query builder. One ask, two levels of depth.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Democratising GIS meant designing for two speeds — specialist SQL and admin-friendly map views — without dumbing down the platform. Pairing with engineers from day one kept confirmation cards and API traces shaped to what GIS teams would ',
                { text: 'actually audit' },
                ', not what looked clever in a mock.',
              ],
            },
          ],
        },
      },
      {
        id: 16,
        name: 'Moata 3D Panel',
        date: 'May 2024',
        description: 'Bringing ACC model data into the map side panel — version history, comparison, and property inspection without leaving Moata.',
        overview: [
          'Structural engineers compared BIM revisions by ',
          { text: 'exporting to Rhino' },
          ' — breaking the flow of geospatial review. I designed the ACC Model Viewer inside Moata\'s layer inspector and prototyped timeline, multi-select, and property diffs against real payloads until version comparison worked in context.',
        ],
        fullDescription: 'Bringing ACC model data into the map side panel — version history, comparison, and property inspection without leaving Moata.',
        website: 'https://www.mottmac.com/en/digital-solutions/',
        startingPoint: 'Scrubbing timelines was not enough — teams needed to pick specific revisions side by side and spot property changes without leaving the map.',
        outcome: 'A unified 3D panel where engineers scrub history, compare revisions, and read diffs at a glance — validated on live programme assets.',
        techStack: 'Product design, interaction design, prototyping, motion design.',
        images: [
          {
            demo: 'moata-3d-asset-select',
            caption: 'Open a 3D asset from the layers panel',
            sectionHeading: 'Open from layers',
            body: [
              'ACC model data lives in the ',
              { text: 'layers tree' },
              ' alongside other programme data. Engineers expand a structure group, click into a column layer, and open the 3D inspector from the toolbar — without leaving the map or opening a separate viewer.',
            ],
          },
          {
            demo: 'moata-3d-version-timeline',
            caption: 'Scrub model versions on the timeline',
            sectionHeading: 'Version timeline',
            body: [
              'Each structural element carries a ',
              { text: 'version history' },
              ' tied to ACC upload dates. The timeline slider scrubs forward through revisions — models appear and disappear in the viewport as their upload date passes the playhead, so engineers can see how a column evolved over the programme.',
            ],
          },
          {
            demo: 'moata-3d-version-properties',
            caption: 'Select versions and compare properties',
            sectionHeading: 'Version control & properties',
            body: [
              'Scrubbing alone does not answer “what changed?” — teams need to ',
              { text: 'pick specific revisions' },
              ' side by side. Version Control lists every upload date; the properties table below colour-codes values per model, surfacing diffs in concrete grade, fire rating, or section size as highlighted chips.',
            ],
          },
          {
            demo: 'moata-3d-asset-ring',
            caption: 'Drill from layer into a column revision',
            sectionHeading: 'Cylinder to ring',
            body: [
              'Once the 3D viewer is open, engineers can ',
              { text: 'click a column' },
              ' in the viewport to focus it, then click the ',
              { text: 'revision ring' },
              ' to open that asset in its own tab — isolating one model version without leaving the layer panel shell.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'In-context version diff was the leverage point — engineers exported to Rhino because comparing property tables on the map did not exist yet. I prototyped the timeline and multi-select against real ACC payloads so revisions could ',
                { text: 'colour-code in place' },
                ', without opening a second viewer.',
              ],
            },
          ],
        },
      },
      {
        id: 15,
        name: 'Doodler',
        date: 'Jun 2026',
        description: 'A co-created visual tool for therapists and patients to talk through difficult moments in care.',
        overview: [
          'Difficult conversations in care often stall on ',
          { text: 'clinical language' },
          ' — records sit with the practitioner, not the pair. Doodler is a co-created visual tool where therapists and patients build illustrated tiles together; I held the flow to one path from session capture to shared summary, narrow enough to use after a difficult hour.',
        ],
        fullDescription: 'A co-created visual tool for therapists and patients to talk through difficult moments in care.',
        website: '',
        startingPoint: 'Therapist interviews surfaced co-editing during crisis as the edge case — the product had to solve for dialogue in the room, not a comprehensive clinical record.',
        outcome: 'A guided co-creation flow from first session to printable summary — patient and therapist leave with something they made together, validated in-room.',
        techStack: 'Product design, interaction design, prototyping, motion design.',
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Therapist interviews shaped the first spec — AI stress-tested edge cases like co-editing during crisis, but the constraint I held was one path from tile to summary. I would push next on ',
                { text: 'async sharing at home' },
                '; the prototype proved the in-room flow, not retention between sessions.',
              ],
            },
          ],
        },
        images: [
          {
            demo: 'doodler-table',
            caption: 'Care path table — shared map of sessions and topics',
            sectionHeading: 'Shared map',
            body: [
              'Clinical records put the patient on the wrong side of the conversation — the fix was mapping doodles across ',
              { text: 'intake, consultation, and treatment plan' },
              ' so both sides always know where they are in the story and what they have already worked through together.',
            ],
          },
          {
            demo: 'doodler-nieuwe-doodle',
            caption: 'New doodle — co-create tiles after a contact moment',
            sectionHeading: 'Start together',
            body: [
              'After a difficult session, the pair do not need to re-explain everything from scratch. They attach what they discussed to a ',
              { text: 'named contact moment' },
              ' and generate tiles together — strengths, complaints, insights — so the hard parts have somewhere to land on the journey.',
            ],
          },
          {
            demo: 'doodler-edit-doodle',
            caption: 'Edit a doodle — adjust words and imagery together',
            sectionHeading: 'Shape it together',
            body: [
              'Generated tiles are drafts, not verdicts — patient and therapist ',
              { text: 'rewrite words and swap illustrations' },
              ' until language sounds right — keeping co-editing simple enough to do while still in the room together.',
            ],
          },
          {
            demo: 'doodler-journey',
            caption: 'Journey review — walk through phases and shared summary',
            sectionHeading: 'Walk it through',
            body: [
              'When they are ready to look at the whole picture, the journey moves through ',
              { text: 'strengths, complaints, insights, and approach' },
              ' in order — the same sequence they would use to revisit difficult ground. The summary is something they read aloud together before taking it home.',
            ],
          },
          {
            demo: 'doodler-library',
            caption: 'Library — revisit doodles across sessions',
            sectionHeading: 'Look back',
            body: [
              'Difficult conversations do not end when the session does. The ',
              { text: 'bibliotheek' },
              ' lets therapist and patient scroll back through past contact moments — each saved as a row of doodles — and reopen any session to pick up where they left off.',
            ],
          },
        ],
      },
      { 
        id: 3, 
        name: 'Materials Archive', 
        date: 'Jun 2026', 
        website: 'https://gcdp-archive-2026.vercel.app/',
        description: 'Digital archive for the MA Global Collaborative Design Practice — browse artefacts, trace collaborations, and explore student research across UAL and Kyoto Institute of Technology.', 
        overview: [
          'The MA GCDP Digital Archive holds thesis work from UAL and Kyoto — richly tagged, but a grid alone cannot answer ',
          { text: '“how does this work relate to that?”' },
          ' — I worked through filter, graph, collaboration, and glossary views as live prototypes until each solved a discovery question tutors actually asked.',
        ],
        fullDescription: 'A collaborative digital platform built for the UAL graduate course Global Collaborative Design Practice, designed to display and archive thesis projects from design students across multiple disciplines, facilitating research sharing and discovery.', 
        startingPoint: 'Tutors described relational questions — methods, partners, cohorts — that a single searchable grid could not solve; each browse mode had to earn its place against a real student search task.',
        outcome: 'An archive where artefacts filter by tag, cluster in a graph, trace through partners, and decode through a glossary — each view solving a different discovery failure.',
        techStack: 'React, Node.js, MongoDB, Mapbox, D3, Vercel',
        images: [
          {
            demo: 'ual-archive-filter',
            caption: 'Filter artefacts by method, theme, and search',
            sectionHeading: 'Find artefacts',
            body: [
              'Each submission carries ',
              { text: 'themes, methods, materials, and collaborators' },
              ' as tags. The filter panel lets students and tutors narrow the grid by cohort or tag, then refine with search — built first because it answered the most common tutor question: “find work like this” in a few clicks.',
            ],
          },
          {
            demo: 'ual-archive-force-graph',
            caption: 'Force graph — see how artefacts relate',
            sectionHeading: 'See connections',
            body: [
              'Tags alone do not show ',
              { text: 'how work clusters' },
              '. The graph view shipped as a live prototype first — linked nodes orbit by shared metadata so we could test whether students spotted thematic overlaps faster here than in the filter grid.',
            ],
          },
          {
            demo: 'ual-archive-collaborations',
            caption: 'Collaborations — partners across projects',
            sectionHeading: 'Trace partners',
            body: [
              'Many projects run with external partners. The collaborations view groups entries by ',
              { text: 'project or partner' },
              ', pairs a searchable index with a map, and links back to the projects each organisation touched — making the programme\'s network of community collaborators visible at a glance.',
            ],
          },
          {
            demo: 'ual-archive-glossary',
            caption: 'Glossary — shared language across the archive',
            sectionHeading: 'Shared language',
            body: [
              'Students tag work with programme-specific vocabulary. The ',
              { text: 'glossary' },
              ' collects those terms — methods like participatory practice, collaborators like local studios — with definitions drawn from how students actually use them, so readers can decode tags without leaving the archive.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Tutors wanted relational browsing, not another grid — filter, graph, and partner views came from a written discovery pass before any layout. Building each mode as a live prototype let us test whether force layout or collaboration maps answered ',
                { text: 'student questions' },
                ' faster than adding more tags.',
              ],
            },
          ],
        },
      },
      { 
        id: 7, 
        name: 'AptaBiome', 
        date: 'May 2023', 
        description: 'A digital product to support C-section parents created in collaboration with Danone', 
        overview: [
          'AptaBiome is a mobile recovery companion for C-section parents, built with Danone. Parents on exhausted weeks will not tolerate a ',
          { text: 'feature-heavy app' },
          ' — interviews showed where guidance felt clinical, and the answer was personalised pacing and empathetic content, with notification timing co-designed alongside engineering.',
        ],
        fullDescription: 'A comprehensive digital product and mobile application created in collaboration with Danone to support parents who have had C-sections, providing personalized guidance, recovery resources, and parenting support through an intuitive and empathetic user experience.', 
        website: 'https://aivoicesmap.vercel.app/',
        startingPoint: 'Trust had to land in the first session — parent interviews defined what “gentle guidance” meant before any feature list grew.',
        outcome: 'A paced recovery experience that earns trust early — progressive content, empathetic tone, and reminders that feel supportive, not nagging.',
        techStack: 'React Native, Node.js, MongoDB, AWS, Push Notifications',
        images: [
          {
            src: '/images/07.01.png',
            caption: 'AptaBiome — recovery home',
            sectionHeading: 'Recovery home',
            body: [
              'The home screen leads with ',
              { text: 'where you are in recovery' },
              ', not a wall of articles — content opens progressively so parents on day three are not overwhelmed by week-six guidance.',
            ],
          },
          {
            src: '/images/07.02.png',
            caption: 'AptaBiome — guided content',
            sectionHeading: 'Guided content',
            body: [
              'Each module pairs short guidance with ',
              { text: 'empathetic illustration' },
              ' — tested with parents for tone before visual polish. The goal was reassurance without clinical distance.',
            ],
          },
          {
            src: '/images/07.03.png',
            caption: 'AptaBiome — personalised pacing',
            sectionHeading: 'Personalised pacing',
            body: [
              'Recovery milestones adapt to ',
              { text: 'parent pace and check-ins' },
              ' — notification timing was co-designed with engineering so reminders felt supportive on an exhausted week, not nagging.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Recovery content had to earn trust in the first session — parent interviews showed where guidance felt clinical; engineering constraints on notifications shaped what a gentle reminder could mean on an exhausted week. The bet stayed ',
                { text: 'personalised pacing' },
                ', not feature breadth.',
              ],
            },
          ],
        },
      },
      { 
        id: 9, 
        name: 'Turinglab', 
        date: 'May 2023', 
        description: 'Designing educational tools and features for Turinglab, an ed-tech start-up',
        overview: [
          'At Turinglab, classroom tools fail if the ',
          { text: 'first five minutes stall' },
          '. I designed lesson features with PM and engineering — working through where students confused syntax with concepts, and tuning flows with teachers for interruption, not demo polish.',
        ],
        fullDescription: 'Designing and developing a comprehensive suite of educational tools and interactive features for Turinglab, an ed-tech startup focused on teaching coding and AI concepts to students through engaging digital learning experiences and hands-on programming activities.',
        website: 'https://amazon.turinglab.co.uk/',
        startingPoint: 'Teachers described exactly where students dropped off — the hard part was classroom reality, not a clean walkthrough.',
        outcome: 'Interactive lessons that hold through pause, redirect, and resume — syntax and concept confusion solved in the flow.',
        techStack: 'React, TypeScript, Python, TensorFlow, Vercel',
        images: [
          {
            src: '/images/09.04.png',
            caption: 'Turinglab — lesson overview',
            sectionHeading: 'Lesson structure',
            body: [
              'Each lesson opens with a ',
              { text: 'clear objective and scaffolded steps' },
              ' — structured so a teacher can pause, redirect, and resume without losing student context mid-activity.',
            ],
          },
          {
            src: '/images/09.01.png',
            caption: 'Turinglab — interactive exercise',
            sectionHeading: 'Hands-on exercise',
            body: [
              'Coding tasks stay ',
              { text: 'in-browser and immediate' },
              ' — students see output from their own changes, not a pre-recorded walkthrough. Early tests showed this was where engagement held or broke.',
            ],
          },
          {
            src: '/images/09.02.png',
            caption: 'Turinglab — AI concept module',
            sectionHeading: 'AI concepts',
            body: [
              'AI modules visualise ',
              { text: 'model behaviour, not black boxes' },
              ' — students adjust inputs and watch outputs shift, bridging the gap between syntax exercises and conceptual understanding.',
            ],
          },
          // { src: '/images/09.03.png', caption: 'Main interface' }
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Classroom tools fail if the first five minutes stall — I sat with teachers through build and tuned for interruption, not demo polish. Lesson specs with AI surfaced where students confused syntax with concepts before we ',
                { text: 'locked interaction patterns' },
                '.',
              ],
            },
          ],
        },
      },
      // { 
      //   id: 10, 
      //   name: 'Moata Net Zero', 
      //   date: 'May 2025', 
      //   description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
      //   website: 'https://www.mottmac.com/en/digital-solutions/',
      //   images: [
      //     { src: '/images/01.01.png', caption: 'Main interface' },
      //     { src: '/images/01.02.png', caption: 'Submission form' },
      //     { src: '/images/01.03.png', caption: 'Main interface' }
      //   ]
      // }
    ],
    'Older Work': [
      {
        id: 6,
        name: 'ClearBank',
        date: 'May 2024',
        description: 'Developer portal and API documentation for ClearBank, a fintech providing banking APIs',
        overview: [
          'ClearBank\'s developer portal had to let teams ',
          { text: 'test before they trust' },
          ' — opaque documentation loses integrators quietly. I worked with API owners to align docs, sandbox flows, and walkthroughs with how integrations actually break in production.',
        ],
        fullDescription: 'A comprehensive website and developer portal for ClearBank, a fintech company that provides powerful banking APIs, featuring developer-friendly documentation, API testing tools, and seamless integration resources for financial technology developers.',
        website: 'https://clear.bank/explore-our-api',
        startingPoint: 'Teams stalled on sandbox setup, error states, and the path from first call to first transaction — not on reading marketing copy.',
        outcome: 'A developer portal where every endpoint can be exercised in context — documentation aligned to production integration paths.',
        techStack: 'React, TypeScript, OpenAPI, Swagger, Vercel',
        images: [
          {
            src: '/images/clearbank/5f388e40.mp4',
            caption: 'ClearBank — API explorer',
            sectionHeading: 'API explorer',
            body: [
              'The explorer lets developers ',
              { text: 'call endpoints in context' },
              ' — parameters, responses, and error states visible alongside docs, so integration issues surface in the portal, not after deployment.',
            ],
          },
          {
            src: '/images/clearbank/7f9eb849.mp4',
            caption: 'ClearBank — documentation flow',
            sectionHeading: 'Documentation',
            body: [
              'Docs follow the ',
              { text: 'integration journey' },
              ' — authentication, accounts, payments — not an alphabetical endpoint list. Each section pairs reference with a worked example developers can run immediately.',
            ],
          },
          {
            src: '/images/clearbank/16-Accounts.jpg',
            caption: 'ClearBank — accounts overview',
            sectionHeading: 'Accounts',
            body: [
              'Account management surfaces ',
              { text: 'sandbox and production states' },
              ' clearly — developers see what is live, what is test, and where configuration gaps would block a go-live.',
            ],
          },
          {
            src: '/images/clearbank/53c30df9.mp4',
            caption: 'ClearBank — integration walkthrough',
            sectionHeading: 'Integration path',
            body: [
              'The walkthrough sequences ',
              { text: 'first call to first transaction' },
              ' — aligned with API owner input on where teams most often stall during onboarding.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Developers do not forgive opaque APIs — the bet was documentation you could exercise, not just read. Working alongside API owners aligned sandbox flows with how integrations ',
                { text: 'actually break in production' },
                ', not how they read on a marketing page.',
              ],
            },
          ],
        },
      },
      {
        id: 8,
        name: 'Phillips Auction House',
        date: 'May 2023',
        description: 'A new digital exhibition and checkout experience for Phillips Auction House',
        overview: [
          'Phillips needed a virtual gallery that could carry high-value art online — checkout ',
          { text: 'fails quietly' },
          ' when buyers lose confidence between browse and payment. With PM and engineering I mapped drop-off first, then shaped provenance and trust cues before polish and motion.',
        ],
        fullDescription: 'A new digital exhibition and checkout experience for Phillips Auction House, creating a virtual gallery platform that allows global access to Phillips\' curated collections and auction items through an immersive web-based interface.',
        website: 'https://exhibitions.phillips.com/',
        startingPoint: 'Immersive motion was tempting, but the hard question was where buyers hesitated at payment — funnel analysis came before visual spectacle.',
        outcome: 'A gallery and checkout path where provenance leads and steps stay minimal — trust solved at the moment of purchase.',
        techStack: 'React, Three.js, WebGL, Contentful, Vercel',
        images: [
          {
            src: '/images/phillips/Phillips_new_aquisitions_crf28.mp4',
            caption: 'Phillips — new acquisitions exhibition',
            sectionHeading: 'Exhibition browse',
            body: [
              'New acquisitions open as a ',
              { text: 'curated scroll' },
              ' — each lot with provenance context visible before detail, so global visitors browse with the same confidence as in-gallery viewers.',
            ],
          },
          {
            src: '/images/phillips/Phillips03.webp',
            caption: 'Phillips — lot detail',
            sectionHeading: 'Lot detail',
            body: [
              'Detail pages lead with ',
              { text: 'provenance and condition' },
              ' — the information buyers need before committing, not buried below gallery photography.',
            ],
          },
          {
            src: '/images/phillips/Phillips02.webp',
            caption: 'Phillips — collection view',
            sectionHeading: 'Collection view',
            body: [
              'Collections group works by ',
              { text: 'curatorial thread' },
              ' — visitors move between related lots without losing exhibition context or restarting navigation.',
            ],
          },
          {
            src: '/images/phillips/Phillips_Button_Square-Loop.mp4',
            caption: 'Phillips — checkout interaction',
            sectionHeading: 'Checkout',
            body: [
              'The purchase path was reduced to ',
              { text: 'essential steps' },
              ' — each screen validated against where test users hesitated, with performance tuned so motion never delayed confirmation.',
            ],
          },
          {
            src: '/images/phillips/Phillips04.webp',
            caption: 'Phillips — acquisition confirmation',
            sectionHeading: 'Confirmation',
            body: [
              'Confirmation reinforces ',
              { text: 'lot identity and next steps' },
              ' — buyers leave knowing what happens after purchase, closing the trust gap that loses high-value transactions online.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Checkout on high-value art fails quietly — we mapped drop-off with PM and engineering before polishing gallery motion. The leverage was trust at payment: fewer steps, clearer provenance cues, and performance that did not ',
                { text: 'fight the exhibition narrative' },
                '.',
              ],
            },
          ],
        },
      },
      {
        id: 14,
        name: 'Illustrations',
        date: 'Mar 2026',
        description: 'A brief collection of illustrations across time.',
        overview: [
          'A sequence of illustrations across time — rough passes beside finals so viewers see how marks were negotiated into finished images. Clashing styles stay on purpose; the question was how to show ',
          { text: 'argument in the line' },
          ' without forcing brand unity.',
        ],
        fullDescription: 'A brief collection of illustrations across time, bringing together experiments, studies, and finished pieces developed across different projects and moments.',
        mediaMaxWidth: 520,
        mediaMaxWidthMobile: 340,
        website: '',
        startingPoint: 'Let the sequence read as a time axis—clashing styles stay on purpose to show argument in the line, not forced brand unity.',
        outcome: 'Rough passes sit beside finals so viewers see how marks were negotiated into finished images.',
        techStack: 'Stack: Procreate, Photoshop, ink, occasional risograph. AI note: avoided generative fills; every texture remains accountable to a deliberate hand so the drawing stays evidence of thinking.',
        images: [
          {
            src: '/images/illustrations/Screenshot 2026-03-26 at 14.11.56.png',
            caption: 'Illustration — early study',
            sectionHeading: 'Early study',
            body: [
              'Loose line work kept ',
              { text: 'argument visible' },
              ' — the pass tests composition before colour or texture commit.',
            ],
          },
          {
            src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.05.png',
            caption: 'Illustration — texture experiment',
            sectionHeading: 'Texture',
            body: [
              'Surface built by hand — ',
              { text: 'ink and grain' },
              ' layered until the image holds at arm\'s length without digital smoothing.',
            ],
          },
          {
            src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.13.png',
            caption: 'Illustration — colour pass',
            sectionHeading: 'Colour',
            body: [
              'Palette restricted to ',
              { text: 'two or three tones' },
              ' so the figure reads before decorative detail competes.',
            ],
          },
          {
            src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.28.png',
            caption: 'Illustration — revised composition',
            sectionHeading: 'Revision',
            body: [
              'Composition shifted after the first pass — ',
              { text: 'negative space' },
              ' opened so the eye had somewhere to rest.',
            ],
          },
          {
            src: '/images/illustrations/image.png',
            caption: 'Illustration — finished piece',
            sectionHeading: 'Finished',
            body: [
              'Final line weight chosen for ',
              { text: 'print and screen' },
              ' — the same drawing holds in a risograph run or on a project page.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'These sit outside product sprints, but the same bar applies: know when a rough pass is enough and when a line needs another pass. I kept texture hand-made so each image stays ',
                { text: 'evidence of decision' },
                ', not generative filler.',
              ],
            },
          ],
        },
      },
    ],
    'Participatory Design': [
      { 
        id: 11, 
        name: 'AI Literacy Framework', 
        date: 'May 2025', 
        description: 'A framework booklet for local government to better understand AI literacy',
        overview: [
          'Across council workshops, officers used ',
          { text: 'different language' },
          ' for the same AI literacy gaps. I structured a framework booklet around validated scenarios officers would hand to colleagues — shared vocabulary before policy slides.',
        ],
        fullDescription: 'A comprehensive framework booklet and assessment tool designed specifically for local government officials to better understand, evaluate, and improve AI literacy within their communities, providing practical guidance and educational resources for policy development.', 
        website: 'https://aivoicesmap.vercel.app/',
        startingPoint: 'Workshops surfaced the same gaps described differently each session — the first task was tabulating definitions before designing assessment structure.',
        outcome: 'A booklet with practical scenarios validated with officers who would distribute it internally — language councils can actually use in policy and training.',
        techStack: 'React, Node.js, MongoDB, Vercel, D3.js',
        images: [
          {
            src: '/images/participatory/ai-literacy-framework/11.01.png',
            caption: 'AI Literacy Framework — overview',
            sectionHeading: 'Framework overview',
            body: [
              'The framework opens with ',
              { text: 'literacy dimensions' },
              ' councils can assess against — awareness, capability, governance — so readers know which section applies before diving into detail.',
            ],
          },
          {
            src: '/images/participatory/ai-literacy-framework/11.02.png',
            caption: 'AI Literacy Framework — assessment',
            sectionHeading: 'Assessment',
            body: [
              'Self-assessment prompts use ',
              { text: 'plain-language scenarios' },
              ' — tested with officers for whether questions reflected real council decisions, not academic definitions.',
            ],
          },
          {
            src: '/images/participatory/ai-literacy-framework/11.03.png',
            caption: 'AI Literacy Framework — guidance',
            sectionHeading: 'Practical guidance',
            body: [
              'Each dimension pairs assessment with ',
              { text: 'actionable next steps' },
              ' — what to do Monday morning, not what to study over six months.',
            ],
          },
          {
            src: '/images/participatory/ai-literacy-framework/11.04.png',
            caption: 'AI Literacy Framework — distribution',
            sectionHeading: 'Hand to colleagues',
            body: [
              'Layout designed for ',
              { text: 'print and screen share' },
              ' — spreads work as workshop material or email attachment without losing structure.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Council stakeholders needed shared vocabulary before policy slides — early drafts helped tabulate literacy gaps officers described differently each workshop. The booklet only worked once we validated scenarios with people who would ',
                { text: 'hand it to colleagues' },
                ', not read it once and shelve it.',
              ],
            },
          ],
        },
      },
      { 
        id: 12, 
        name: 'Climate Truth Crisis', 
        date: 'May 2025', 
        description: 'An interactive narrative on climate misinformation and digital truth', 
        overview: [
          'Climate Truth Crisis is an interactive narrative on how misinformation spreads through information systems. The hard part was carrying ',
          { text: 'doubt about climate data' },
          ' without collapsing into cynicism — structure mapped where readers stop trusting the story, then scroll depth shaped what shipped.',
        ],
        fullDescription: 'An interactive narrative experience and research project that explores the intersection of climate change and information systems, examining how climate misinformation spreads through digital platforms and questioning the nature of truth in the age of environmental crisis.', 
        website: 'https://deathofnero.vercel.app/',
        startingPoint: 'The research question was where trust breaks — outline work mapped reader doubt points before any visual or motion design.',
        outcome: 'A narrative that withholds easy answers but keeps readers — structure tuned from scroll and re-read measurement, not aesthetic novelty alone.',
        techStack: 'React, Three.js, WebGL, Vercel, GSAP',
        images: [
          {
            src: '/images/participatory/climate-truth-crisis/12.01.png',
            caption: 'Climate Truth Crisis — opening chapter',
            sectionHeading: 'Opening',
            body: [
              'The opening establishes ',
              { text: 'what counts as evidence' },
              ' — readers enter knowing the narrative will question sources, not present a single authoritative voice.',
            ],
          },
          {
            src: '/images/participatory/climate-truth-crisis/12.02.png',
            caption: 'Climate Truth Crisis — data fracture',
            sectionHeading: 'Data fracture',
            body: [
              'Competing claims appear ',
              { text: 'side by side' },
              ' — the layout forces comparison rather than sequential persuasion, surfacing where readers pause to reconcile contradiction.',
            ],
          },
          {
            src: '/images/participatory/climate-truth-crisis/12.03.png',
            caption: 'Climate Truth Crisis — resolution',
            sectionHeading: 'Resolution',
            body: [
              'The close withholds easy answers — ',
              { text: 'scroll depth here' },
              ' was the validation metric: did readers stay through uncertainty or bail when the narrative refused closure?',
            ],
          },
          // { src: '/images/12.04.png', caption: 'Main interface' }
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'The narrative structure came from mapping where readers stop trusting a story about climate data — speculative edges surfaced in outline before visual build. Measuring scroll depth and re-reads mattered more than aesthetic novelty; the design had to carry doubt without ',
                { text: 'collapsing into cynicism' },
                '.',
              ],
            },
          ],
        },
      },
      { 
        id: 13, 
        name: 'Street Installations', 
        date: 'Apr 2025', 
        description: 'Four interactive street installations in South London engaging the public with ethical questions in emerging AI technologies.',
        overview: [
          'Four plinths in South London posed ',
          { text: 'ethical questions about AI' },
          ' to passers-by — sized for pause-and-chat on a windy sidewalk, not throughput. Field notes after each install showed which prompts sparked argument and fed the next.',
        ],
        fullDescription: 'A series of four interactive street installations built in South London designed to engage members of the public with critical ethical questions surrounding emerging AI technologies through hands-on participation and thoughtful dialogue in public spaces.', 
        website: '',
        startingPoint: 'Throughput was the wrong brief — each plinth had to earn a stop in wind and traffic noise, analogue-first so strangers trusted the interaction.',
        outcome: 'A stack of public arguments transcribed into policy notes — each install solving what the previous one could not get passers-by to debate.',
        techStack: 'Stack: Arduino / touch triggers, large-format print, QR fallbacks, Notion field notes. AI note: kept the sidewalk layer analogue-first; speech-to-text, if used, stayed in archival transcripts—not live kiosks—so strangers trusted the interaction.',
        images: [
          {
            src: '/images/participatory/street-installations/13.03.png',
            caption: 'Street installation — plinth one',
            sectionHeading: 'Plinth one',
            body: [
              'First prompt tested ',
              { text: 'whether strangers would stop' },
              ' — large type, single question, no app required. Field notes tracked who paused versus walked past.',
            ],
          },
          {
            src: '/images/participatory/street-installations/13.04.png',
            caption: 'Street installation — plinth two',
            sectionHeading: 'Plinth two',
            body: [
              'Second plinth introduced ',
              { text: 'a trade-off frame' },
              ' — what would you sacrifice for convenience? Responses from plinth one shaped whether this needed simpler language.',
            ],
          },
          {
            src: '/images/participatory/street-installations/13.05.png',
            caption: 'Street installation — plinth three',
            sectionHeading: 'Plinth three',
            body: [
              'Touch triggers let passers-by ',
              { text: 'vote with their hands' },
              ' — analogue-first so strangers trusted the interaction without downloading anything.',
            ],
          },
          {
            src: '/images/participatory/street-installations/13.06.png',
            caption: 'Street installation — plinth four',
            sectionHeading: 'Plinth four',
            body: [
              'Final plinth synthesised ',
              { text: 'arguments from the series' },
              ' — quotes from earlier installs surfaced so the sidewalk conversation built on itself across weeks.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'The sidewalk layer stayed analogue-first on purpose — strangers trust a plinth more than a kiosk. What I would push next is a lighter way to carry those field notes into policy workshops without ',
                { text: 'laundering the argument' },
                ' through a single digital funnel.',
              ],
            },
          ],
        },
      }
    ],
    'Design Writing': [
      // { 
      //   id: 11, 
      //   name: 'On Graphic Narrative', 
      //   date: 'May 2025', 
      //   description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
      //   website: 'https://aivoicesmap.vercel.app/',
      //   images: [
      //     { src: '/images/01.01.png', caption: 'Main interface' },
      //     { src: '/images/01.02.png', caption: 'Submission form' },
      //     { src: '/images/01.03.png', caption: 'Main interface' }
      //   ]
      // },
      // { 
      //   id: 12, 
      //   name: 'Climate Truth Crisis', 
      //   date: 'May 2025', 
      //   description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
      //   website: 'https://aivoicesmap.vercel.app/',
      //   images: [
      //     { src: '/images/012.01.png', caption: 'Main interface' },
      //     { src: '/images/012.02.png', caption: 'Submission form' },
      //     { src: '/images/012.03.png', caption: 'Main interface' }
      //   ]
      // }
    ]
  });

  const [selectedProject, setSelectedProject] = useState(projects['Product Design'][0]);
  // On mobile, all project lists are expanded by default
  const mainContentRef = useRef(null);
  const headerRef = useRef(null);
  const mainContentScrollRef = useRef(null);
  const sidebarScrollRef = useRef(null);
  const preloadedImagesRef = useRef(new Set());
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState('overview');
  // Refs for each project title
  const projectTitleRefs = useRef({});

  const isVideoMedia = (src) => /\.(mp4|mov)$/i.test(src || '');
  const renderProjectMedia = (imgObj, project, idx, { maxWidth = '92%', maxHeight = '65vh', openModal }) => {
    const src = typeof imgObj === 'string' ? imgObj : imgObj.src;
    const caption = typeof imgObj === 'string' ? null : imgObj.caption;
    const demo = typeof imgObj === 'object' ? imgObj.demo : null;

    if (demo === 'doodler-table') {
      return <DoodlerTableDemo className="self-start w-full" />;
    }
    if (demo === 'doodler-nieuwe-doodle') {
      return <DoodlerNewDoodleDemo className="self-start w-full" />;
    }
    if (demo === 'doodler-edit-doodle') {
      return <DoodlerEditDoodleDemo className="self-start w-full" />;
    }
    if (demo === 'doodler-journey') {
      return <DoodlerJourneyDemo className="self-start w-full" />;
    }
    if (demo === 'doodler-library') {
      return <DoodlerLibraryDemo className="self-start w-full" />;
    }
    if (demo === 'moata-research-quote') {
      return <MoataResearchQuoteDemo className="self-start w-full" />;
    }
    if (demo === 'moata-insight-graph') {
      return <MoataInsightGraphDemo className="self-start w-full" />;
    }
    if (demo === 'moata-problem-wireframe') {
      return <MoataProblemWireframeDemo className="self-start w-full" />;
    }
    if (demo === 'moata-blank-screen') {
      return <MoataBlankScreenDemo className="self-start w-full" />;
    }
    if (demo === 'moata-spaces') {
      return <MoataSpacesDemo className="self-start w-full" />;
    }
    if (demo === 'moata-app-overview') {
      return <MoataAppOverviewDemo className="self-start w-full" />;
    }
    if (demo === 'moata-map-comment') {
      return <MoataMapCommentDemo className="self-start w-full" />;
    }
    if (demo === 'moata-comments') {
      return <MoataCommentsDemo className="self-start w-full" />;
    }
    if (demo === 'moata-comments-panel') {
      return <MoataCommentsPanelDemo className="self-start w-full" />;
    }
    if (demo === 'moata-comments-grid') {
      return <MoataCommentsGridDemo className="self-start w-full" />;
    }
    if (demo === 'moata-model-viewer') {
      return <MoataModelViewerDemo className="self-start w-full" />;
    }
    if (demo === 'moata-time-slider') {
      return <MoataTimeSliderDemo className="self-start w-full" />;
    }
    if (demo === 'moata-tabs') {
      return <MoataTabsDemo className="self-start w-full" />;
    }
    if (demo === 'moata-map-pins') {
      return <MoataMapPinsDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-asset-select') {
      return <Moata3dAssetSelectDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-version-timeline') {
      return <Moata3dVersionTimelineDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-version-properties') {
      return <Moata3dVersionPropertiesDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-asset-ring') {
      return <Moata3dAssetRingDemo className="self-start w-full" />;
    }
    if (demo === 'ual-archive-filter') {
      return <UalArchiveFilterDemo className="self-start w-full" />;
    }
    if (demo === 'ual-archive-force-graph') {
      return <UalArchiveForceGraphDemo className="self-start w-full" />;
    }
    if (demo === 'ual-archive-collaborations') {
      return <UalArchiveCollaborationsDemo className="self-start w-full" />;
    }
    if (demo === 'ual-archive-glossary') {
      return <UalArchiveGlossaryDemo className="self-start w-full" />;
    }
    if (demo === 'laiv-tag-view') {
      return <LondonAiVoicesTagViewDemo className="self-start w-full" />;
    }
    if (demo === 'laiv-network') {
      return <LondonAiVoicesNetworkDemo className="self-start w-full" />;
    }
    if (demo === 'laiv-contribution') {
      return <LondonAiVoicesContributionDemo className="self-start w-full" />;
    }
    if (demo === 'community-board') {
      return <CommunityBoardDemo className="self-start w-full" />;
    }
    if (demo === 'ai-deployment-game') {
      return <AIDeploymentGameDemo className="self-start w-full" />;
    }
    if (demo === 'image-labeling') {
      return <ImageLabelingDemo className="self-start w-full" />;
    }
    if (demo === 'dwd-generate') {
      return <DigitalWaterGenerateDemo className="self-start w-full" />;
    }
    if (demo === 'dwd-archive') {
      return <DigitalWaterArchiveDemo className="self-start w-full" />;
    }
    if (demo === 'dwd-simulation') {
      return <DigitalWaterSimulationDemo className="self-start w-full" />;
    }
    if (demo === 'dwd-types') {
      return <DigitalWaterTypesDemo className="self-start w-full" />;
    }
    if (demo === 'emma-toggle-layers') {
      return <EmmaToggleLayersDemo className="self-start w-full" />;
    }
    if (demo === 'emma-bundle') {
      return <EmmaBundleDemo className="self-start w-full" />;
    }
    if (demo === 'emma-spatial-query') {
      return <EmmaSpatialQueryDemo className="self-start w-full" />;
    }
    if (demo === 'emma-action-card') {
      return <EmmaActionCardDemo className="self-start w-full" />;
    }
    if (demo === 'emma-permissions') {
      return <EmmaPermissionsDemo className="self-start w-full" />;
    }
    if (demo === 'emma-workspace') {
      return <EmmaWorkspaceDemo className="self-start w-full" />;
    }
    if (demo === 'emma-chat-threads') {
      return <EmmaChatThreadsDemo className="self-start w-full" />;
    }
    if (demo === 'emma-research-quote') {
      return <EmmaResearchQuoteDemo className="self-start w-full" />;
    }
    if (demo === 'emma-problem-framing') {
      return <EmmaProblemFramingDemo className="self-start w-full" />;
    }
    if (demo === 'emma-governance-insight') {
      return <EmmaGovernanceInsightDemo className="self-start w-full" />;
    }
    if (imgObj.embed) {
      return (
        <ProjectEmbed
          src={src}
          title={caption || `${project.name} HTML animation`}
          height={imgObj.embedHeight || 720}
          width={imgObj.embedWidth || 920}
          className="self-start rounded-lg bg-[#faf9f5]"
        />
      );
    }
    if (isVideoMedia(src)) {
      return (
        <video
          src={src}
          data-auto-play-video="true"
          muted
          loop
          playsInline
          preload="metadata"
          className="object-contain object-left self-start rounded-lg"
          style={{ maxWidth, width: 'auto', maxHeight, display: 'block' }}
        />
      );
    }
    return (
      <OptimizedImage
        loading={idx < 2 ? 'eager' : 'lazy'}
        src={src}
        alt={project.name + ' image ' + (idx + 1)}
        onClick={() => openModal({ src, alt: project.name + ' image ' + (idx + 1) })}
        className="object-contain object-left custom-clickable self-start rounded-lg"
        style={{ maxWidth, width: 'auto', maxHeight, display: 'block' }}
      />
    );
  };
  const defaultRoleHighlights = ['Research', 'UX/UI Design', 'Prototyping'];
  const getRoleHighlights = (project) => {
    if (project?.roleHighlights?.length) {
      return project.roleHighlights.slice(0, 3);
    }
    return defaultRoleHighlights;
  };
  const renderRoleChips = (project, { className = 'mb-4', keyPrefix = 'chip' } = {}) => (
    <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {getRoleHighlights(project).map((item, idx) => (
        <span
          key={`${project.id}-${keyPrefix}-role-${idx}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-gray-300 text-gray-600 text-xs rounded-full"
        >
          <span aria-hidden="true">+</span>
          <span>{item}</span>
        </span>
      ))}
      {project.website && (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-gray-300 text-gray-600 text-xs rounded-full custom-clickable hover:blur-sm no-underline"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
          </svg>
          <span>Project Site</span>
        </a>
      )}
    </div>
  );
  const renderWovenDescription = (project, className) => {
    if (project.overview) {
      const content =
        typeof project.overview === 'string' ? (
          project.overview
        ) : (
          project.overview.map((part, index) =>
            typeof part === 'string' ? (
              <React.Fragment key={index}>{part}</React.Fragment>
            ) : (
              <code key={index} className={INLINE_TERM_CLASS}>
                {part.text}
              </code>
            )
          )
        );
      return <p className={className}>{content}</p>;
    }

    const baseDescription = project.fullDescription || project.description;
    if (!baseDescription) return null;
    return (
      <p className={className}>
        {baseDescription}{' '}
        {renderInlineTerm('As lead product designer')}, I focused on{' '}
        {renderInlineTerm('designing new features')} and{' '}
        {renderInlineTerm('testing with users')} to refine the overall experience.
      </p>
    );
  };
  const renderSectionBody = (body, options = {}) => {
    const opts = typeof options === 'string' ? { className: options } : options;
    const { heading, className = 'text-sm text-gray-600 leading-relaxed' } = opts;
    if (!body) return null;

    const content =
      typeof body === 'string' ? (
        body
      ) : (
        body.map((part, index) =>
          typeof part === 'string' ? (
            <React.Fragment key={index}>{part}</React.Fragment>
          ) : (
            <code key={index} className={INLINE_TERM_CLASS}>
              {part.text}
            </code>
          )
        )
      );

    return (
      <div className="case-study-section mb-10 max-w-2xl w-full">
        {heading && (
          <div className="mb-4 flex items-center gap-4">
            <h3 className="shrink-0 text-[15px] font-semibold text-gray-900">{heading}</h3>
            <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
          </div>
        )}
        <p className={className}>{content}</p>
      </div>
    );
  };

  const getCaseStudySections = (project) => {
    if (!project) return [];
    const sections = [{ id: 'overview', label: 'Overview' }];
    (project.caseStudyBlocks?.before || []).forEach((block) => {
      sections.push({
        id: block.id,
        label: toIndexNavLabel(block.heading),
        title: block.heading,
      });
    });
    (project.images || []).forEach((imgObj, idx) => {
      const sectionHeading = typeof imgObj === 'object' ? imgObj.sectionHeading : null;
      const caption = typeof imgObj === 'object' ? imgObj.caption : null;
      const fullLabel = sectionHeading || caption || `Image ${idx + 1}`;
      sections.push({
        id: `section-${idx}`,
        label: sectionHeading || toIndexNavLabel(fullLabel),
        title: fullLabel,
      });
    });
    (project.caseStudyBlocks?.after || []).forEach((block) => {
      sections.push({
        id: block.id,
        label: toIndexNavLabel(block.heading),
        title: block.heading,
      });
    });
    return sections;
  };

  const renderCaseStudyBlocks = (blocks, { className = '', bodyClassName, project, openModal } = {}) => {
    if (!blocks?.length) return null;
    return blocks.map((block) => (
      <div
        key={block.id}
        className={`flex flex-col mb-16 last:mb-0 items-start ${className}`.trim()}
        data-case-study-section={block.id}
        style={{ scrollMarginTop: '1.5rem' }}
      >
        {renderSectionBody(block.body, {
          heading: block.heading,
          className: bodyClassName,
        })}
        {block.demo && project && (
          <div className="mt-6 w-full self-start">
            {renderProjectMedia(
              { demo: block.demo, caption: block.caption },
              project,
              `block-${block.id}`,
              { openModal }
            )}
          </div>
        )}
      </div>
    ));
  };

  // Temporarily hidden projects by id
  const hiddenProjectIds = useMemo(() => new Set([7, 9]), []);

  const orderedCategories = useMemo(() => {
    const entries = Object.entries(projects);
    const priority = ['Product Design', 'Creative Projects', 'Participatory Design', 'Design Writing', 'Older Work'];
    const sorted = entries.sort((a, b) => {
      const aIndex = priority.indexOf(a[0]);
      const bIndex = priority.indexOf(b[0]);
      const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      return safeA - safeB;
    });
    // Filter out hidden projects
    return sorted
      .map(([category, categoryProjects]) => [
        category,
        categoryProjects.filter((p) => !hiddenProjectIds.has(p.id)),
      ])
      .filter(([, categoryProjects]) => categoryProjects.length > 0);
  }, [projects, hiddenProjectIds]);

  const allProjects = useMemo(() => orderedCategories.flatMap(([, categoryProjects]) => categoryProjects), [orderedCategories]);

  const caseStudySections = useMemo(
    () => getCaseStudySections(selectedProject),
    [selectedProject]
  );

  // Desktop: scroll main pane to top. Mobile: scroll the list so the project title lines up at the top of the scroll area.
  useEffect(() => {
    setActiveSectionId('overview');
    if (mainContentScrollRef.current) {
      mainContentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    const id = selectedProject?.id;
    if (id == null) return;
    const scrollTitle = () => {
      const el = projectTitleRefs.current[id];
      if (el && sidebarScrollRef.current?.contains(el)) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollTitle);
    });
  }, [selectedProject]);

  // Clear annotation trail when switching case studies
  useEffect(() => {
    window.dispatchEvent(new Event('case-study-change'));
  }, [selectedProject?.id]);

  useEffect(() => {
    const root = mainContentScrollRef.current;
    const hasContent =
      selectedProject.images?.length ||
      selectedProject.caseStudyBlocks?.before?.length ||
      selectedProject.caseStudyBlocks?.after?.length;
    if (!root || !hasContent) return undefined;

    const sectionEls = root.querySelectorAll('[data-case-study-section]');
    if (!sectionEls.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          setActiveSectionId(visible[0].target.dataset.caseStudySection);
        }
      },
      { root, rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const currentIndex = allProjects.findIndex(p => p.id === selectedProject.id);
        if (currentIndex !== -1) {
          let nextIndex;
          if (event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % allProjects.length;
          } else { // ArrowUp
            nextIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
          }
          setSelectedProject(allProjects[nextIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, allProjects]);

  useEffect(() => {
    if (!selectedProject) return;

    const currentIndex = allProjects.findIndex((project) => project.id === selectedProject.id);
    if (currentIndex === -1) return;

    const projectsToPreload = [
      selectedProject,
      allProjects[(currentIndex + 1) % allProjects.length],
      allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length],
    ];

    projectsToPreload.forEach((project) => {
      if (!project?.images) return;

      project.images.forEach((imgObj) => {
        const src = typeof imgObj === 'string' ? imgObj : imgObj.src;
        if (!src || preloadedImagesRef.current.has(src)) return;
        if (isVideoMedia(src)) {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.src = src;
        } else {
          const webpSrc = getWebpSrc(src);
          if (webpSrc) {
            const webpImg = new Image();
            webpImg.src = webpSrc;
          }
          const img = new Image();
          img.src = src;
        }
        preloadedImagesRef.current.add(src);
      });
    });
  }, [selectedProject, allProjects]);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll('[data-auto-play-video="true"]'));
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, [selectedProject]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCaseStudyIndex = () => {
    setActiveSectionId('overview');
    const overview = mainContentScrollRef.current?.querySelector('[data-case-study-section="overview"]');
    if (overview) {
      overview.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (mainContentScrollRef.current) {
      mainContentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectSection = (sectionId) => {
    setActiveSectionId(sectionId);
    const section = mainContentScrollRef.current?.querySelector(
      `[data-case-study-section="${sectionId}"]`
    );
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start px-8 py-6" ref={headerRef}>
        <h1 
          className={`floating-letters-header text-xl font-normal text-gray-800 transition-all duration-300 cursor-pointer custom-clickable ${
            isHeaderHovered ? 'filter-none' : 'blur-sm'
          }`}
          aria-label="Josh Green"
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          <span className="md:hidden">
            <FloatingLetters text="JG" />
          </span>
          <span className="hidden md:inline">
            <FloatingLetters text="Josh Green" />
          </span>
        </h1>
        <div className="flex items-center gap-4">
          {isDarkMode && (
            <span className="text-xs md:text-sm text-gray-500 select-none whitespace-nowrap">
              hold to annotate
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="w-9 h-5 custom-clickable relative rounded-full"
            style={{ border: '0.5px solid #81FF03' }}
          >
            <span
              className="absolute w-4 h-4 rounded-full transition-transform duration-200"
              style={{
                left: '2px',
                top: '50%',
                transform: isDarkMode ? 'translate(16px, -50%)' : 'translate(0, -50%)',
                backgroundColor: '#81FF03'
              }}
            />
          </button>
        <Link 
          to="/about" 
            className={`text-gray-800 font-normal text-base transition-all duration-300 ${
            isAboutHovered ? 'blur-[1px]' : 'filter-none'
          }`}
          onMouseEnter={() => setIsAboutHovered(true)}
          onMouseLeave={() => setIsAboutHovered(false)}
        >
          About
        </Link>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="portfolio-sidebar w-full flex flex-col min-h-0" style={{ paddingLeft: '32px', paddingRight: '24px' }}>
          <div ref={sidebarScrollRef} className="portfolio-sidebar-scroll scroll-clip__inner is-root-scroll flex-1 pb-20">
            <div className="portfolio-sidebar__content">
            {orderedCategories.map(([category, categoryProjects]) => (
              <div key={category} className="mb-8">
                <h2 className="portfolio-sidebar__category text-base font-normal text-gray-900 mb-4">{category}</h2>
                {categoryProjects.map((project, projectIndex) => (
                    <React.Fragment key={project.id}>
                      <div
                        className="portfolio-sidebar__project-row group cursor-pointer custom-clickable transition-all duration-300"
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div 
                            className={`min-w-0 transition-all duration-300 ${
                              selectedProject?.id === project.id ? 'filter-none' : 'group-hover:blur-sm'
                            }`}
                          >
                            <div
                              className="portfolio-sidebar__project-name font-normal text-gray-900 leading-relaxed"
                              style={{ scrollMarginTop: '1.5rem' }} // ~40px breathing room
                              ref={el => projectTitleRefs.current[project.id] = el}
                            >
                              {project.name}
                            </div>
                            {project.date && (
                              <div className="portfolio-sidebar__project-date text-xs text-gray-500">{project.date}</div>
                            )}
                          </div>
                          <div 
                            className={`h-2 w-2 flex-shrink-0 rounded-full transition-all duration-300 ${
                              selectedProject?.id === project.id ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ backgroundColor: '#81FF03' }}
                          />
                        </div>
                      </div>
                      
                      {/* Dashed separator */}
                      {projectIndex < categoryProjects.length - 1 && (
                        <div 
                          className="portfolio-sidebar__project-separator border-b border-dashed border-gray-300"
                          style={{ borderWidth: '0.5px' }}
                        />
                      )}

                      {/* Only show images for selected project on mobile */}
                      {project.images && project.images.length > 0 && project.id === selectedProject?.id && (
                        <div className="block md:hidden mt-3 mb-5">
                          {/* Project Title and Description for Mobile */}
                          <div className="mb-6">
                            <h2 className="text-xl font-normal text-gray-900 mb-2">
                              {project.name}
                            </h2>
                            {project.date && (
                              <p className="text-xs text-gray-500 mb-3">
                                {project.date}
                              </p>
                            )}
                            {renderRoleChips(project, { className: 'mb-3', keyPrefix: 'mobile' })}
                            {renderWovenDescription(project, 'text-sm text-gray-600 leading-relaxed max-w-md')}
                          </div>
                          {renderCaseStudyBlocks(project.caseStudyBlocks?.before, {
                            className: 'mb-10',
                            bodyClassName: 'text-sm text-gray-600 leading-relaxed max-w-md',
                            project,
                            openModal,
                          })}
                          {project.images.map((imgObj, idx) => {
                            const caption = typeof imgObj === 'string' ? null : imgObj.caption;
                            const body = typeof imgObj === 'object' ? imgObj.body : null;
                            const sectionHeading = typeof imgObj === 'object' ? imgObj.sectionHeading : null;
                            return (
                              <div
                                key={idx}
                                className="flex flex-col mb-10 last:mb-0 items-start"
                              >
                                {renderSectionBody(body, {
                                  heading: sectionHeading,
                                  className: 'text-sm text-gray-600 leading-relaxed max-w-md',
                                })}
                                {renderProjectMedia(imgObj, project, idx, {
                                  openModal,
                                })}
                                <div className="flex items-center gap-2 mt-4 justify-start">
                                  <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 text-gray-300 text-xs font-medium">
                                    {idx + 1}
                                  </span>
                                  <span className="text-gray-300 text-sm font-medium text-left">
                                    {caption || `${project.name} — Image ${idx + 1}`}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                          {renderCaseStudyBlocks(project.caseStudyBlocks?.after, {
                            className: 'mb-10',
                            bodyClassName: 'text-sm text-gray-600 leading-relaxed max-w-md',
                            project,
                            openModal,
                          })}
                          <div
                            className="border-b border-dashed border-gray-300 my-2"
                            style={{ borderWidth: '0.5px' }}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="portfolio-main-column md:relative min-h-0" ref={mainContentRef}>
          {selectedProject && (
            selectedProject.images.length > 0 ? (
              <div
                ref={mainContentScrollRef}
                className="portfolio-main-scroll scroll-clip__inner is-root-scroll hidden md:block min-h-0 pb-48"
              >
                {/* Project Title and Description */}
                <div
                  className="pt-0 pb-12"
                  data-case-study-section="overview"
                  style={{ scrollMarginTop: '1.5rem' }}
                >
                  <h2 className="text-2xl font-normal text-gray-900 mb-2">
                    {selectedProject.name}
                  </h2>
                  {selectedProject.date && (
                    <p className="text-sm text-gray-500 mb-4">
                      {selectedProject.date}
                    </p>
                  )}
                  {renderRoleChips(selectedProject, { keyPrefix: 'desktop' })}
                  {renderWovenDescription(selectedProject, 'text-sm text-gray-600 leading-relaxed max-w-2xl')}
                </div>
                {renderCaseStudyBlocks(selectedProject.caseStudyBlocks?.before, {
                  project: selectedProject,
                  openModal,
                })}
                {selectedProject.images.map((imgObj, idx) => {
                  const caption = typeof imgObj === 'string' ? null : imgObj.caption;
                  const body = typeof imgObj === 'object' ? imgObj.body : null;
                  const sectionHeading = typeof imgObj === 'object' ? imgObj.sectionHeading : null;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col mb-16 last:mb-0 items-start"
                      data-case-study-section={`section-${idx}`}
                      style={{ scrollMarginTop: '1.5rem' }}
                    >
                      {renderSectionBody(body, { heading: sectionHeading })}
                      {renderProjectMedia(imgObj, selectedProject, idx, {
                        maxWidth: '920px',
                        maxHeight: '78vh',
                        openModal,
                      })}
                      <div className="flex items-center gap-2 mt-4">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 text-xs font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-gray-300 text-sm font-medium text-left">
                          {caption || `${selectedProject.name} — Image ${idx + 1}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {renderCaseStudyBlocks(selectedProject.caseStudyBlocks?.after, {
                  project: selectedProject,
                  openModal,
                })}
              </div>
            ) : (
              <div className="portfolio-main-scroll hidden md:flex items-center justify-center min-h-0 text-gray-400">
                <div className="text-center">
                  <div className="text-lg mb-2">{selectedProject.name}</div>
                  <div className="text-sm">No images available</div>
                </div>
              </div>
            )
          )}
        </div>

        <CaseStudyNav
          sections={caseStudySections}
          activeSectionId={activeSectionId}
          onSelectSection={handleSelectSection}
          onIndex={handleCaseStudyIndex}
        />
      </div>
      {modalImage && (
        <Modal 
          src={modalImage.src} 
          alt={modalImage.alt} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Portfolio;

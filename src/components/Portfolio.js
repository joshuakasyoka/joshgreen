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
import Moata3dMapSyncDemo from './Moata3dMapSyncDemo';
import MoataGisToolboxDemo from './MoataGisToolboxDemo';
import MoataGisMeasureDemo from './MoataGisMeasureDemo';
import MoataGisEditorDemo from './MoataGisEditorDemo';
import MoataGisSpatialQueryDemo from './MoataGisSpatialQueryDemo';
import MoataGisTimeSliderDemo from './MoataGisTimeSliderDemo';
import SafeCyclesDemo from './SafeCyclesDemo';
import ResponsiveDemoFrame from './ResponsiveDemoFrame';
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
import EmmaSpatialQueryDemo from './EmmaSpatialQueryDemo';
import EmmaActionCardDemo from './EmmaActionCardDemo';
import EmmaPermissionsDemo from './EmmaPermissionsDemo';
import EmmaWorkspaceDemo from './EmmaWorkspaceDemo';
import EmmaChatThreadsDemo from './EmmaChatThreadsDemo';
import EmmaResearchQuoteDemo from './EmmaResearchQuoteDemo';
import EmmaProblemFramingDemo from './EmmaProblemFramingDemo';
import EmmaGovernanceInsightDemo from './EmmaGovernanceInsightDemo';
import BugDexScanDemo from './BugDexScanDemo';
import BugDexCardDemo from './BugDexCardDemo';
import BugDexCollectionDemo from './BugDexCollectionDemo';
import BugDexLeaderboardDemo from './BugDexLeaderboardDemo';
import BugDexProfileDemo from './BugDexProfileDemo';
import BugDexScanProgressPair from './BugDexScanProgressPair';
import BugDexMapCollectionPair from './BugDexMapCollectionPair';
import BugDexCardLeaderboardPair from './BugDexCardLeaderboardPair';
import BugClubStackDiagram from './BugClubStackDiagram';
import ReflectionQuestions from './ReflectionQuestions';
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
    'AI Exploration': [
      {
        id: 18,
        isNew: true,
        name: 'Bug Club',
        date: 'Jul 2026',
        description: 'A Pokémon-style iOS app that turns real insects into collectible trading cards — photograph a bug, let AI identify it, and add it to the Bug Club.',
        overview: [
          'Bug Club is a personal iOS experiment: photograph a real insect and it becomes a ',
          { text: 'collectible trading card' },
          ' — species identified by AI vision, stats and attacks invented from the animal\'s real behaviour, artwork stylised from your own photo. The design question was whether a game frame could make people ',
          { text: 'look closer at the bugs around them' },
          ' — and the card had to feel earned, not generated.',
        ],
        fullDescription: 'A Pokémon-inspired iOS app that identifies real insects from photos using Claude\'s vision API, invents creature names, stats, and attacks grounded in the animal\'s real behaviour, and renders each catch as an illustrated trading card in a shared social collection.',
        website: '',
        startingPoint: 'Insect ID apps stop at a species name — the bet was that a trading-card frame with rarity, types, and a leaderboard could turn identification into collection, and a walk in the park into a hunt.',
        outcome: 'A working app on my iPhone: scan a bug, get a card grounded in real biology, keep it in a typed collection with catch locations, and compete with friends on the club leaderboard.',
        techStack: 'Stack: SwiftUI, Supabase (auth, feed, leaderboard), Core Image, on-device persistence. AI note: Claude Opus vision with a structured-output schema returns real species plus invented card stats — Claude Fable for fast iteration in Cursor — attacks stay grounded in actual insect behaviour, so the game layer teaches rather than invents.',
        images: [
          {
            sectionHeading: 'Problem Space',
            body: [
              'On walks across the South Downs I\'ve been finding bugs everywhere — butterflies on seed heads, beetles in the grass — and wanting to ',
              { text: 'identify them' },
              '. That impulse is where Bug Club started.',
            ],
            srcs: [
              '/images/bug-club/problem-space-butterfly.png',
              '/images/bug-club/problem-space-field.png',
            ],
            caption: 'South Downs — the bugs worth catching',
          },
          {
            sectionHeading: 'Creating an iOS app',
            body: [
              'AI Exploration meant going end-to-end as a product designer — not just sketch the flows, but ',
              { text: 'ship a working app' },
              ' using the latest AI tools. I built Bug Club in ',
              { text: 'Cursor' },
              ' and ',
              { text: 'SwiftUI' },
              ', wiring together the services the idea needed. ',
              { text: 'Claude Opus' },
              ' handles identification — vision plus a structured-output schema that returns the real species, invented card stats, and attacks tied to how the animal actually behaves. ',
              { text: 'Claude Fable' },
              ' was the fast loop for flows and prompt tuning in Cursor. For card art I tried both an on-device ',
              { text: 'Core Image and Apple Vision' },
              ' pipeline to lift the bug off the background and posterise it, and ',
              { text: 'Gemini' },
              ' image generation — ',
              { text: 'Nano Banana' },
              ', as the codebase calls it — to turn the crop into flat field-guide illustrations from the photo reference.',
              { break: true },
              { text: 'Supabase' },
              ' backs the club layer: auth, profiles, friends, feed, leaderboard, and Edge Functions that proxy the AI keys server-side so signed-in collectors can scan without bringing their own. Catch locations come from Core Location.',
              { break: true },
              'I signed builds in ',
              { text: 'Xcode' },
              ', shipped through ',
              { text: 'TestFlight' },
              ' to friends, and hosted the ',
              { text: 'privacy policy URL' },
              ' on ',
              { text: 'Vercel' },
              ' for App Store compliance — design, code, AI, and distribution in one loop, tested on real bugs from the Downs.',
            ],
            demo: 'bugclub-stack',
            caption: 'Bug Club — tech stack',
          },
          {
            demo: 'bugdex-scan-progress',
            caption: 'Scan flow and progression — snap, identify, level up',
            sectionHeading: 'Scan a bug',
            body: [
              'The whole pitch is one loop: ',
              { text: 'find a bug, snap it, add it to the Bug Club' },
              '. The capture flow stays deliberately small — take a photo or choose from library, nothing else, because bugs don\'t wait for camera settings. Claude Opus identifies the real species behind a scan animation, and the reveal lands as a ',
              { text: 'card, not a search result' },
              '.',
              { break: true },
              'Points break down by ',
              { text: 'catches, species, types, places, and badges' },
              ' — so there\'s always more than one way to progress. Level names like Pollinator and Swarm Leader keep the tone playful; the progress bar sitting 20 points from the next rank is the hook that gets the app opened tomorrow.',
            ],
          },
          {
            demo: 'bugdex-map-collection',
            caption: 'Catch locations and collection — pins across the South Downs, new catch lands in the club',
            sectionHeading: 'Caught here',
            body: [
              'Every card records ',
              { text: 'where the bug was caught' },
              ' — map pins turn the collection into a diary of places as much as species. A ladybird from Ditchling Beacon is a different memory than the same species from a car park.',
              { break: true },
              'Catches are organised the way a card binder would be — grouped by ',
              { text: 'type' },
              ', with a category tracker across the top. When a new catch lands, its type lights up and the counter ticks over — the empty categories are the ',
              { text: 'reason to go outside again' },
              '.',
            ],
          },
          {
            demo: 'bugdex-card-leaderboard',
            caption: 'Card carousel and leaderboard — photo to card, rare find changes the ranking',
            sectionHeading: 'From photo to card',
            body: [
              'One photo becomes a full card: the model identifies the ',
              { text: 'real species' },
              ' — here a male stag beetle — then invents a creature name, type, HP, and attacks with a structured-output schema. The constraint that made it work: every attack is ',
              { text: 'grounded in the animal\'s actual behaviour' },
              '. Antler Lock and Sap Feast are what stag beetles really do — males wrestle rivals from branches and adults live on tree sap — down to the Latin name in the footer. Rare cards get the holographic shimmer.',
              { break: true },
              'Supabase turns a solo collection into a club — collectors are ranked by points, with ',
              { text: 'bug counts and rare finds' },
              ' as the tiebreak stats that matter. Small stakes, but enough that a rare catch on a lunchtime walk feels worth logging.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'The design risk was the AI inventing nonsense — a card generator that ignores the real animal is a toy, not a reason to look closer. Constraining generation with a ',
                { text: 'structured schema grounded in real behaviour' },
                ' kept every card honest: the game layer sits on top of actual biology, never instead of it. Building for my own pocket meant every decision was tested on real walks — the next push is richer social play, trading cards between collectors rather than just ranking them.',
                { break: true },
                'Five questions I\'m still sitting with from this project:',
              ],
              questions: [
                'What is the role of software like Figma in an age of AI-enhanced product design?',
                'What happens to the boundary between development and design when a designer can ship from Cursor as easily as from a prototype?',
                'How do we protect time for user research and deeper inquiry now that the build bottleneck has moved?',
                'How can we ship products of real quality in spaces that deserve to be explored — not just the ones with obvious commercial pull?',
                'How do we do any of this while weighing the environmental cost and ethical dimensions of AI?',
              ],
            },
          ],
        },
      },
    ],
    'Creative Projects': [
      { 
        id: 1, 
        name: 'London AI Voices', 
        date: 'May 2026', 
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
        date: 'April 2026', 
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
        date: 'Jan 2026', 
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
        name: 'Moata Geospatial', 
        date: '2026', 
        description: 'Lead product design on Moata Geospatial — Mott MacDonald\'s GIS for infrastructure programmes. A comments feature case study from shared-map conflict to safer collaboration across 2D and 3D.',
        overview: [
          'Moata Geospatial is ',
          { text: "Mott MacDonald's GIS platform" },
          ' for civil engineering — the tool infrastructure teams use on major programmes like HS2. As lead product designer, I work across the full product, from early concept through to shipped features. This case study follows one thread: a ',
          { text: 'map-native comments system' },
          ' designed and delivered to improve how project teams communicate and manage work across 2D and 3D environments.',
        ],
        fullDescription: 'Moata Geospatial is Mott MacDonald\'s GIS platform for civil engineering, used on major infrastructure programmes like HS2. As lead product designer, I work across feature development on the product. This case study follows map-native comments — designed and shipped to improve project management and communication across 2D and 3D.',
        website: 'https://www.mottmac.com/en/digital-solutions/',
        startingPoint: 'Every team stepped on each other\'s map state — user interviews showed isolated workspaces had to ship before thread metadata, panel grids, or 3D commenting could matter.',
        outcome: 'Project spaces, map-anchored comments with audit trails, a processing panel, and unified 2D/3D commenting — each layer solving the next collaboration failure we found in QA.',
        techStack: 'Product design, interaction design, prototyping, motion design.',
        images: [
          {
            demo: 'moata-blank-screen',
            caption: 'Moata Geospatial — shared workspace',
            sectionHeading: 'Challenge',
            body: [
              "Teams weren't commenting in the GIS platform — they ",
              { text: 'defaulted to email, external tools, and PowerPoint' },
              '. ',
              { text: 'Spatial context and project communication became decoupled' },
              '. We needed to understand what would give users the confidence to ',
              { text: 'comment natively on the map' },
              ', and bring more project teams into the platform.',
            ],
          },
          {
            demo: 'moata-research-quote',
            caption: 'User interviews — shared map pain',
            sectionHeading: 'User Interviews',
            body: [
              'We spoke with GIS admins, specialists, and technicians alongside domain experts from ecology, archaeology, and engineering — across projects ranging from under 200 to over 500 people. The focus was simple: understand ',
              { text: 'how teams actually communicate' },
              ' on live infrastructure programmes.',
            ],
          },
          {
            demo: 'moata-problem-wireframe',
            caption: 'Problem framing — shared map structure',
            sectionHeading: 'Problem Framing',
            body: [
              'Interviews surfaced a cluster of barriers: fear that ',
              { text: 'comments would get lost' },
              ', a weak audit trail, no way to filter or triage existing annotations. But the deeper issue was structural. Projects were set up so that every team — ecology, structures, utilities, archaeology — ',
              { text: 'shared the same map space' },
              '. At that scale, comments accumulated fast and ',
              { text: 'signal got buried in noise' },
              '.',
              { break: true },
              "What teams needed wasn't just better comments. They needed confidence that their ",
              { text: 'communication could happen at a team level' },
              ' — without disrupting, or being disrupted by, the rest of the project.',
            ],
          },
          {
            demo: 'moata-spaces',
            caption: 'Create and switch between project spaces',
            sectionHeading: 'Project spaces',
            body: [
              'We introduced ',
              { text: 'Project Spaces' },
              ' — letting teams pull a selection of layers from the main map into a ',
              { text: 'private or shared environment' },
              ' scoped to their workstream. Teams could communicate about specific features without cluttering the shared map, and experiment with the platform without fear of disrupting the main project setup. This became the foundation for the ',
              { text: 'comments infrastructure' },
              ' that followed.',
            ],
          },
          {
            demo: 'moata-map-comment',
            caption: 'Place a comment from the draw toolbar',
            sectionHeading: 'Comments on the Map',
            body: [
              'A persistent toolbar anchored to the map gave users a clear way to comment on a feature, coordinate, or layer — responding directly to the finding that ',
              { text: "most users didn't know commenting was even possible" },
              '. It brought ',
              { text: 'communication to the heart of the platform' },
              '.',
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
            sectionHeading: 'Comment Metadata',
            body: [
              "Comments alone weren't enough — they had to be ",
              { text: 'trackable' },
              '. Working with project leads, we co-defined a ',
              { text: 'metadata model' },
              ': status, task links, coordinates, type, and activity history. Without it, threads would be ',
              { text: 'impossible to follow across a live programme' },
              '.',
            ],
          },
          {
            demo: 'moata-comments-panel',
            caption: 'Open a comment in the side panel',
            sectionHeading: 'Comments panel',
            body: [
              'Users also wanted a ',
              { text: 'more permanent home for comments' },
              '. A right-hand panel brought all threads into a ',
              { text: 'single searchable list' },
              ' — open a card to read the full conversation, properties, and audit trail, without leaving the map. Comments were no longer buried as small icons on the canvas; they had a ',
              { text: 'persistent, navigable home' },
              ' alongside the spatial context they referred to.',
            ],
          },
          {
            demo: 'moata-comments-grid',
            caption: 'Filter comments and widen the panel for a grid view',
            sectionHeading: 'Filter & Scan',
            body: [
              'Rather than adding filters in a separate screen or modal, users drag the left edge of the comments panel to ',
              { text: 'expand it' },
              ' — cards reflow into a ',
              { text: 'two-column grid' },
              ', letting teams scan open items at a glance without opening each thread.',
            ],
          },
          {
            demo: 'moata-model-viewer',
            caption: 'Comment on 3D assets in the model viewer',
            sectionHeading: '2D and 3D Unified',
            body: [
              'Comments needed to work across both 2D GIS views and 3D data — teams were exporting comments from external tools like ',
              { text: 'Rhino and Grasshopper' },
              ' just to share spatial feedback. Unifying the commenting experience across both environments was central to bringing more of the project team into the platform and ',
              { text: 'reducing reliance on workarounds' },
              '.',
            ],
          },
          {
            demo: 'moata-tabs',
            caption: 'Tab system — switch between panels',
            sectionHeading: 'Panel Tabs',
            body: [
              'A small but meaningful detail — a ',
              { text: 'tabbed panel' },
              ' let users move fluidly between comments and existing GIS tools and layer views without losing their place. A minor UX change that significantly ',
              { text: 'reduced friction' },
              ' in day-to-day workflows.',
            ],
          },
          {
            demo: 'moata-map-pins',
            caption: 'Comment threads across the programme map',
            sectionHeading: 'Map at Scale',
            body: [
              'While ',
              { text: 'Project Spaces' },
              ' gave teams room to communicate in smaller groups, project managers still needed oversight of everything happening across the programme. The comments infrastructure was designed to support both — granular team-level communication and a ',
              { text: 'unified view' },
              ' when full project visibility was needed.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflection',
              body: [
                'This project required understanding a ',
                { text: 'behavioural problem' },
                ' before designing a technical one — why teams weren\'t using the platform, not just what to build. Working closely with project leads and domain specialists from research through to delivery, the result was a comments infrastructure that brought ',
                { text: 'multidisciplinary communication' },
                ' back to the map itself.',
              ],
            },
          ],
        },
      },
      {
        id: 10,
        name: 'EMMA',
        date: '2026', 
        description: 'An internal AI assistant that brings natural-language control to Moata Geospatial — layers, bundles, and spatial tools from a governed side-panel chat.',
        fullDescription: 'EMMA is an internal AI assistant designed with Mott MacDonald to improve how knowledge is discovered, trusted, and shared across a global workforce of over 20,000 employees. A key entry point was embedding EMMA inside Moata Geospatial so engineers could describe GIS tasks in plain language — toggling layers, loading working bundles, running spatial queries — without leaving the map.',
        website: 'https://www.mottmac.com/en/insights/advancing-ai-in-engineering-what-the-industry-needs-to-know/',
        overview: [
          'EMMA is Mott MacDonald\'s internal AI assistant — built to surface decisions, trusted voices, and institutional knowledge from within the organisation\'s own systems. Practice teams began ',
          { text: 'curating their own sources' },
          ' within days, improving accuracy and governance. Within two weeks, ',
          { text: '25% of the workforce' },
          ' had adopted EMMA. Today it powers onboarding, expert discovery, and workflow automation across teams, without relying on external AI providers.',
        ],
        startingPoint: 'Workshops with GIS leads and project admins surfaced two audiences on one platform — specialists who want SQL depth, admins who just need the right layers and a site boundary. We mapped those intents on post-its before designing consent flows.',
        outcome: 'Layers, bundles, and spatial queries open from conversation — specialists review pre-filled SQL; project admins get plain-language layer discovery — every action gated by permission cards and auditable API traces.',
        techStack: 'Stack: secure enterprise cloud, retrieval over internal corpora, Moata Geospatial integration. AI note: intent detection for layer, bundle, and spatial-query commands; RAG-first answers with mandatory citations; bounded generation for 20k+ employee governance.',
        images: [
          {
            demo: 'emma-research-quote',
            caption: 'Programme interview — GIS democratisation',
            sectionHeading: 'User Interviews',
            body: [
              'We validated over 100 potential AI use cases before aligning with Mott MacDonald on the highest-impact starting point: ',
              { text: 'intelligent search' },
              '. That meant speaking to people across the organisation to understand how knowledge actually moved — and where it got stuck.',
            ],
          },
          {
            demo: 'emma-problem-framing',
            caption: 'Mapping intents workshop — post-it synthesis',
            sectionHeading: 'Problem Framing',
            body: [
              'We ran ',
              { text: 'intent-mapping workshops' },
              ' with GIS specialists and project admins, using sticky notes to cluster the tasks users wanted to complete through natural language — layer discovery, spatial queries, simple map views, tool bundles. ',
              { text: 'Distinct workflow patterns' },
              ' emerged, and we needed to support users across each of them, as well as complete end-to-end workflows in a single interaction.',
            ],
          },
          {
            demo: 'emma-chat-threads',
            caption: 'Threaded chats per GIS task',
            sectionHeading: 'Project Context',
            body: [
              'Each geospatial task gets its own ',
              { text: 'conversation thread' },
              ' — substation siting, ecology bundles, spatial queries — so context stays attached to the work rather than lost in a single endless chat.',
            ],
          },
          {
            demo: 'emma-governance-insight',
            caption: 'Trust insight — consent before the map changes',
            sectionHeading: 'Trust & Control',
            body: [
              'Interviews surfaced a hard constraint — teams were ',
              { text: 'uncomfortable with natural language taking full control' },
              ' of the map. Project data is sensitive and often complex to configure; users needed transparency around what EMMA was doing and confidence that it wouldn\'t disrupt their setup.',
            ],
          },
          {
            demo: 'emma-permissions',
            caption: 'Consent before EMMA changes the map',
            sectionHeading: 'Governed Changes',
            body: [
              'Silent map mutations were a non-starter. Proposed actions surface a ',
              { text: 'permission request card' },
              ' — nothing changes until the user approves. The design challenge was making that governance feel like speed, not friction.',
            ],
          },
          {
            demo: 'emma-toggle-layers',
            caption: '“Bring the transport layers forward”',
            sectionHeading: 'Add Layers',
            body: [
              'Once approved, a simple ',
              { text: '“yes”' },
              ' activates road and rail overlays on the live map — confirmed in chat with a structured layer card, no manual search through the layer gallery.',
            ],
          },
          {
            demo: 'emma-action-card',
            caption: 'Confirmation cards inside the thread',
            sectionHeading: 'Confirmations',
            body: [
              'Every completed action renders as a ',
              { text: 'structured card' },
              ' in the chat — layer adds show a layers icon; tool opens expose the APIs EMMA ran, expandable for audit and replay.',
            ],
          },
          {
            demo: 'emma-spatial-query',
            caption: '“Run a spatial query on the corridor”',
            sectionHeading: 'Tool Access',
            body: [
              'Spatial analysis follows the same pattern — EMMA opens ',
              { text: 'Spatial Query' },
              ' with input layer, buffer, and target pre-filled so specialists review SQL-backed settings while project admins never touch the query builder. One ask, two levels of depth.',
            ],
          },
        ],
        caseStudyBlocks: {
          before: [
            {
              id: 'challenge',
              heading: 'Challenge',
              demo: 'emma-workspace',
              caption: 'Ask EMMA from inside the map workspace',
              body: [
                'Mott MacDonald set out to embed AI across its global operations — 20,000+ employees, decades of knowledge, and no clear place to start. Generic tools like ',
                { text: 'Microsoft Copilot' },
                ' felt too broad, too disconnected from civil engineering\'s specifics, and too expensive at scale.',
                { break: true },
                'What the organisation needed wasn\'t another AI overlay. It needed a ',
                { text: 'product — and a partner' },
                ' — that could define the opportunity, ground it in reality, and deliver something valuable fast.',
              ],
            },
          ],
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Designing EMMA meant holding two speeds at once — specialist workflows and accessible natural language — without compromising the platform\'s depth. The ',
                { text: 'trust and governance constraints' },
                ' weren\'t obstacles; they shaped the best design decisions. Pairing with engineers from day one meant confirmation cards and audit traces were built around what teams would ',
                { text: 'actually use' },
                ', not what looked good in a prototype.',
              ],
            },
          ],
        },
      },
      {
        id: 16,
        name: 'Moata 3D',
        date: '2026',
        description: 'Bringing ACC model data into the map side panel — version history, comparison, and property inspection without leaving Moata.',
        overview: [
          'Moata Geospatial previously relied on external platforms like ',
          { text: 'Autodesk Construction Cloud' },
          ' for 3D modelling — requiring users to context-switch away from the map entirely. We designed a new experience that brought an ACC viewer directly into the GIS environment, so teams could explore 3D models alongside the spatial context they needed, ',
          { text: 'without leaving the platform' },
          '.',
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
            sectionHeading: 'Open from Layers',
            body: [
              'ACC model data lives in the ',
              { text: 'layers panel' },
              ', accessible directly from the layer tree. From there, users can open the model viewer and 3D inspector without leaving the map. The viewer acts as a ',
              { text: 'twin of the 3D model' },
              ' rendered on the map itself — an ACC synchronised replica alongside the GIS context.',
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
            sectionHeading: 'Version Control',
            body: [
              'Scrubbing alone does not answer “what changed?” — teams need to ',
              { text: 'pick specific revisions' },
              ' side by side. Version Control lists every upload date; the properties table below colour-codes values per model, surfacing diffs in concrete grade, fire rating, or section size as highlighted chips.',
            ],
          },
          {
            demo: 'moata-3d-asset-ring',
            caption: 'Drill from layer into a column revision',
            sectionHeading: 'Isolate Assets',
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
          before: [
            {
              id: 'challenge',
              heading: 'Challenge',
              demo: 'moata-3d-map-sync',
              caption: 'ACC model rendered live on the GIS map',
              body: [
                'The core design challenge was ',
                { text: 'synchronisation' },
                ' — creating an intuitive way to work with 3D model data alongside 2D GIS layers without the two views feeling disconnected. Users needed ',
                { text: 'spatial context from both' },
                ', at the same time.',
              ],
            },
          ],
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'The key insight was that engineers weren\'t leaving the platform by choice — they were leaving because ',
                { text: 'in-context version comparison' },
                ' didn\'t exist yet. By prototyping the timeline and multi-select against real ACC payloads, we could bring revision comparison directly into the map, colour-coded in place, without opening a second viewer. ',
                { text: 'Staying close to real data early' },
                ' kept the solution grounded in what engineers actually needed to see.',
              ],
            },
          ],
        },
      },
      {
        id: 15,
        name: 'Doodler',
        date: '2026',
        description: 'A co-created visual tool for therapists and patients to talk through difficult moments in care.',
        overview: [
          'Difficult conversations in care often stall on ',
          { text: 'clinical language' },
          ' — records sit with the practitioner, not the people they\'re about. Doodler is a co-created visual tool where therapists and patients build illustrated tiles together during a session. I led the design of the product, holding the flow to a ',
          { text: 'single path' },
          ' from session capture to shared summary — narrow enough to use after a difficult hour.',
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
                'Therapist interviews shaped the initial spec, and AI helped stress-test edge cases like co-editing during a crisis moment. But the constraint I held throughout was a ',
                { text: 'single path from tile to summary' },
                ' — simple enough to use when the session itself had been hard. The next push would be ',
                { text: 'async sharing between sessions' },
                '; the prototype proved the in-room flow, not what happens to that shared understanding once people go home.',
              ],
            },
          ],
        },
        images: [
          {
            demo: 'doodler-table',
            caption: 'Care path table — shared map of sessions and topics',
            sectionHeading: 'Shared Planner',
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
        id: 17,
        name: 'Moata GIS Tools',
        date: '2026',
        description: 'A walkthrough of Moata Geospatial\'s professional GIS toolset — measure, edit, query, and time-enabled analysis, all from one toolbar.',
        overview: [
          'Moata Geospatial had to hold its own as a ',
          { text: 'professional GIS tool' },
          ' — the kind of measuring, editing, querying, and time-based analysis engineers expect from ArcGIS, but native to the Mott MacDonald teams. We ',
          { text: 'rebuilt all the GIS tools' },
          ' for Moata Geospatial, talking to domain specialists across disciplines to get them right.',
        ],
        fullDescription: 'A walkthrough of Moata Geospatial\'s professional GIS toolset — measure, edit, query, and time-enabled analysis, all surfaced from a single toolbar so engineers never have to leave the shared map for specialist tooling.',
        website: 'https://www.mottmac.com/en/digital-solutions/',
        startingPoint: 'Engineers trusted ArcGIS for serious analysis and treated Moata as a viewer — the toolbar had to prove the platform could do the real work too.',
        outcome: 'A unified toolbar — measure, edit, spatial query, and time slider — so engineers run professional GIS analysis without switching tools.',
        techStack: 'Product design, interaction design, prototyping, motion design.',
        images: [
          {
            demo: 'moata-gis-toolbox',
            caption: 'Opening the toolbox menu',
            sectionHeading: 'One Toolbar',
            body: [
              'Every tool lives behind a single ',
              { text: 'Toolbox' },
              ' entry point — Measure, Editor, Spatial Query, Time Slider, and more, pinnable to a custom bar so the tools each engineer actually uses stay one click away.',
            ],
          },
          {
            demo: 'moata-gis-measure',
            caption: 'Measuring distance and bearing on the map',
            sectionHeading: 'Measure',
            body: [
              'A live ',
              { text: 'distance and bearing' },
              ' readout follows the cursor as engineers trace a route on the map — the same calculation they\'d reach for ArcGIS to do, now ',
              { text: 'one click from the shared map' },
              '.',
            ],
          },
          {
            demo: 'moata-gis-editor',
            caption: 'Drawing and classifying a new feature',
            sectionHeading: 'Editor',
            body: [
              'The Editor lets engineers draw and classify features directly against ',
              { text: 'live feature templates' },
              ' — survey areas, diversions, closures — with area calculated as the shape is drawn, not after the fact.',
            ],
          },
          {
            demo: 'moata-gis-spatial-query',
            caption: 'Buffering features for a spatial query',
            sectionHeading: 'Spatial Query',
            body: [
              'Engineers buffer a feature set by distance and test it against a target layer — the same ',
              { text: 'intersects / within' },
              ' analysis a GIS specialist would script, exposed as a ',
              { text: 'guided panel' },
              ' anyone on the project can run.',
            ],
          },
          {
            demo: 'moata-gis-time-slider',
            caption: 'Scrubbing GIS data through time',
            sectionHeading: 'Time Slider',
            body: [
              'Time-enabled layers play back through a custom date range, with features fading in and out as the ',
              { text: 'window scrubs forward' },
              ' — letting teams see how site conditions or survey data evolved across the programme.',
            ],
          },
        ],
        caseStudyBlocks: {
          after: [
            {
              id: 'reflections',
              heading: 'Reflections',
              body: [
                'Comments solved how teams talked to each other; this solved whether the platform could replace the specialist tools engineers already trusted. The bar wasn\'t feature parity with ArcGIS — it was ',
                { text: 'making each tool feel native' },
                ' to the map teams were already working in, not bolted on.',
              ],
            },
          ],
        },
      },
      {
        id: 3,
        name: 'Materials Archive',
        date: '2026',
        website: 'https://gcdp-archive-2026.vercel.app/',
        description: 'Digital archive for the MA Global Collaborative Design Practice — browse artefacts, trace collaborations, and explore student research across UAL and Kyoto Institute of Technology.', 
        overview: [
          'UAL asked me to design a course archive for the ',
          { text: 'MA Global Collaborative Design Practice' },
          ' programme — a platform where students across multiple cohorts could upload project work and explore the relationships between project partners, previous years, and concurrent cohorts.',
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
          before: [
            {
              id: 'challenge',
              heading: 'Challenge',
              body: [
                'The challenge was making that ',
                { text: 'relationality visible and navigable' },
                ', not just stored — surfacing how projects connect across partners, previous years, and concurrent cohorts, rather than leaving the archive as a flat, searchable grid.',
              ],
            },
          ],
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
        date: '2026', 
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
        date: '2026', 
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
      //   date: '2026', 
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
        date: 'May 2026',
        description: 'Designing a banking report format for ClearBank, a fintech providing banking APIs, to be uploaded onto their digital platform.',
        overview: [
          'ClearBank needed a ',
          { text: 'banking report format' },
          ' that could be designed once and uploaded onto their digital platform — giving teams a consistent way to present account and transaction data without rebuilding the format for every report.',
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
          },
          {
            src: '/images/clearbank/7f9eb849.mp4',
            caption: 'ClearBank — documentation flow',
          },
          {
            src: '/images/clearbank/16-Accounts.jpg',
            caption: 'ClearBank — accounts overview',
          },
          {
            src: '/images/clearbank/53c30df9.mp4',
            caption: 'ClearBank — integration walkthrough',
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
        date: 'May 2026',
        description: 'A new direct-to-consumer digital experience for Phillips Auction House\'s luxury watch business.',
        overview: [
          'Phillips, one of the world\'s leading auction houses for contemporary art and design, had a clear challenge: its luxury watch sales were still being handled manually, reliant on emails, phone calls, and offline tracking. The lack of visibility frustrated clients and left internal teams burdened with ',
          { text: 'high-touch admin' },
          '. To modernise operations and meet the expectations of high-net-worth buyers, Phillips needed a digital transformation, starting with a new, ',
          { text: 'direct-to-consumer experience' },
          ' for its watch business.',
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
          },
          {
            src: '/images/phillips/Phillips03.webp',
            caption: 'Phillips — lot detail',
          },
          {
            src: '/images/phillips/Phillips02.webp',
            caption: 'Phillips — collection view',
          },
          {
            src: '/images/phillips/Phillips_Button_Square-Loop.mp4',
            caption: 'Phillips — checkout interaction',
          },
          {
            src: '/images/phillips/Phillips04.webp',
            caption: 'Phillips — acquisition confirmation',
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
          'A few illustrations — ',
          { text: 'I have hundreds' },
          '.',
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
          },
          {
            src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.05.png',
            caption: 'Illustration — texture experiment',
          },
          {
            src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.13.png',
            caption: 'Illustration — colour pass',
          },
          {
            src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.28.png',
            caption: 'Illustration — revised composition',
          },
          {
            src: '/images/illustrations/image.png',
            caption: 'Illustration — finished piece',
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
        date: 'May 2026',
        description: 'A book for local councils to find creative ways to improve AI literacy within their boroughs.',
        overview: [
          'This was a ',
          { text: 'book' },
          ', not a policy document — designed to be picked up by council officers and used to find creative ways to build AI literacy within their boroughs. Across workshops, officers used ',
          { text: 'different language' },
          ' for the same AI literacy gaps, so I structured the book around validated scenarios officers would actually hand to colleagues.',
        ],
        fullDescription: 'A book designed for local councils to find creative, practical ways to improve AI literacy within their boroughs — giving officers shared language and scenarios before policy slides.',
        website: 'https://aivoicesmap.vercel.app/',
        startingPoint: 'Workshops surfaced the same gaps described differently each session — the first task was tabulating definitions before designing the book\'s structure.',
        outcome: 'A book of practical, borough-ready scenarios validated with officers who would distribute it internally — creative starting points councils can actually use in policy and training.',
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
        date: 'May 2026',
        description: 'An Erasmus+ funded project exploring the climate truth crisis through visual communication — exhibited at a tram stop in Tallinn.',
        overview: [
          'Climate Truth Crisis was an ',
          { text: 'Erasmus+ funded project' },
          ' exploring the climate truth crisis and the role visual communication plays in how people trust or distrust climate information. The work culminated in an ',
          { text: 'exhibition at a tram stop in Tallinn' },
          ' — taking the research out of the studio and into a public, everyday space.',
        ],
        fullDescription: 'An Erasmus+ funded research and design project examining the climate truth crisis through visual communication, exploring how misinformation spreads through information systems and culminating in a public exhibition at a tram stop in Tallinn.',
        website: 'https://deathofnero.vercel.app/',
        startingPoint: 'The research question was where trust breaks — outline work mapped reader doubt points before any visual or motion design.',
        outcome: 'A public exhibition at a Tallinn tram stop that withholds easy answers but keeps people looking — structure tuned from how passers-by actually engaged with the work.',
        techStack: 'React, Three.js, WebGL, Vercel, GSAP',
        images: [
          {
            src: '/images/participatory/climate-truth-crisis/12.01.png',
            caption: 'Climate Truth Crisis — opening chapter',
          },
          {
            src: '/images/participatory/climate-truth-crisis/12.02.png',
            caption: 'Climate Truth Crisis — data fracture',
          },
          {
            src: '/images/participatory/climate-truth-crisis/12.03.png',
            caption: 'Climate Truth Crisis — resolution',
          },
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
        date: 'Apr 2026', 
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
            caption: 'Street installation — the Databooth',
            sectionHeading: 'The Databooth',
            body: [
              'A ',
              { text: 'databooth' },
              ' captured passers-by\'s facial data and turned it into a thermochromic printed receipt — making an abstract idea like facial recognition into something physical that strangers could hold and watch change in their hands.',
            ],
          },
          {
            src: '/images/participatory/street-installations/13.04.png',
            caption: 'Street installation — AI responsiveness audio',
            sectionHeading: 'AI Responsiveness',
            body: [
              'A second plinth generated ',
              { text: 'audio tracks' },
              ' built around AI responsiveness — letting passers-by hear, rather than read, what it feels like to interact with a system that is always listening and reacting.',
            ],
          },
          {
            src: '/images/participatory/street-installations/13.05.png',
            caption: 'Street installation — a decade of YouTube',
            sectionHeading: 'A Decade of YouTube',
            body: [
              'The third plinth surfaced ',
              { text: 'YouTube videos collected from the last ten years' },
              ' and asked passers-by to tag them — turning content moderation and algorithmic labelling into something the public could try themselves.',
            ],
          },
          {
            src: '/images/participatory/street-installations/13.06.png',
            caption: 'Street installation — the deployment game',
            sectionHeading: 'The Deployment Game',
            body: [
              'The final plinth was a ',
              { text: 'game' },
              ' that asked passers-by questions around AI deployment trade-offs — closing the series by putting the hardest decisions directly in strangers\' hands.',
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
      //   date: 'May 2026', 
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
      //   date: 'May 2026', 
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

  const [selectedProject, setSelectedProject] = useState(projects['AI Exploration'][0]);
  // On mobile, all project lists are expanded by default
  const mainContentRef = useRef(null);
  const headerRef = useRef(null);
  const mainContentScrollRef = useRef(null);
  const sidebarScrollRef = useRef(null);
  const preloadedImagesRef = useRef(new Set());
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState('overview');
  // Refs for each project title
  const projectTitleRefs = useRef({});

  const isVideoMedia = (src) => /\.(mp4|mov)$/i.test(src || '');
  const renderProjectMedia = (imgObj, project, idx, { maxWidth = '92%', maxHeight = '65vh', openModal }) => {
    const src = typeof imgObj === 'string' ? imgObj : imgObj.src;
    const srcs = typeof imgObj === 'object' ? imgObj.srcs : null;
    const caption = typeof imgObj === 'string' ? null : imgObj.caption;
    const demo = typeof imgObj === 'object' ? imgObj.demo : null;
    let demoElement = null;

    if (demo === 'doodler-table') {
      demoElement = <DoodlerTableDemo className="self-start w-full" />;
    }
    if (demo === 'doodler-nieuwe-doodle') {
      demoElement = <DoodlerNewDoodleDemo className="self-start w-full" />;
    }
    if (demo === 'doodler-edit-doodle') {
      demoElement = <DoodlerEditDoodleDemo className="self-start w-full" />;
    }
    if (demo === 'doodler-journey') {
      demoElement = <DoodlerJourneyDemo className="self-start w-full" />;
    }
    if (demo === 'doodler-library') {
      demoElement = <DoodlerLibraryDemo className="self-start w-full" />;
    }
    if (demo === 'moata-research-quote') {
      demoElement = <MoataResearchQuoteDemo className="self-start w-full" />;
    }
    if (demo === 'moata-insight-graph') {
      demoElement = <MoataInsightGraphDemo className="self-start w-full" />;
    }
    if (demo === 'moata-problem-wireframe') {
      demoElement = <MoataProblemWireframeDemo className="self-start w-full" />;
    }
    if (demo === 'moata-blank-screen') {
      demoElement = <MoataBlankScreenDemo className="self-start w-full" />;
    }
    if (demo === 'moata-spaces') {
      demoElement = <MoataSpacesDemo className="self-start w-full" />;
    }
    if (demo === 'moata-app-overview') {
      demoElement = <MoataAppOverviewDemo className="self-start w-full" />;
    }
    if (demo === 'moata-map-comment') {
      demoElement = <MoataMapCommentDemo className="self-start w-full" />;
    }
    if (demo === 'moata-comments') {
      demoElement = <MoataCommentsDemo className="self-start w-full" />;
    }
    if (demo === 'moata-comments-panel') {
      demoElement = <MoataCommentsPanelDemo className="self-start w-full" />;
    }
    if (demo === 'moata-comments-grid') {
      demoElement = <MoataCommentsGridDemo className="self-start w-full" />;
    }
    if (demo === 'moata-model-viewer') {
      demoElement = <MoataModelViewerDemo className="self-start w-full" />;
    }
    if (demo === 'moata-time-slider') {
      demoElement = <MoataTimeSliderDemo className="self-start w-full" />;
    }
    if (demo === 'moata-tabs') {
      demoElement = <MoataTabsDemo className="self-start w-full" />;
    }
    if (demo === 'moata-map-pins') {
      demoElement = <MoataMapPinsDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-asset-select') {
      demoElement = <Moata3dAssetSelectDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-version-timeline') {
      demoElement = <Moata3dVersionTimelineDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-version-properties') {
      demoElement = <Moata3dVersionPropertiesDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-asset-ring') {
      demoElement = <Moata3dAssetRingDemo className="self-start w-full" />;
    }
    if (demo === 'moata-3d-map-sync') {
      demoElement = <Moata3dMapSyncDemo className="self-start w-full" />;
    }
    if (demo === 'moata-gis-toolbox') {
      demoElement = <MoataGisToolboxDemo className="self-start w-full" />;
    }
    if (demo === 'moata-gis-measure') {
      demoElement = <MoataGisMeasureDemo className="self-start w-full" />;
    }
    if (demo === 'moata-gis-editor') {
      demoElement = <MoataGisEditorDemo className="self-start w-full" />;
    }
    if (demo === 'moata-gis-spatial-query') {
      demoElement = <MoataGisSpatialQueryDemo className="self-start w-full" />;
    }
    if (demo === 'moata-gis-time-slider') {
      demoElement = <MoataGisTimeSliderDemo className="self-start w-full" />;
    }
    if (demo === 'safe-cycles-planner' || demo === 'safe-cycles-route' || demo === 'safe-cycles-nav') {
      demoElement = <SafeCyclesDemo className="self-start w-full" />;
    }
    if (demo === 'ual-archive-filter') {
      demoElement = <UalArchiveFilterDemo className="self-start w-full" />;
    }
    if (demo === 'ual-archive-force-graph') {
      demoElement = <UalArchiveForceGraphDemo className="self-start w-full" />;
    }
    if (demo === 'ual-archive-collaborations') {
      demoElement = <UalArchiveCollaborationsDemo className="self-start w-full" />;
    }
    if (demo === 'ual-archive-glossary') {
      demoElement = <UalArchiveGlossaryDemo className="self-start w-full" />;
    }
    if (demo === 'laiv-tag-view') {
      demoElement = <LondonAiVoicesTagViewDemo className="self-start w-full" />;
    }
    if (demo === 'laiv-network') {
      demoElement = <LondonAiVoicesNetworkDemo className="self-start w-full" />;
    }
    if (demo === 'laiv-contribution') {
      demoElement = <LondonAiVoicesContributionDemo className="self-start w-full" />;
    }
    if (demo === 'community-board') {
      demoElement = <CommunityBoardDemo className="self-start w-full" />;
    }
    if (demo === 'ai-deployment-game') {
      demoElement = <AIDeploymentGameDemo className="self-start w-full" />;
    }
    if (demo === 'image-labeling') {
      demoElement = <ImageLabelingDemo className="self-start w-full" />;
    }
    if (demo === 'dwd-generate') {
      demoElement = <DigitalWaterGenerateDemo className="self-start w-full" />;
    }
    if (demo === 'dwd-archive') {
      demoElement = <DigitalWaterArchiveDemo className="self-start w-full" />;
    }
    if (demo === 'dwd-simulation') {
      demoElement = <DigitalWaterSimulationDemo className="self-start w-full" />;
    }
    if (demo === 'dwd-types') {
      demoElement = <DigitalWaterTypesDemo className="self-start w-full" />;
    }
    if (demo === 'emma-toggle-layers') {
      demoElement = <EmmaToggleLayersDemo className="self-start w-full" />;
    }
    if (demo === 'emma-spatial-query') {
      demoElement = <EmmaSpatialQueryDemo className="self-start w-full" />;
    }
    if (demo === 'emma-action-card') {
      demoElement = <EmmaActionCardDemo className="self-start w-full" />;
    }
    if (demo === 'emma-permissions') {
      demoElement = <EmmaPermissionsDemo className="self-start w-full" />;
    }
    if (demo === 'emma-workspace') {
      demoElement = <EmmaWorkspaceDemo className="self-start w-full" />;
    }
    if (demo === 'emma-chat-threads') {
      demoElement = <EmmaChatThreadsDemo className="self-start w-full" />;
    }
    if (demo === 'emma-research-quote') {
      demoElement = <EmmaResearchQuoteDemo className="self-start w-full" />;
    }
    if (demo === 'emma-problem-framing') {
      demoElement = <EmmaProblemFramingDemo className="self-start w-full" />;
    }
    if (demo === 'emma-governance-insight') {
      demoElement = <EmmaGovernanceInsightDemo className="self-start w-full" />;
    }
    if (demo === 'bugclub-stack') {
      demoElement = <BugClubStackDiagram className="self-start w-full" />;
    }
    if (demo === 'bugdex-scan') {
      demoElement = <BugDexScanDemo className="self-start w-full" />;
    }
    if (demo === 'bugdex-scan-progress') {
      demoElement = <BugDexScanProgressPair className="self-start w-full" />;
    }
    if (demo === 'bugdex-card') {
      demoElement = <BugDexCardDemo className="self-start w-full" />;
    }
    if (demo === 'bugdex-card-leaderboard') {
      demoElement = <BugDexCardLeaderboardPair className="self-start w-full" />;
    }
    if (demo === 'bugdex-map-collection') {
      demoElement = <BugDexMapCollectionPair className="self-start w-full" />;
    }
    if (demo === 'bugdex-collection') {
      demoElement = <BugDexCollectionDemo className="self-start w-full" />;
    }
    if (demo === 'bugdex-leaderboard') {
      demoElement = <BugDexLeaderboardDemo className="self-start w-full" />;
    }
    if (demo === 'bugdex-profile') {
      demoElement = <BugDexProfileDemo className="self-start w-full" />;
    }
    const isGisToolsDemo = typeof demo === 'string' && demo.startsWith('moata-gis-');
    if (demoElement && isGisToolsDemo) {
      return demoElement;
    }
    if (demoElement) {
      return <ResponsiveDemoFrame>{demoElement}</ResponsiveDemoFrame>;
    }
    if (srcs?.length) {
      return (
        <div className="flex flex-wrap gap-8 w-full self-start">
          {srcs.map((item, imageIdx) => {
            const itemSrc = typeof item === 'string' ? item : item.src;
            const itemAlt = project.name + ' image ' + (idx + 1) + '-' + (imageIdx + 1);
            return (
              <div key={itemSrc} className="flex-1 min-w-[240px]">
                <OptimizedImage
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  src={itemSrc}
                  alt={itemAlt}
                  onClick={() => openModal({ src: itemSrc, alt: itemAlt })}
                  className="object-contain object-left custom-clickable self-start rounded-lg w-full"
                  style={{ maxHeight, display: 'block' }}
                />
              </div>
            );
          })}
        </div>
      );
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
        className={`object-contain object-left custom-clickable self-start rounded-lg ${typeof imgObj === 'object' ? imgObj.mediaClassName || '' : ''}`.trim()}
        style={{
          maxWidth: (typeof imgObj === 'object' && imgObj.mediaMaxWidth) || maxWidth,
          width: 'auto',
          maxHeight: (typeof imgObj === 'object' && imgObj.mediaMaxHeight) || maxHeight,
          display: 'block',
        }}
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
          <span>Client Site</span>
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
    const { heading, className = 'text-sm text-gray-600 leading-relaxed', sectionClassName = 'mb-10' } = opts;
    if (!body && !heading) return null;

    const renderBodyParts = (parts) =>
      parts.map((part, index) =>
        typeof part === 'string' ? (
          <React.Fragment key={index}>{part}</React.Fragment>
        ) : (
          <code key={index} className={INLINE_TERM_CLASS}>
            {part.text}
          </code>
        )
      );

    const paragraphs = [];
    let currentParagraph = [];

    if (body) {
      if (typeof body === 'string') {
        paragraphs.push([body]);
      } else {
        body.forEach((part) => {
          if (part?.break) {
            if (currentParagraph.length) paragraphs.push(currentParagraph);
            currentParagraph = [];
            return;
          }
          currentParagraph.push(part);
        });
        if (currentParagraph.length) paragraphs.push(currentParagraph);
      }
    }

    return (
      <div className={`case-study-section max-w-2xl w-full ${sectionClassName}`.trim()}>
        {heading && (
          <div className="mb-4 flex items-center gap-4">
            <h3 className="shrink-0 text-[15px] font-semibold text-gray-900">{heading}</h3>
            <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
          </div>
        )}
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={`${className}${index > 0 ? ' mt-4' : ''}`.trim()}>
            {typeof paragraph[0] === 'string' && paragraph.length === 1
              ? paragraph[0]
              : renderBodyParts(paragraph)}
          </p>
        ))}
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

  const renderCaseStudyBlocks = (blocks, { className = '', bodyClassName, project, openModal, skipLastMargin = true } = {}) => {
    if (!blocks?.length) return null;
    return blocks.map((block) => (
      <div
        key={block.id}
        className={`flex flex-col mb-16 ${skipLastMargin ? 'last:mb-0' : ''} items-start ${className}`.trim()}
        data-case-study-section={block.id}
        style={{ scrollMarginTop: '1.5rem' }}
      >
        {renderSectionBody(block.body, {
          heading: block.heading,
          className: bodyClassName,
          sectionClassName: '',
        })}
        {block.questions?.length > 0 && (
          <ReflectionQuestions
            questions={block.questions}
            className={bodyClassName ? 'reflection-questions--case-study' : ''}
          />
        )}
        {block.demo && project && (
          <div className="mt-10 w-full self-start">
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
    const priority = ['AI Exploration', 'Product Design', 'Creative Projects', 'Participatory Design', 'Design Writing', 'Older Work'];
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
    <div className="portfolio-app-root h-screen bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start px-8 py-6" ref={headerRef}>
        <h1 
          className="floating-letters-header text-xl font-normal text-gray-800 cursor-pointer custom-clickable"
          aria-label="Josh Green"
        >
          <span className="md:hidden">
            <FloatingLetters text="JG" />
          </span>
          <span className="hidden md:inline">
            <FloatingLetters text="Josh Green" /><span className="header-smiley" aria-hidden="true"> :)</span>
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
            className={`font-normal text-base transition-colors duration-300 ${
            isAboutHovered ? 'text-gray-400' : 'text-gray-800'
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
                        <div className="flex items-center justify-between gap-3 pr-3">
                          <div
                            className={`min-w-0 transition-all duration-300 ${
                              ''
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
                          {project.isNew ? (
                            <span
                              key={selectedProject?.id === project.id ? `active-new-${project.id}` : `inactive-new-${project.id}`}
                              className={`portfolio-sidebar__new-label flex-shrink-0 transition-opacity duration-300 ${
                                selectedProject?.id === project.id ? 'opacity-100 portfolio-sidebar__new-label--active' : 'opacity-0'
                              }`}
                            >
                              new
                            </span>
                          ) : (
                            <div
                              key={selectedProject?.id === project.id ? `active-${project.id}` : `inactive-${project.id}`}
                              className={`h-2 w-2 flex-shrink-0 rounded-full transition-opacity duration-300 ${
                                selectedProject?.id === project.id ? 'opacity-100 portfolio-active-dot' : 'opacity-0'
                              }`}
                              style={{ backgroundColor: '#81FF03' }}
                            />
                          )}
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
                            skipLastMargin: false,
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
                  skipLastMargin: false,
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

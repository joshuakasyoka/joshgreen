import EmmaToggleLayersDemo from '../EmmaToggleLayersDemo';
import EmmaSpatialQueryDemo from '../EmmaSpatialQueryDemo';
import EmmaActionCardDemo from '../EmmaActionCardDemo';
import EmmaPermissionsDemo from '../EmmaPermissionsDemo';
import EmmaWorkspaceDemo from '../EmmaWorkspaceDemo';
import EmmaChatThreadsDemo from '../EmmaChatThreadsDemo';
import EmmaResearchQuoteDemo from '../EmmaResearchQuoteDemo';
import EmmaProblemFramingDemo from '../EmmaProblemFramingDemo';
import EmmaGovernanceInsightDemo from '../EmmaGovernanceInsightDemo';
import EmmaInsightGraphDemo from '../EmmaInsightGraphDemo';
import EmmaArtefactPanelDemo, { EmmaArtefactOpenCloseDemo } from '../EmmaArtefactPanelDemo';
import EmmaArtefactSketchDemo from '../EmmaArtefactSketchDemo';
import EmmaArtefactTableDemo from '../EmmaArtefactTableDemo';
import { EmmaReflectionDiagram, EmmaSituationDiagram, EmmaTaskDiagram } from '../EmmaStakeholderDiagrams';
import { WIN_ROOM_DIAGRAMS } from '../WinRoomDiagrams';
import EmmaChatExchangeDemo from '../EmmaChatExchangeDemo';
import { MPR_DIAGRAMS } from '../MprDiagrams';
import { MPR_APP_DEMOS } from '../MprAppDemos';
import { ArtefactsLoopDiagram, ArtefactsUseCasesDiagram, EmmaLibraryDiagram, EmmaReflectionTwoSpeedsDiagram, MoataReflectionDiagram, MoataTaskDiagram } from '../CaseStudyDiagrams';

import MoataBlankScreenDemo from '../MoataBlankScreenDemo';
import MoataResearchQuoteDemo from '../MoataResearchQuoteDemo';
import MoataProblemWireframeDemo from '../MoataProblemWireframeDemo';
import MoataSpacesDemo from '../MoataSpacesDemo';
import MoataMapCommentDemo from '../MoataMapCommentDemo';
import MoataInsightGraphDemo from '../MoataInsightGraphDemo';
import MoataCommentsDemo from '../MoataCommentsDemo';
import MoataCommentsPanelDemo from '../MoataCommentsPanelDemo';
import MoataCommentsGridDemo from '../MoataCommentsGridDemo';
import MoataModelViewerDemo from '../MoataModelViewerDemo';
import MoataTabsDemo from '../MoataTabsDemo';
import MoataMapPinsDemo from '../MoataMapPinsDemo';

// Maps a case study's `demo` key to the component that renders it.
export const PRESENTATION_DEMOS = {
  'emma-toggle-layers': EmmaToggleLayersDemo,
  'emma-spatial-query': EmmaSpatialQueryDemo,
  'emma-action-card': EmmaActionCardDemo,
  'emma-permissions': EmmaPermissionsDemo,
  'emma-workspace': EmmaWorkspaceDemo,
  'emma-chat-threads': EmmaChatThreadsDemo,
  'emma-research-quote': EmmaResearchQuoteDemo,
  'emma-problem-framing': EmmaProblemFramingDemo,
  'emma-governance-insight': EmmaGovernanceInsightDemo,
  'emma-insight-graph': EmmaInsightGraphDemo,
  'emma-artefact-panel': EmmaArtefactPanelDemo,
  'emma-artefact-open-close': EmmaArtefactOpenCloseDemo,
  'emma-artefact-sketch': EmmaArtefactSketchDemo,
  'emma-artefact-table': EmmaArtefactTableDemo,
  'emma-situation-diagram': EmmaSituationDiagram,
  'emma-task-diagram': EmmaTaskDiagram,
  'emma-reflection-diagram': EmmaReflectionDiagram,
  'emma-two-speeds-diagram': EmmaReflectionTwoSpeedsDiagram,
  'emma-library-diagram': EmmaLibraryDiagram,
  'moata-task-diagram': MoataTaskDiagram,
  'artefacts-use-cases': ArtefactsUseCasesDiagram,
  'artefacts-loop': ArtefactsLoopDiagram,
  'moata-reflection-diagram': MoataReflectionDiagram,
  'moata-blank-screen': MoataBlankScreenDemo,
  'moata-research-quote': MoataResearchQuoteDemo,
  'moata-problem-wireframe': MoataProblemWireframeDemo,
  'moata-spaces': MoataSpacesDemo,
  'moata-map-comment': MoataMapCommentDemo,
  'moata-insight-graph': MoataInsightGraphDemo,
  'moata-comments': MoataCommentsDemo,
  'moata-comments-panel': MoataCommentsPanelDemo,
  'moata-comments-grid': MoataCommentsGridDemo,
  'moata-model-viewer': MoataModelViewerDemo,
  'moata-tabs': MoataTabsDemo,
  'moata-map-pins': MoataMapPinsDemo,
  ...WIN_ROOM_DIAGRAMS,
  'emma-chat-exchange': EmmaChatExchangeDemo,
  ...MPR_DIAGRAMS,
  ...MPR_APP_DEMOS,
};

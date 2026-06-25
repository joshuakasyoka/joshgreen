import React, { useRef } from 'react';
import {
  EmmaActionCard,
  EmmaAiBubble,
  EmmaChatShell,
  EmmaRail,
  EmmaThinking,
  EmmaUserBubble,
  GisDemoWindow,
  MapArea,
  Sym,
  useDemoAnimation,
} from './EmmaGisDemoShared';
import './EmmaGisDemoShared.css';

const TITLE = 'Spatial query — corridor intersect';

const USER_MSG =
  'I need to find all major roads within 25 km of the northern corridor substation siting area — can you run a spatial query?';

const AI_PROMPT =
  'I can open the Spatial Query tool so you can pick features on the map, set a buffer distance, and intersect them with a target layer. Would you like me to launch it now?';

const AI_CONFIRM =
  'The Spatial Query tool is open in the Tools panel with your input layer, buffer distance, and target layer pre-filled. Review the settings, then click Create Query to run the analysis.';

const SPATIAL_APIS = [
  'GET /api/v1/layers/world-heritage/features',
  'POST /api/v1/spatial/buffer — distance: 25000m',
  'POST /api/v1/spatial/intersects — target: /api/v1/layers/major-roads',
  'PUT /api/v1/tools/spatial-query/session — prefill applied',
];

const STEPS = [
  { phase: 'thread', input: '', toolOpen: false, card: false, apisExpanded: false, mapMode: 'default', target: null, duration: 2000 },
  { phase: 'thread', input: '', toolOpen: false, card: false, apisExpanded: false, mapMode: 'default', target: 'emma-input', duration: 1400 },
  { phase: 'typing', input: 'Yes', toolOpen: false, card: false, apisExpanded: false, mapMode: 'default', target: 'emma-send', duration: 1000 },
  { phase: 'thinking', input: '', toolOpen: false, card: false, apisExpanded: false, mapMode: 'default', target: null, duration: 1200 },
  { phase: 'confirm', input: '', toolOpen: true, card: true, apisExpanded: false, mapMode: 'spatial', target: 'spatial-panel', duration: 2800 },
  { phase: 'confirm', input: '', toolOpen: true, card: true, apisExpanded: true, mapMode: 'spatial', target: 'action-toggle', duration: 2400 },
  { phase: 'idle', input: '', toolOpen: true, card: true, apisExpanded: true, mapMode: 'spatial', target: null, duration: 1200 },
];

const SpatialQueryPanel = ({ open, innerRef }) => (
  <div
    ref={innerRef}
    className={[
      'emma-gis-demo__right-panel',
      open ? 'is-open' : '',
    ].filter(Boolean).join(' ')}
  >
    <div className="emma-gis-demo__right-panel-head">
      <span>Spatial Query</span>
      <Sym name="close" size={16} color="#666" />
    </div>
    <div className="emma-gis-demo__right-panel-body">
      <div className="emma-gis-demo__field">
        <label>Input Selection</label>
        <div className="emma-gis-demo__field-value is-highlight">Select from Layer</div>
      </div>
      <div className="emma-gis-demo__field">
        <label>Select a Layer</label>
        <div className="emma-gis-demo__field-value is-highlight">World Heritage Sites</div>
      </div>
      <div className="emma-gis-demo__field">
        <label>Buffer Distance</label>
        <div className="emma-gis-demo__field-value is-highlight">25 km</div>
      </div>
      <div className="emma-gis-demo__field">
        <label>Spatial Relation</label>
        <div className="emma-gis-demo__field-value">Intersects</div>
      </div>
      <div className="emma-gis-demo__field">
        <label>Target Layer</label>
        <div className="emma-gis-demo__field-value is-highlight">Major Roads</div>
      </div>
      <button type="button" className="emma-gis-demo__btn-primary">Create Query</button>
    </div>
  </div>
);

const EmmaSpatialQueryDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);

  const showReply = ['typing', 'thinking', 'confirm', 'idle'].includes(step.phase);
  const showThinking = step.phase === 'thinking';
  const showConfirm = ['confirm', 'idle'].includes(step.phase);

  return (
    <GisDemoWindow containerRef={containerRef} cursor={cursor} className={className} style={style}>
      <div className="emma-gis-demo__workspace">
        <EmmaRail />

        <EmmaChatShell
          title={TITLE}
          inputValue={step.input}
          inputActive={Boolean(step.input)}
          sendActive={step.phase === 'typing'}
          inputWrapRef={setTargetRef('emma-input')}
          sendRef={setTargetRef('emma-send')}
        >
          <EmmaUserBubble visible>{USER_MSG}</EmmaUserBubble>
          <EmmaAiBubble visible>{AI_PROMPT}</EmmaAiBubble>
          <EmmaUserBubble visible={showReply}>Yes</EmmaUserBubble>
          <EmmaThinking visible={showThinking} />
          <EmmaAiBubble visible={showConfirm}>{AI_CONFIRM}</EmmaAiBubble>
          <EmmaActionCard
            visible={showConfirm && step.card}
            title="Spatial Query tool opened"
            body="World Heritage Sites, 25 km buffer, Major Roads target"
            apis={SPATIAL_APIS}
            expanded={step.apisExpanded}
            toggleRef={setTargetRef('action-toggle')}
          />
        </EmmaChatShell>

        <MapArea pan={step.toolOpen ? 1 : 0} mapMode={step.mapMode}>
          <SpatialQueryPanel
            open={step.toolOpen}
            innerRef={setTargetRef('spatial-panel')}
          />
        </MapArea>
      </div>
    </GisDemoWindow>
  );
};

export default EmmaSpatialQueryDemo;

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
  useDemoAnimation,
} from './EmmaGisDemoShared';
import './EmmaGisDemoShared.css';

const TITLE = 'Ecologist working bundle';

const AI_PROMPT =
  'I can open the Add Layer modal on the Bundles tab with the Ecologist Working Bundle pre-selected — 5 layers covering Ecology, Constraints, Natural England. Review the bundle, then click Add Bundle to add all layers to your tree. Would you like me to open it now?';

const AI_CONFIRM =
  "I've prepared the Ecologist Working Bundle with 5 layers. Click the card below to open Add Layer → Bundles, review the included layers, choose a tree location, then click Add Bundle to add them to your project.";

const BUNDLE_APIS = [
  'GET /api/v1/bundles/ecologist-working',
  'GET /api/v1/bundles/ecologist-working/layers',
  'POST /api/v1/bundles/resolve — layers: 5',
  'PUT /api/v1/tools/add-layer/session — bundle: Ecologist Working Bundle',
];

const STEPS = [
  { phase: 'prompt', input: '', card: false, mapMode: 'default', target: null, duration: 2200 },
  { phase: 'prompt', input: '', card: false, mapMode: 'default', target: 'emma-input', duration: 1400 },
  { phase: 'typing', input: 'Yes, open it', card: false, mapMode: 'default', target: 'emma-send', duration: 1000 },
  { phase: 'thinking', input: '', card: false, mapMode: 'default', target: null, duration: 1200 },
  { phase: 'confirm', input: '', card: false, mapMode: 'bundle', target: null, duration: 1400 },
  { phase: 'confirm', input: '', card: true, mapMode: 'bundle', target: 'action-card', duration: 2800 },
  { phase: 'idle', input: '', card: true, mapMode: 'bundle', target: null, duration: 1200 },
];

const EmmaBundleDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);

  const showUser = step.phase !== 'prompt';
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
          <EmmaAiBubble visible>{AI_PROMPT}</EmmaAiBubble>
          <EmmaUserBubble visible={showUser}>Yes, open it</EmmaUserBubble>
          <EmmaThinking visible={showThinking} />
          <EmmaAiBubble visible={showConfirm}>{AI_CONFIRM}</EmmaAiBubble>
          <span
            ref={setTargetRef('action-card')}
            className={`emma-gis-demo__msg ${showConfirm && step.card ? 'is-visible' : ''}`.trim()}
          >
            <EmmaActionCard
              visible={showConfirm && step.card}
              title="Ecologist Working Bundle ready"
              body="5 layers · Ecology, Constraints"
              apis={BUNDLE_APIS}
            />
          </span>
        </EmmaChatShell>

        <MapArea pan={step.card ? 1 : 0} mapMode={step.mapMode} />
      </div>
    </GisDemoWindow>
  );
};

export default EmmaBundleDemo;

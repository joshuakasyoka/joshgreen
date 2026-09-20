import React, { useRef } from 'react';
import { useDemoAnimation } from './EmmaGisDemoShared';
import {
  AiBlock,
  ArtefactMap,
  ArtefactPanel,
  ArtefactWindow,
  BASE_LAYERS,
  ChatColumn,
  Composer,
  ContextChip,
  LayerList,
  MapCard,
  MapToolbar,
  PanelMap,
  ResultTable,
  UserMsg,
} from './EmmaArtefactsDemoShared';

// Sketch an area, ask what's in it, and the answer comes back as a table
// rather than prose. Every cell is editable - text, Yes/No flags, the
// vegetation stratum.
const PROMPT = "What's in this area?";
const CHIP = 'Area sketch · 8.6 ha';

const ROWS = [
  { id: 'oak', feature: 'Oak woodland', stratum: 0, protected: true, area: '2.4' },
  { id: 'hedge', feature: 'Hedgerow', stratum: 2, protected: true, area: '0.6' },
  { id: 'scrub', feature: 'Scrub', stratum: 1, protected: false, area: '1.1' },
  { id: 'grass', feature: 'Grassland', stratum: 3, protected: false, area: '4.5' },
];

const edit = (changes) => ROWS.map((row) => ({ ...row, ...(changes[row.id] || {}) }));

const BASE = { tool: 'select', sketch: 0, chip: false, input: '', sendActive: false, sent: false, thinking: false, table: false, rows: ROWS };

const buildSteps = () => {
  const typing = PROMPT.split('').map((_, i) => ({
    ...BASE,
    tool: 'draw',
    sketch: 1,
    chip: true,
    input: PROMPT.slice(0, i + 1),
    target: 'input',
    duration: i === 0 ? 260 : 50,
  }));
  typing[typing.length - 1] = { ...typing[typing.length - 1], sendActive: true, target: 'send', duration: 700 };

  const answered = { ...BASE, sketch: 1, sent: true, table: true };
  const flagged = edit({ scrub: { protected: true } });
  const restratified = edit({ scrub: { protected: true, stratum: 2 } });
  const renamed = edit({ scrub: { protected: true, stratum: 2, feature: 'Gorse scrub' } });

  return [
    { ...BASE, target: null, duration: 1000 },
    { ...BASE, target: 'tool-draw', duration: 900 },
    { ...BASE, tool: 'draw', target: 'tool-draw', duration: 500 },
    { ...BASE, tool: 'draw', sketch: 1, target: null, duration: 1500 },
    { ...BASE, tool: 'draw', sketch: 1, chip: true, target: 'input', duration: 900 },
    ...typing,
    { ...BASE, sketch: 1, sent: true, thinking: true, target: null, duration: 1100 },
    { ...answered, target: null, duration: 1300 },
    { ...answered, target: 'flag-scrub', duration: 900 },
    { ...answered, rows: flagged, bounce: 'scrub', target: 'flag-scrub', duration: 900 },
    { ...answered, rows: flagged, target: 'layer-scrub', duration: 800 },
    { ...answered, rows: restratified, target: 'layer-scrub', duration: 900 },
    { ...answered, rows: restratified, target: 'feature-scrub', duration: 800 },
    { ...answered, rows: renamed, flash: 'scrub', target: 'feature-scrub', duration: 1000 },
    { ...answered, rows: renamed, target: null, duration: 2600 },
  ];
};

const EmmaArtefactTableDemo = ({ className = '' }) => {
  const containerRef = useRef(null);
  const steps = useRef(buildSteps()).current;
  const { step, cursor, setTargetRef } = useDemoAnimation(steps, containerRef);

  const panel = (
    <ArtefactPanel open bitsIn setTargetRef={setTargetRef}>
      <PanelMap toolbar={<MapToolbar active={step.tool} setTargetRef={setTargetRef} />}>
        <ArtefactMap sketch={step.sketch} />
      </PanelMap>
      <LayerList layers={BASE_LAYERS} />
    </ArtefactPanel>
  );

  return (
    <ArtefactWindow containerRef={containerRef} cursor={cursor} className={className} panel={panel}>
      <ChatColumn
        composer={
          <Composer
            value={step.input}
            sendActive={step.sendActive}
            inputRef={setTargetRef('input')}
            sendRef={setTargetRef('send')}
            chips={step.chip && !step.sent ? <ContextChip icon="draw" label={CHIP} visible /> : null}
          />
        }
      >
        <AiBlock visible={!step.sent}>
          <MapCard compact />
        </AiBlock>
        <UserMsg visible={step.sent} chip={CHIP}>
          {PROMPT}
        </UserMsg>
        <AiBlock visible={step.sent} state={step.thinking ? 'thinking' : 'idle'}>
          {step.table && (
            <ResultTable
              rows={step.rows}
              setTargetRef={setTargetRef}
              flashCell={step.flash}
              bounceCell={step.bounce}
            />
          )}
        </AiBlock>
      </ChatColumn>
    </ArtefactWindow>
  );
};

export default EmmaArtefactTableDemo;

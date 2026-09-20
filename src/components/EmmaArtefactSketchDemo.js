import React, { useRef } from 'react';
import { useDemoAnimation } from './EmmaGisDemoShared';
import {
  AiBlock,
  ArtefactMap,
  ArtefactPanel,
  ArtefactWindow,
  BASE_LAYERS,
  ChatColumn,
  CommandRun,
  Composer,
  ContextChip,
  LayerList,
  MapCard,
  MapTarget,
  MapToolbar,
  PanelMap,
  UserMsg,
} from './EmmaArtefactsDemoShared';

// Drop a pin on the map and it arrives in the composer as a context chip.
// An instruction against it ("turn this into a borehole") comes back as a
// run of commands, each with a status badge, and the map updates in place.
const PIN = { x: 164, y: 132 };
const PROMPT = 'Turn this into a borehole';
const CHIP = 'Pin · 53.481, −2.244';
const COMMANDS = [
  'create_feature(type="borehole")',
  'snap_to(survey_grid, 1m)',
  'attach_log("BH-07")',
  'add_to_layer("Survey points")',
];

const BASE = { tool: 'select', pin: false, chip: false, input: '', sendActive: false, sent: false, thinking: false, run: -1, borehole: false };

const buildSteps = () => {
  const typing = PROMPT.split('').map((_, i) => ({
    ...BASE,
    tool: 'point',
    pin: true,
    chip: true,
    input: PROMPT.slice(0, i + 1),
    target: 'input',
    duration: i === 0 ? 260 : 45,
  }));
  typing[typing.length - 1] = { ...typing[typing.length - 1], sendActive: true, target: 'send', duration: 700 };
  const sent = { ...BASE, pin: true, sent: true };

  return [
    { ...BASE, target: null, duration: 1200 },
    { ...BASE, target: 'tool-point', duration: 900 },
    { ...BASE, tool: 'point', target: 'tool-point', duration: 400 },
    { ...BASE, tool: 'point', target: 'map-pin', duration: 900 },
    { ...BASE, tool: 'point', pin: true, target: 'map-pin', duration: 500 },
    { ...BASE, tool: 'point', pin: true, chip: true, target: 'map-pin', duration: 900 },
    { ...BASE, tool: 'point', pin: true, chip: true, target: 'input', duration: 700 },
    ...typing,
    { ...sent, thinking: true, target: null, duration: 1100 },
    { ...sent, run: 0, target: null, duration: 900 },
    { ...sent, run: 1, target: null, duration: 800 },
    { ...sent, run: 2, target: null, duration: 800 },
    { ...sent, run: 3, target: null, duration: 800 },
    { ...sent, run: 4, borehole: true, target: null, duration: 3000 },
  ];
};

const EmmaArtefactSketchDemo = ({ className = '' }) => {
  const containerRef = useRef(null);
  const steps = useRef(buildSteps()).current;
  const { step, cursor, setTargetRef } = useDemoAnimation(steps, containerRef);

  const panel = (
    <ArtefactPanel open bitsIn setTargetRef={setTargetRef}>
      <PanelMap toolbar={<MapToolbar active={step.tool} setTargetRef={setTargetRef} />}>
        <ArtefactMap pin={step.pin ? PIN : null} borehole={step.borehole} />
        <MapTarget x={PIN.x} y={PIN.y} targetRef={setTargetRef('map-pin')} />
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
            chips={step.chip && !step.sent ? <ContextChip label={CHIP} visible /> : null}
          />
        }
      >
        <AiBlock>
          <MapCard compact />
        </AiBlock>
        <UserMsg visible={step.sent} chip="Pin · 53.481, −2.244">
          {PROMPT}
        </UserMsg>
        <AiBlock visible={step.sent} state={step.thinking ? 'thinking' : step.run >= 0 && step.run < 4 ? 'streaming' : 'idle'}>
          {step.run >= 0 && <CommandRun commands={COMMANDS} progress={step.run} />}
          {step.borehole && <p>Borehole BH-07 added to Survey points.</p>}
        </AiBlock>
      </ChatColumn>
    </ArtefactWindow>
  );
};

export default EmmaArtefactSketchDemo;

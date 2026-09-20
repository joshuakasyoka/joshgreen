import React, { useMemo, useRef } from 'react';
import { useDemoAnimation } from './EmmaGisDemoShared';
import {
  AiBlock,
  ArtefactMap,
  ArtefactPanel,
  ArtefactWindow,
  BASE_LAYERS,
  ChatColumn,
  Composer,
  FileCard,
  LayerList,
  MapCard,
  MapToolbar,
  PanelMap,
  UserMsg,
  Welcome,
} from './EmmaArtefactsDemoShared';

// A reply produces a map artefact. Clicking the card collapses it to its
// title row and opens the workspace panel, whose contents stagger in from
// the right; the layer list drives the map and the map exports.
const BASE = { panelOpen: false, compact: false, bitsIn: false, coverage: false, exportOpen: false, highlight: false };

const STEPS = [
  { ...BASE, target: null, duration: 1600 },
  { ...BASE, target: 'card', duration: 900 },
  { ...BASE, highlight: true, target: 'card', duration: 350 },
  { ...BASE, panelOpen: true, compact: true, target: null, duration: 250 },
  { ...BASE, panelOpen: true, compact: true, bitsIn: true, target: null, duration: 1300 },
  { ...BASE, panelOpen: true, compact: true, bitsIn: true, target: 'layer-coverage', duration: 900 },
  { ...BASE, panelOpen: true, compact: true, bitsIn: true, coverage: true, target: 'layer-coverage', duration: 1500 },
  { ...BASE, panelOpen: true, compact: true, bitsIn: true, coverage: true, target: 'download', duration: 900 },
  { ...BASE, panelOpen: true, compact: true, bitsIn: true, coverage: true, exportOpen: true, target: 'download', duration: 1900 },
  { ...BASE, panelOpen: true, compact: true, bitsIn: true, coverage: true, target: 'close', duration: 900 },
  { ...BASE, target: null, duration: 1400 },
];

// Short overview loop: the welcome and prompt cards arrive, the prompts fold
// away once a survey file is attached, the ask returns a map artefact, and
// the artefact opens and closes again.
const PROMPT = 'Show this survey on a basemap';
const FILE = { name: 'corridor_survey.geojson', type: 'GeoJSON' };

const buildOverviewSteps = () => {
  const empty = { ...BASE, welcome: true, hover: null, wiggle: null, file: false, input: '', sendActive: false, sent: false, thinking: false, replied: false };
  const typing = PROMPT.split('').map((_, i) => ({
    ...empty,
    file: true,
    input: PROMPT.slice(0, i + 1),
    target: 'input',
    duration: i === 0 ? 240 : 40,
  }));
  typing[typing.length - 1] = { ...typing[typing.length - 1], sendActive: true, target: 'send', duration: 650 };
  const replied = { ...empty, welcome: false, sent: true, replied: true };

  return [
    { ...empty, welcome: false, target: null, duration: 500 },
    { ...empty, target: null, duration: 1700 },
    { ...empty, hover: 'basemap', target: 'prompt-basemap', duration: 800 },
    { ...empty, hover: 'basemap', wiggle: 'basemap', target: 'prompt-basemap', duration: 1000 },
    { ...empty, target: 'plus', duration: 900 },
    { ...empty, file: true, target: 'plus', duration: 1200 },
    ...typing,
    { ...empty, welcome: false, sent: true, thinking: true, target: null, duration: 1100 },
    { ...replied, target: null, duration: 1300 },
    { ...replied, target: 'card', duration: 900 },
    { ...replied, highlight: true, target: 'card', duration: 350 },
    { ...replied, panelOpen: true, compact: true, target: null, duration: 250 },
    { ...replied, panelOpen: true, compact: true, bitsIn: true, target: null, duration: 2600 },
    { ...replied, panelOpen: true, compact: true, bitsIn: true, target: 'close', duration: 900 },
    { ...replied, target: null, duration: 1800 },
  ];
};

const OVERVIEW_STEPS = buildOverviewSteps();

const EmmaArtefactPanelDemo = ({ className = '', overview = false }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(overview ? OVERVIEW_STEPS : STEPS, containerRef);
  const layers = useMemo(
    () => BASE_LAYERS.map((layer) => (layer.key === 'coverage' ? { ...layer, checked: step.coverage } : layer)),
    [step.coverage]
  );

  const panel = (
    <ArtefactPanel open={step.panelOpen} bitsIn={step.bitsIn} exportOpen={step.exportOpen} setTargetRef={setTargetRef}>
      <PanelMap toolbar={<MapToolbar />}>
        <ArtefactMap coverage={step.coverage} />
      </PanelMap>
      <LayerList layers={layers} setTargetRef={setTargetRef} />
    </ArtefactPanel>
  );

  if (overview) {
    return (
      <ArtefactWindow containerRef={containerRef} cursor={cursor} className={className} panel={panel}>
        <ChatColumn
          composer={
            <Composer
              value={step.input}
              sendActive={step.sendActive}
              plusRef={setTargetRef('plus')}
              inputRef={setTargetRef('input')}
              sendRef={setTargetRef('send')}
              chips={step.file && !step.sent ? <FileCard {...FILE} /> : null}
            />
          }
        >
          <Welcome
            visible={step.welcome}
            folded={step.file || Boolean(step.input)}
            hover={step.hover}
            wiggle={step.wiggle}
            setTargetRef={setTargetRef}
          />
          <UserMsg visible={step.sent} chip={FILE.name}>
            {PROMPT}
          </UserMsg>
          <AiBlock visible={step.sent} state={step.thinking ? 'thinking' : 'idle'}>
            {step.replied && (
              <>
                <p>I've plotted the corridor survey on the Manchester basemap - three survey points over Positron tiles.</p>
                <MapCard cardRef={setTargetRef('card')} compact={step.compact} highlight={step.highlight} />
                <p>What are you working towards - checking coverage for a bid, or finding gaps in the survey?</p>
              </>
            )}
          </AiBlock>
        </ChatColumn>
      </ArtefactWindow>
    );
  }

  return (
    <ArtefactWindow containerRef={containerRef} cursor={cursor} className={className} panel={panel}>
      <ChatColumn composer={<Composer />}>
        <UserMsg>Explore a basemap - ask about layers, coverage and projections</UserMsg>
        <AiBlock>
          <p>Here's the corridor basemap - Positron tiles at zoom 12, with place labels and survey points switched on. Open it to check coverage or export the layers.</p>
          <MapCard cardRef={setTargetRef('card')} compact={step.compact} highlight={step.highlight} />
        </AiBlock>
      </ChatColumn>
    </ArtefactWindow>
  );
};

export const EmmaArtefactOpenCloseDemo = (props) => <EmmaArtefactPanelDemo {...props} overview />;

export default EmmaArtefactPanelDemo;

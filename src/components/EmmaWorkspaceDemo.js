import React, { useMemo, useRef } from 'react';
import {
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

const TITLE = 'Substation siting — northern corridor';

const USER_MSG =
  'Assessing a proposed substation site in the northern corridor. Need to understand road access for heavy plant and any rail proximity for the EMF exclusion zone.';

const AI_RESPONSE =
  'I can calculate HGV access routes on the classified road network and measure standoff distances from operational rail lines — flagging any crossings that would need Network Rail consultation. Do you want me to bring the transport and rail layers forward?';

const buildSteps = () => {
  const chars = USER_MSG.split('');
  const typing = chars.map((_, index) => ({
    phase: 'typing',
    panelOpen: true,
    input: chars.slice(0, index + 1).join(''),
    userSent: false,
    thinking: false,
    aiReply: false,
    target: index === chars.length - 1 ? 'emma-send' : 'emma-input',
    duration: index === 0 ? 220 : 28,
  }));

  return [
    { phase: 'map', panelOpen: false, input: '', userSent: false, thinking: false, aiReply: false, target: 'emma-rail', duration: 2000 },
    { phase: 'open', panelOpen: true, input: '', userSent: false, thinking: false, aiReply: false, target: 'emma-input', duration: 1200 },
    ...typing,
    { phase: 'send', panelOpen: true, input: '', userSent: true, thinking: false, aiReply: false, target: null, duration: 600 },
    { phase: 'think', panelOpen: true, input: '', userSent: true, thinking: true, aiReply: false, target: null, duration: 1300 },
    { phase: 'reply', panelOpen: true, input: '', userSent: true, thinking: false, aiReply: true, target: null, duration: 3200 },
    { phase: 'idle', panelOpen: true, input: '', userSent: true, thinking: false, aiReply: true, target: null, duration: 1200 },
  ];
};

const STEPS = buildSteps();

const EmmaWorkspaceDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);

  const title = useMemo(() => (step.panelOpen ? TITLE : ''), [step.panelOpen]);

  return (
    <GisDemoWindow containerRef={containerRef} cursor={cursor} className={className} style={style}>
      <div className="emma-gis-demo__workspace">
        <EmmaRail railBtnRef={setTargetRef('emma-rail')} />

        <EmmaChatShell
          title={title}
          open={step.panelOpen}
          inputValue={step.input}
          inputActive={step.phase === 'typing'}
          sendActive={step.phase === 'typing' && step.target === 'emma-send'}
          inputWrapRef={setTargetRef('emma-input')}
          sendRef={setTargetRef('emma-send')}
        >
          <EmmaUserBubble visible={step.userSent}>{USER_MSG}</EmmaUserBubble>
          <EmmaThinking visible={step.thinking} />
          <EmmaAiBubble visible={step.aiReply}>{AI_RESPONSE}</EmmaAiBubble>
        </EmmaChatShell>

        <MapArea pan={step.panelOpen ? 1 : 0} mapMode="default" />
      </div>
    </GisDemoWindow>
  );
};

export default EmmaWorkspaceDemo;

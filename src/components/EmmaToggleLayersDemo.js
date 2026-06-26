import React, { useRef } from 'react';
import {
  EmmaAiBubble,
  EmmaChatShell,
  EmmaLayerCard,
  EmmaPermissionCard,
  EmmaRail,
  EmmaThinking,
  GisDemoWindow,
  MapArea,
  useDemoAnimation,
} from './EmmaGisDemoShared';
import './EmmaGisDemoShared.css';

const TITLE = 'Substation siting — northern corridor';

const AI_PROMPT =
  'I can calculate HGV access routes on the classified road network and measure standoff distances from operational rail lines — flagging any crossings that would need Network Rail consultation. Do you want me to bring the transport and rail layers forward?';

const PERMISSION_PROMPT =
  'I can add Transport Network to your layer tree. Review the action below and choose Allow to continue.';

const AI_CONFIRM =
  "I've added Transport Network layers including the ESRI World Transportation overlay and OpenRailwayMap rail network. They're now active on the map.";

const PERMISSION = {
  title: 'Add Transport Network to layer tree',
  command: 'addLayerGroup("Transport Network")',
};

const STEPS = [
  { phase: 'prompt', permission: null, layers: false, pan: 0, mapMode: 'default', target: null, duration: 2200 },
  { phase: 'permission', permission: 'pending', layers: false, pan: 0, mapMode: 'default', target: 'permission-allow', duration: 1600 },
  { phase: 'permission', permission: 'pending', layers: false, pan: 0, mapMode: 'default', target: 'permission-allow', duration: 1200 },
  { phase: 'grant', permission: 'approved', layers: false, pan: 0, mapMode: 'default', target: null, duration: 900 },
  { phase: 'thinking', permission: 'approved', layers: false, pan: 0, mapMode: 'default', target: null, duration: 1200 },
  { phase: 'confirm', permission: 'approved', layers: false, pan: 0, mapMode: 'default', target: null, duration: 1600 },
  { phase: 'confirm', permission: 'approved', layers: true, pan: 1, mapMode: 'transport', target: 'layer-card', duration: 2800 },
  { phase: 'idle', permission: 'approved', layers: true, pan: 1, mapMode: 'transport', target: null, duration: 1200 },
];

const EmmaToggleLayersDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);

  const showPermission = Boolean(step.permission);
  const showThinking = step.phase === 'thinking';
  const showConfirm = ['confirm', 'idle'].includes(step.phase);
  const permissionHover = step.phase === 'permission' && step.target === 'permission-allow';
  const permissionSelected = step.phase === 'grant';

  return (
    <GisDemoWindow containerRef={containerRef} cursor={cursor} className={className} style={style}>
      <div className="emma-gis-demo__workspace">
        <EmmaRail />

        <EmmaChatShell title={TITLE}>
          <EmmaAiBubble visible={step.phase === 'prompt'}>{AI_PROMPT}</EmmaAiBubble>
          <EmmaAiBubble visible={showPermission}>{PERMISSION_PROMPT}</EmmaAiBubble>
          <EmmaPermissionCard
            visible={showPermission}
            title={PERMISSION.title}
            command={PERMISSION.command}
            status={step.permission || 'pending'}
            allowHover={permissionHover}
            allowSelected={permissionSelected}
            allowRef={setTargetRef('permission-allow')}
          />
          <EmmaThinking visible={showThinking} />
          <EmmaAiBubble visible={showConfirm}>{AI_CONFIRM}</EmmaAiBubble>
          <span
            ref={setTargetRef('layer-card')}
            className={`emma-gis-demo__msg ${showConfirm ? 'is-visible' : ''}`.trim()}
          >
            <EmmaLayerCard
              visible={showConfirm}
              title="Transport Network added to layer tree"
              body='2 layers added under "Transport Network".'
            />
          </span>
        </EmmaChatShell>

        <MapArea pan={step.pan} mapMode={step.mapMode} />
      </div>
    </GisDemoWindow>
  );
};

export default EmmaToggleLayersDemo;

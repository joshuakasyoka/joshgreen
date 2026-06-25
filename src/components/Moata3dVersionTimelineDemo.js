import React from 'react';
import {
  DemoStage,
  useMoata3dDemo,
  ViewerBlock,
} from './moata3dPanelShared';

const STEPS = [
  { target: 'slider', slider: 100, visible: ['v1', 'v2', 'v3'], duration: 1400 },
  { target: 'slider', slider: 52, visible: ['v1', 'v2'], scrubbing: true, duration: 2200 },
  { target: 'slider', slider: 18, visible: ['v1'], scrubbing: true, duration: 2000 },
  { target: 'slider', slider: 78, visible: ['v1', 'v2', 'v3'], scrubbing: true, duration: 2200 },
  { target: 'slider', slider: 100, visible: ['v1', 'v2', 'v3'], duration: 1800 },
  { phase: 'idle', slider: 100, visible: ['v1', 'v2', 'v3'], duration: 1200 },
];

const Moata3dVersionTimelineDemo = ({ className = '', style }) => {
  const { containerRef, setTargetRef, step, cursor } = useMoata3dDemo(STEPS);

  return (
    <DemoStage
      className={`moata-3d-panel--timeline-rich ${className}`.trim()}
      style={style}
      containerRef={containerRef}
      cursor={cursor}
    >
      <ViewerBlock
        richTimeline
        visible={step.visible || ['v1', 'v2', 'v3']}
        slider={step.slider ?? 100}
        scrubbing={Boolean(step.scrubbing)}
        setTargetRef={setTargetRef}
      />
    </DemoStage>
  );
};

export default Moata3dVersionTimelineDemo;

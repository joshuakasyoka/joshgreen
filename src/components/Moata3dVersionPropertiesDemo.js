import React from 'react';
import {
  DemoStage,
  useMoata3dDemo,
  VersionPropertiesBlock,
} from './moata3dPanelShared';

const STEPS = [
  { target: 'version-select', visible: ['v1', 'v2', 'v3'], versionOpen: false, duration: 1600 },
  { target: 'version-select', visible: ['v1', 'v2', 'v3'], versionOpen: true, duration: 1600 },
  { target: 'version-select', visible: ['v1', 'v2', 'v3'], versionOpen: true, hoveredVersion: 'v2', duration: 1400 },
  { target: 'version-select', visible: ['v2'], versionOpen: false, duration: 1800 },
  { target: 'props-table', visible: ['v2'], duration: 2000 },
  { target: 'version-select', visible: ['v2'], versionOpen: true, duration: 1400 },
  { target: 'version-select', visible: ['v1', 'v2'], versionOpen: true, hoveredVersion: 'v1', duration: 1800 },
  { target: 'props-table', visible: ['v1', 'v2'], duration: 2200 },
  { phase: 'idle', visible: ['v1', 'v2'], duration: 1200 },
];

const Moata3dVersionPropertiesDemo = ({ className = '', style }) => {
  const { containerRef, setTargetRef, step, cursor } = useMoata3dDemo(STEPS);

  return (
    <DemoStage className={className} style={style} containerRef={containerRef} cursor={cursor}>
      <VersionPropertiesBlock
        visible={step.visible || ['v1', 'v2', 'v3']}
        versionOpen={Boolean(step.versionOpen)}
        hoveredVersion={step.hoveredVersion}
        setTargetRef={setTargetRef}
      />
    </DemoStage>
  );
};

export default Moata3dVersionPropertiesDemo;

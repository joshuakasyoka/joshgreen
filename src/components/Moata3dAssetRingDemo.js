import React from 'react';
import {
  DemoStage,
  MUTED_ICON,
  Sym,
  ViewerBlock,
  useMoata3dDemo,
} from './moata3dPanelShared';
import './Moata3dAssetRingDemo.css';

const TARGET_ASSET = 'v2';
const TARGET_NAME = 'RC-COL-002';

const STEPS = [
  { panel: 'layer', target: 'viewport', rotate: true, visible: ['v1', 'v2', 'v3'], duration: 1800 },
  { panel: 'layer', target: 'column-v2', hoverColumn: 'v2', visible: ['v1', 'v2', 'v3'], duration: 1800 },
  { panel: 'layer', target: 'ring-v2', hoverColumn: 'v2', activeRing: 'v2', visible: ['v1', 'v2', 'v3'], duration: 2000 },
  {
    panel: 'asset',
    target: 'viewport',
    rotate: true,
    hoverColumn: 'v2',
    activeRing: 'v2',
    focusId: TARGET_ASSET,
    visible: [TARGET_ASSET],
    duration: 2200,
  },
  {
    phase: 'idle',
    panel: 'asset',
    hoverColumn: 'v2',
    activeRing: 'v2',
    focusId: TARGET_ASSET,
    visible: [TARGET_ASSET],
    duration: 1200,
  },
];

const Moata3dAssetRingDemo = ({ className = '', style }) => {
  const { containerRef, setTargetRef, step, cursor } = useMoata3dDemo(STEPS);
  const isAsset = step.panel === 'asset';
  const visible = step.visible || ['v1', 'v2', 'v3'];

  return (
    <DemoStage
      className={`moata-3d-panel--asset-ring ${className}`.trim()}
      style={style}
      containerRef={containerRef}
      cursor={cursor}
    >
      <div className="moata-3d-asset-ring-demo__panel">
        <div className="moata-3d-asset-ring-demo__tabs">
          <span className="moata-3d-asset-ring-demo__tab-collapse">
            <Sym name="keyboard_double_arrow_right" size={16} color="#6b7280" />
          </span>
          <span className={`moata-3d-asset-ring-demo__tab ${!isAsset ? 'is-active' : ''}`.trim()}>
            <Sym name="layers" size={16} color={!isAsset ? '#111827' : '#6b7280'} />
            Layers
          </span>
          {isAsset && (
            <span className="moata-3d-asset-ring-demo__tab is-active">
              <Sym name="home" size={16} color="#111827" />
              Assets
            </span>
          )}
          <span className="moata-3d-asset-ring-demo__tab-add">
            <Sym name="add" size={15} color="#6b7280" />
          </span>
        </div>

        <div className="moata-3d-asset-ring-demo__header">
          <h4>{isAsset ? TARGET_NAME : 'Circular RC Column'}</h4>
          <p>{isAsset ? 'Circular RC Column' : 'Primary Structure Group'}</p>
          <div className="moata-3d-asset-ring-demo__toolbar">
            <span className="moata-3d-asset-ring-demo__icon-btn"><Sym name="visibility" size={18} color={MUTED_ICON} /></span>
            <span className="moata-3d-asset-ring-demo__icon-btn"><Sym name="table_chart" size={18} color={MUTED_ICON} /></span>
            <span className="moata-3d-asset-ring-demo__icon-btn"><Sym name="my_location" size={18} color={MUTED_ICON} /></span>
            {!isAsset && (
              <span className="moata-3d-asset-ring-demo__icon-btn"><Sym name="content_copy" size={18} color={MUTED_ICON} /></span>
            )}
            <span className="moata-3d-asset-ring-demo__icon-btn is-active">
              <Sym name="view_in_ar" size={18} />
            </span>
          </div>
        </div>

        <div className="moata-3d-asset-ring-demo__viewer">
          <ViewerBlock
            visible={visible}
            hoverColumn={step.hoverColumn}
            activeRing={step.activeRing}
            focusId={step.focusId}
            viewMode="combined"
            rotating={Boolean(step.rotate)}
            hideTimeline
            setTargetRef={setTargetRef}
          />
        </div>
      </div>
    </DemoStage>
  );
};

export default Moata3dAssetRingDemo;

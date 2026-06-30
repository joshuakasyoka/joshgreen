import React, { useRef } from 'react';
import {
  GisToolsHeader,
  GisToolsMapArea,
  GisToolsWindow,
  ToolsPanel,
  useDemoAnimation,
} from './MoataGisToolsShared';

// `maxSize` is the halo's diameter at a 100km buffer; the rendered size
// scales between `core` (0km) and `maxSize` as the slider moves, so the
// buffers visibly grow and shrink in sync with the distance value.
const SHAPES = [
  { left: '14%', top: '34%', core: 16, maxSize: 96 },
  { left: '40%', top: '40%', core: 12, maxSize: 78 },
  { left: '63%', top: '32%', core: 18, maxSize: 104 },
  { left: '46%', top: '62%', core: 22, maxSize: 128 },
];

const STEPS = [
  { panelOpen: false, buffersVisible: false, distancePct: 0, distanceLabel: 0, target: null, duration: 1200 },
  { panelOpen: true, buffersVisible: true, distancePct: 0, distanceLabel: 0, target: null, duration: 900 },
  { panelOpen: true, buffersVisible: true, distancePct: 21, distanceLabel: 21, target: null, duration: 1500 },
  { panelOpen: true, buffersVisible: true, distancePct: 55, distanceLabel: 55, target: null, duration: 1500 },
  { panelOpen: true, buffersVisible: true, distancePct: 32, distanceLabel: 32, target: null, duration: 1500 },
  { panelOpen: true, buffersVisible: true, distancePct: 70, distanceLabel: 70, target: null, duration: 1500 },
  { phase: 'idle', panelOpen: true, buffersVisible: true, distancePct: 70, distanceLabel: 70, target: null, duration: 1800 },
];

const MoataGisSpatialQueryDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);

  return (
    <GisToolsWindow containerRef={containerRef} cursor={cursor} className={className} style={style}>
      <GisToolsHeader />
      <div className="moata-gis-tools__workspace">
        <GisToolsMapArea toolboxOpen={false} toolboxRef={setTargetRef('toolbox-btn')}>
          {SHAPES.map((shape, idx) => {
            const haloSize = shape.core + (shape.maxSize - shape.core) * (step.distancePct / 100);
            return (
              <React.Fragment key={idx}>
                <span
                  className={`moata-gis-query__shape ${step.buffersVisible ? 'is-visible' : ''}`.trim()}
                  style={{ left: shape.left, top: shape.top, width: haloSize, height: haloSize, transform: 'translate(-50%, -50%)' }}
                />
                <span
                  className={`moata-gis-query__shape-core ${step.buffersVisible ? 'is-visible' : ''}`.trim()}
                  style={{
                    left: shape.left,
                    top: shape.top,
                    width: shape.core,
                    height: shape.core,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </React.Fragment>
            );
          })}
        </GisToolsMapArea>
        <ToolsPanel title="Spatial Query" visible={step.panelOpen}>
          <div className="moata-gis-tools__field">
            <label>Input Selection</label>
            <div className="moata-gis-tools__field-value">Select from Layer</div>
          </div>
          <div className="moata-gis-tools__field">
            <label>Select a Layer</label>
            <div className="moata-gis-tools__field-value is-highlight">Traffic Diversions — all features (55)</div>
          </div>
          <div className="moata-gis-tools__field">
            <label>Buffer Distance</label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.66rem', color: '#374151' }}>{step.distanceLabel} km</span>
            </div>
            <div className="moata-gis-query__slider-track">
              <span className="moata-gis-query__slider-fill" style={{ width: `${step.distancePct}%` }} />
              <span className="moata-gis-query__slider-thumb" style={{ left: `${step.distancePct}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: '#9ca3af' }}>
              <span>0km</span>
              <span>100km</span>
            </div>
          </div>
          <div className="moata-gis-tools__field">
            <label>Spatial Relationship</label>
            <div className="moata-gis-tools__field-value">Intersects</div>
          </div>
          <div className="moata-gis-tools__field">
            <label>Target Layer</label>
            <div className="moata-gis-tools__field-value">Add target</div>
          </div>
        </ToolsPanel>
      </div>
    </GisToolsWindow>
  );
};

export default MoataGisSpatialQueryDemo;

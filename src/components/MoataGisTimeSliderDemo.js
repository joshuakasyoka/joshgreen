import React, { useRef } from 'react';
import {
  GisToolsHeader,
  GisToolsMapArea,
  GisToolsWindow,
  ToolsPanel,
  useDemoAnimation,
} from './MoataGisToolsShared';

// Traffic congestion at each point, one colour per time frame (0–3) — this is
// the data that actually changes as the time window scrubs forward, rather
// than shapes simply fading in.
const LIGHT = '#22c55e';
const MODERATE = '#f59e0b';
const HEAVY = '#ef4444';

const TRAFFIC_POINTS = [
  { left: '26%', top: '30%', levels: [LIGHT, MODERATE, HEAVY, MODERATE] },
  { left: '42%', top: '46%', levels: [LIGHT, LIGHT, MODERATE, HEAVY] },
  { left: '60%', top: '34%', levels: [MODERATE, HEAVY, HEAVY, LIGHT] },
  { left: '56%', top: '60%', levels: [LIGHT, MODERATE, LIGHT, LIGHT] },
  { left: '36%', top: '62%', levels: [HEAVY, LIGHT, MODERATE, LIGHT] },
  { left: '68%', top: '54%', levels: [MODERATE, MODERATE, LIGHT, HEAVY] },
];

const STEPS = [
  { panelOpen: false, frame: 0, leftPct: 0, rightPct: 100, target: null, duration: 1200 },
  { panelOpen: true, frame: 0, leftPct: 0, rightPct: 100, target: null, duration: 1400 },
  { panelOpen: true, frame: 1, leftPct: 22, rightPct: 78, target: null, duration: 1600 },
  { panelOpen: true, frame: 2, leftPct: 38, rightPct: 60, target: null, duration: 1600 },
  { phase: 'idle', panelOpen: true, frame: 3, leftPct: 60, rightPct: 88, target: null, duration: 1800 },
];

const MoataGisTimeSliderDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);

  return (
    <GisToolsWindow containerRef={containerRef} cursor={cursor} className={className} style={style}>
      <GisToolsHeader />
      <div className="moata-gis-tools__workspace">
        <GisToolsMapArea toolboxOpen={false} toolboxRef={setTargetRef('toolbox-btn')} searchRef={setTargetRef('search-btn')}>
          <span className="moata-gis-time__legend">Live traffic</span>
          {TRAFFIC_POINTS.map((point, idx) => {
            const color = point.levels[step.frame];
            return (
              <span
                key={idx}
                className={`moata-gis-time__traffic-dot ${color === HEAVY ? 'is-heavy' : ''}`.trim()}
                style={{ left: point.left, top: point.top, background: color }}
              />
            );
          })}
        </GisToolsMapArea>
        <ToolsPanel title="Time Slider" visible={step.panelOpen}>
          <div className="moata-gis-tools__field">
            <label>Map Time Range Source</label>
            <div className="moata-gis-tools__field-value">Custom Range</div>
          </div>
          <div className="moata-gis-tools__field">
            <label>Details Options</label>
            <div className="moata-gis-tools__field-value">Time Window</div>
          </div>
          <div className="moata-gis-tools__field">
            <label>Time Window</label>
            <div className="moata-gis-time__bar">
              <span
                className="moata-gis-time__bar-fill"
                style={{ left: `${step.leftPct}%`, right: `${100 - step.rightPct}%` }}
              />
              <span className="moata-gis-time__handle" style={{ left: `${step.leftPct}%` }} />
              <span className="moata-gis-time__handle" style={{ left: `${step.rightPct}%` }} />
            </div>
            <div className="moata-gis-time__dates">
              <span>04 Jun</span>
              <span>13 Jun</span>
              <span>19 Jun</span>
            </div>
          </div>
        </ToolsPanel>
      </div>
    </GisToolsWindow>
  );
};

export default MoataGisTimeSliderDemo;

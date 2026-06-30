import React, { useMemo, useRef } from 'react';
import { Folder, Square, Triangle } from 'lucide-react';
import {
  GisToolsHeader,
  GisToolsMapArea,
  GisToolsWindow,
  ToolsPanel,
  useDemoAnimation,
} from './MoataGisToolsShared';

const POLYGON_POINTS = [
  { x: 28, y: 42 },
  { x: 60, y: 32 },
  { x: 70, y: 62 },
  { x: 35, y: 70 },
];

const FEATURE_GROUPS = [
  {
    label: 'Survey Areas',
    items: [
      { name: 'HabitatSurveyAreasAMP8', color: '#9ca3af' },
      { name: 'Current Approved', color: '#5fd4c4', selected: true },
      { name: 'Current WIP', color: '#14b8a6' },
      { name: 'Shared', color: '#0d9488' },
      { name: 'Superseded', color: '#6b7280' },
    ],
  },
  {
    label: 'Traffic Diversions',
    items: [
      { name: 'TrafficDiversions', color: '#9ca3af' },
      { name: 'Diversion Route', color: '#5fd4c4' },
      { name: 'Road Closure', color: '#f97316' },
    ],
  },
];

// vertices = points placed so far; edgesDrawn = fraction (0–1) of the closed
// outline's perimeter revealed. With 4 edges, each vertex placed after the
// first reveals one more edge; the loop closes on its own step before fill.
const STEPS = [
  { panelOpen: false, vertices: 0, edgesDrawn: 0, target: null, duration: 1200 },
  { panelOpen: true, vertices: 0, edgesDrawn: 0, target: null, duration: 900 },
  { panelOpen: true, vertices: 1, edgesDrawn: 0, target: null, duration: 500 },
  { panelOpen: true, vertices: 2, edgesDrawn: 0.25, target: null, duration: 600 },
  { panelOpen: true, vertices: 3, edgesDrawn: 0.5, target: null, duration: 600 },
  { panelOpen: true, vertices: 4, edgesDrawn: 0.75, target: null, duration: 600 },
  { panelOpen: true, vertices: 4, edgesDrawn: 1, target: null, duration: 700 },
  { panelOpen: true, vertices: 4, edgesDrawn: 1, showArea: true, target: null, duration: 2400 },
];

const MoataGisEditorDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);
  const showFill = Boolean(step.showArea);

  const outlinePath = useMemo(() => {
    const [first, ...rest] = POLYGON_POINTS;
    const segments = rest.map((p) => `L ${p.x} ${p.y}`).join(' ');
    return `M ${first.x} ${first.y} ${segments} Z`;
  }, []);

  return (
    <GisToolsWindow containerRef={containerRef} cursor={cursor} className={className} style={style}>
      <GisToolsHeader />
      <div className="moata-gis-tools__workspace">
        <GisToolsMapArea toolboxOpen={false} toolboxRef={setTargetRef('toolbox-btn')} searchRef={setTargetRef('search-btn')}>
          <svg className="moata-gis-editor__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path
              d={outlinePath}
              className={`moata-gis-editor__fill ${showFill ? 'is-visible' : ''}`.trim()}
            />
            <path
              d={outlinePath}
              pathLength="1"
              className="moata-gis-editor__outline"
              style={{ strokeDashoffset: 1 - step.edgesDrawn }}
            />
          </svg>
          {POLYGON_POINTS.map((p, idx) => (
            <span
              key={`${p.x}-${p.y}`}
              className={`moata-gis-editor__vertex ${step.vertices > idx ? 'is-visible' : ''}`.trim()}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            />
          ))}
          <span className={`moata-gis-editor__area-label ${showFill ? 'is-visible' : ''}`.trim()}>
            Area: 1254.46 sq km
          </span>
          <div className="moata-gis-editor__toolbar">
            <span className="moata-gis-editor__toolbar-btn"><Folder size={14} /></span>
            <span className="moata-gis-editor__toolbar-btn is-active"><Square size={13} /></span>
            <span className="moata-gis-editor__toolbar-btn"><Triangle size={13} /></span>
          </div>
        </GisToolsMapArea>
        <ToolsPanel title="Editor" visible={step.panelOpen}>
          <div className="moata-gis-tools__field">
            <label>Create New Feature</label>
            <div className="moata-gis-tools__field-value">Filter by feature name</div>
          </div>
          {FEATURE_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="moata-gis-editor__feature-group">{group.label}</div>
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className={`moata-gis-editor__feature-row ${item.selected ? 'is-selected' : ''}`.trim()}
                >
                  <span className="moata-gis-editor__feature-swatch" style={{ background: item.color }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          ))}
        </ToolsPanel>
      </div>
    </GisToolsWindow>
  );
};

export default MoataGisEditorDemo;

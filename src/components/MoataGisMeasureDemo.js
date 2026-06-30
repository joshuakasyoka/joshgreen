import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  GisToolsHeader,
  GisToolsMapArea,
  GisToolsWindow,
  ToolsPanel,
  useDemoAnimation,
} from './MoataGisToolsShared';

const STEPS = [
  { panelOpen: false, line1: 0, line2: 0, showHalo: false, target: null, duration: 1200 },
  { panelOpen: true, line1: 0, line2: 0, showHalo: true, target: null, duration: 900 },
  { panelOpen: true, line1: 1, line2: 0, showHalo: true, target: null, duration: 1400 },
  { panelOpen: true, line1: 1, line2: 1, showHalo: true, target: null, duration: 1600 },
  { phase: 'idle', panelOpen: true, line1: 1, line2: 1, showHalo: true, target: null, duration: 2200 },
];

// Vertex + two measured points, as percentages of the map area. Real vector
// geometry — bearings, the interior angle, and the segment length are all
// derived from these coordinates rather than hardcoded.
const V = { x: 40, y: 58 };
const A = { x: 40, y: 20 };
const B = { x: 68, y: 68 };
const KM_PER_UNIT = 1.78; // arbitrary but fixed scale, so the length is internally consistent

// The map area isn't square, so equal x/y percentage deltas don't cover equal
// screen distance. Scaling x by the container's aspect ratio before doing
// trig keeps bearings/arcs visually true to what's on screen, not just to
// the abstract 0–100 coordinate space.
const bearing = (from, to, aspect) => {
  const dx = (to.x - from.x) * aspect;
  const dy = to.y - from.y;
  const deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
  return (deg + 360) % 360;
};

const distance = (from, to, aspect) => Math.hypot((to.x - from.x) * aspect, to.y - from.y);

const polarPoint = (center, radius, bearingDeg, aspect) => {
  const rad = (bearingDeg * Math.PI) / 180;
  return {
    x: center.x + (radius * Math.sin(rad)) / aspect,
    y: center.y - radius * Math.cos(rad),
  };
};

const describeArc = (center, radius, startBearing, endBearing, aspect) => {
  let sweep = endBearing - startBearing;
  if (sweep < 0) sweep += 360;
  const steps = 24;
  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const b = startBearing + (sweep * i) / steps;
    points.push(polarPoint(center, radius, b, aspect));
  }
  return `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')}`;
};

const MoataGisMeasureDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [aspect, setAspect] = useState(1.3);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);

  useLayoutEffect(() => {
    const node = overlayRef.current;
    if (!node) return undefined;

    const measure = () => {
      const { width, height } = node.getBoundingClientRect();
      if (width > 0 && height > 0) setAspect(width / height);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const geometry = useMemo(() => {
    const bearing1 = bearing(V, A, aspect);
    const bearing2 = bearing(V, B, aspect);
    let interiorAngle = bearing2 - bearing1;
    if (interiorAngle < 0) interiorAngle += 360;
    // The bend at V always has one obtuse and one acute reading: the interior
    // angle itself, and its supplement (the angle between segment V-B and
    // segment V-A extended backwards through V) — the two always sum to 180°.
    const obtuseAngle = interiorAngle > 90 ? interiorAngle : 180 - interiorAngle;
    const acuteAngle = 180 - obtuseAngle;
    const obtuseArc = describeArc(V, 9, bearing1, bearing2, aspect);
    const acuteArc = describeArc(V, 7, bearing2, bearing1 + 180, aspect);
    const obtuseLabelPoint = polarPoint(V, 13, bearing1 + interiorAngle / 2, aspect);
    const acuteLabelPoint = polarPoint(V, 11, bearing2 + acuteAngle / 2, aspect);
    const lengthAKm = distance(V, A, aspect) * KM_PER_UNIT;
    const lengthBKm = distance(V, B, aspect) * KM_PER_UNIT;
    return {
      obtuseAngle: obtuseAngle.toFixed(1),
      acuteAngle: acuteAngle.toFixed(1),
      lengthAKm: lengthAKm.toFixed(2),
      lengthBKm: lengthBKm.toFixed(2),
      obtuseArc,
      acuteArc,
      obtuseLabelPoint,
      acuteLabelPoint,
    };
  }, [aspect]);

  return (
    <GisToolsWindow containerRef={containerRef} cursor={cursor} className={className} style={style}>
      <GisToolsHeader />
      <div className="moata-gis-tools__workspace">
        <GisToolsMapArea toolboxOpen={false} toolboxRef={setTargetRef('toolbox-btn')} searchRef={setTargetRef('search-btn')}>
          <div ref={overlayRef} className="moata-gis-measure__overlay">
            <div
              className={`moata-gis-measure__halo ${step.showHalo ? 'is-visible' : ''}`.trim()}
              style={{ left: `${V.x}%`, top: `${V.y}%` }}
            />
            <svg className="moata-gis-measure__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line
                x1={V.x} y1={V.y} x2={A.x} y2={A.y}
                pathLength="1"
                className={`moata-gis-measure__line ${step.line1 ? 'is-drawn' : ''}`.trim()}
              />
              <line
                x1={V.x} y1={V.y} x2={B.x} y2={B.y}
                pathLength="1"
                className={`moata-gis-measure__line ${step.line2 ? 'is-drawn' : ''}`.trim()}
              />
              <path
                d={geometry.obtuseArc}
                className={`moata-gis-measure__arc ${step.line2 ? 'is-drawn' : ''}`.trim()}
              />
              <path
                d={geometry.acuteArc}
                className={`moata-gis-measure__arc ${step.line2 ? 'is-drawn' : ''}`.trim()}
              />
            </svg>
            <span
              className="moata-gis-measure__vertex"
              style={{ left: `${V.x}%`, top: `${V.y}%` }}
            />
            <span
              className={`moata-gis-measure__vector-point ${step.line1 ? 'is-visible' : ''}`.trim()}
              style={{ left: `${A.x}%`, top: `${A.y}%` }}
            />
            <span
              className={`moata-gis-measure__vector-point ${step.line2 ? 'is-visible' : ''}`.trim()}
              style={{ left: `${B.x}%`, top: `${B.y}%` }}
            />
            <span
              className={`moata-gis-measure__label moata-gis-measure__label--angle ${step.line2 ? 'is-visible' : ''}`.trim()}
              style={{ left: `${geometry.obtuseLabelPoint.x}%`, top: `${geometry.obtuseLabelPoint.y}%` }}
            >
              {geometry.obtuseAngle}°
            </span>
            <span
              className={`moata-gis-measure__label moata-gis-measure__label--angle ${step.line2 ? 'is-visible' : ''}`.trim()}
              style={{ left: `${geometry.acuteLabelPoint.x}%`, top: `${geometry.acuteLabelPoint.y}%` }}
            >
              {geometry.acuteAngle}°
            </span>
            <span className={`moata-gis-measure__label moata-gis-measure__label--angle1 ${step.line1 ? 'is-visible' : ''}`.trim()}>
              Length: {geometry.lengthAKm} km
            </span>
            <span className={`moata-gis-measure__label moata-gis-measure__label--length ${step.line2 ? 'is-visible' : ''}`.trim()}>
              Length: {geometry.lengthBKm} km
            </span>
          </div>
        </GisToolsMapArea>
        <ToolsPanel title="Measure" visible={step.panelOpen}>
          <div className="moata-gis-tools__field" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#111827' }}>New Measurement</span>
            <Plus size={15} color="#374151" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18 }}>
            <span style={{
              width: 28, height: 16, borderRadius: 999, background: '#e5e7eb',
              position: 'relative', display: 'inline-block',
            }}>
              <span style={{
                position: 'absolute', top: 2, left: 2, width: 12, height: 12,
                borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }} />
            </span>
            <span style={{ fontSize: '0.66rem', color: '#374151' }}>Keep measurements</span>
          </div>
        </ToolsPanel>
      </div>
    </GisToolsWindow>
  );
};

export default MoataGisMeasureDemo;

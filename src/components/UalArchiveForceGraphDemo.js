import React, { useEffect, useRef, useState } from 'react';
import UalArchiveDemoChrome from './UalArchiveDemoChrome';
import { DEMO_ARTEFACTS } from './ualArchiveDemoData';
import './UalArchiveDemoShared.css';

const GRAPH_NODES = DEMO_ARTEFACTS.slice(0, 4);
const CARD_W = 68;
const CARD_H = 48;

const STEPS = [
  { target: 'view-grid', view: 'grid', highlightNode: null, duration: 1000 },
  { target: 'view-graph', view: 'grid', highlightNode: null, duration: 1200 },
  { target: 'view-graph', view: 'graph', highlightNode: null, duration: 2000 },
  { target: 'node-1', view: 'graph', highlightNode: 1, duration: 1800 },
  { target: 'idle', view: 'graph', highlightNode: null, duration: 1000 },
];

function layoutOnCircle(count, cx, cy, radius, angleOffset) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2 + angleOffset;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

const GridIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
    <rect x="8.5" y="1.5" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
    <rect x="1.5" y="8.5" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
    <rect x="8.5" y="8.5" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const MapIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M4.5 2.5L1.5 3.5v8l3-1 3.5 1.5 3.5-1.5 3 1V4.5l-3 1-3.5-1.5-3.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const GraphIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="3.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="10.5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="10.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4.7 9.4L9.3 4.8M4.7 9.4l5.1.8M9.3 4.8l.5 5.4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const FilterIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1.5 2.5h11M3.5 7h7M5.5 11.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const UalArchiveForceGraphDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const svgRef = useRef(null);
  const frameRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);
  const [orbit, setOrbit] = useState(0);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const showGraph = step.view === 'graph';

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
    else delete targetRefs.current[key];
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running || !showGraph) return undefined;

    const start = performance.now();
    const tick = (now) => {
      setOrbit((now - start) * 0.00025);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, showGraph]);

  useEffect(() => {
    if (!running) return undefined;

    const updateCursor = () => {
      const container = containerRef.current;
      if (!container || isIdle) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setCursor({
        x: targetRect.left - containerRect.left + targetRect.width * 0.55,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: true,
      });
    };

    updateCursor();
    window.addEventListener('resize', updateCursor);
    return () => window.removeEventListener('resize', updateCursor);
  }, [step, running, isIdle]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  const width = 760;
  const height = 420;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 120;
  const positions = layoutOnCircle(GRAPH_NODES.length, cx, cy, radius, orbit);
  const links = [];
  for (let i = 0; i < GRAPH_NODES.length; i += 1) {
    for (let j = i + 1; j < GRAPH_NODES.length; j += 1) {
      links.push([i, j]);
    }
  }

  return (
    <UalArchiveDemoChrome
      containerRef={containerRef}
      cursor={cursor}
      activeSubnav="artefacts"
      className={className}
      style={style}
    >
      <div className="ual-archive-demo__filter-bar">
        <div className="ual-archive-demo__filter-top">
          <div className="ual-archive-demo__cohorts">
            <span className="ual-archive-demo__cohort is-active">All</span>
            <span className="ual-archive-demo__cohort">2025 – 26</span>
          </div>

          <div className="ual-archive-demo__search-wrap">
            <span className="ual-archive-demo__search-label">Search:</span>
            <input className="ual-archive-demo__search-input" value="" readOnly aria-label="Search artefacts" />
            <span className="ual-archive-demo__filter-chip">
              <FilterIcon />
              <span>Filter</span>
            </span>
          </div>

          <div className="ual-archive-demo__view-wrap">
            <span className="ual-archive-demo__view-label">View</span>
            <span
              ref={setTargetRef('view-grid')}
              className={[
                'ual-archive-demo__view-btn',
                step.view === 'grid' ? 'is-active' : '',
                step.target === 'view-grid' ? 'is-hovered' : '',
              ].filter(Boolean).join(' ')}
            >
              <GridIcon />
            </span>
            <span className="ual-archive-demo__view-btn"><MapIcon /></span>
            <span
              ref={setTargetRef('view-graph')}
              className={[
                'ual-archive-demo__view-btn',
                step.view === 'graph' ? 'is-active' : '',
                step.target === 'view-graph' ? 'is-hovered' : '',
              ].filter(Boolean).join(' ')}
            >
              <GraphIcon />
            </span>
          </div>
        </div>
      </div>

      {showGraph ? (
        <div className="ual-archive-demo__graph-stage" ref={svgRef}>
          <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
            {links.map(([from, to]) => (
              <line
                key={`${from}-${to}`}
                x1={positions[from].x}
                y1={positions[from].y}
                x2={positions[to].x}
                y2={positions[to].y}
                stroke="#d8d8d8"
                strokeWidth="1"
              />
            ))}
            {GRAPH_NODES.map((node, index) => {
              const { x, y } = positions[index];
              const isHighlighted = step.highlightNode === index;
              return (
                <g
                  key={node.id}
                  ref={index === 1 ? setTargetRef('node-1') : undefined}
                  transform={`translate(${x}, ${y})`}
                  style={{ filter: isHighlighted ? 'drop-shadow(0 0 6px rgba(0,0,0,0.18))' : undefined }}
                >
                  <rect
                    x={-CARD_W / 2}
                    y={-CARD_H / 2}
                    width={CARD_W}
                    height={CARD_H}
                    fill="#fff"
                    stroke={isHighlighted ? '#111' : '#e0e0e0'}
                    rx="2"
                  />
                  <rect
                    x={-CARD_W / 2 + 2}
                    y={-CARD_H / 2 + 2}
                    width={CARD_W - 4}
                    height={CARD_H - 4}
                    fill={node.color}
                    rx="1"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        <div className="ual-archive-demo__grid">
          {GRAPH_NODES.map((artefact) => (
            <article key={artefact.id} className="ual-archive-demo__card">
              <div className="ual-archive-demo__card-thumb">
                <div
                  className="ual-archive-demo__card-thumb-inner"
                  style={{ background: `linear-gradient(145deg, ${artefact.color}, #f5f5f5)` }}
                />
              </div>
              <div className="ual-archive-demo__card-title">{artefact.title}</div>
              <div className="ual-archive-demo__card-subtitle">{artefact.project}</div>
            </article>
          ))}
        </div>
      )}
    </UalArchiveDemoChrome>
  );
};

export default UalArchiveForceGraphDemo;

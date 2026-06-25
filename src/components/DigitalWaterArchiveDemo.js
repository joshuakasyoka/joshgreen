import React, { useEffect, useMemo, useRef, useState } from 'react';
import DigitalWaterDemoChrome from './DigitalWaterDemoChrome';
import { DEMO_ARTIFACTS, FILTER_TYPES, TOTAL_WATER, filterArtifacts } from './digitalWaterDemoData';
import './DigitalWaterDemoShared.css';

const STEPS = [
  { target: 'filter-text', filter: 'All', query: '', selectedId: null, duration: 1100 },
  { target: 'filter-text', filter: 'Text', query: '', selectedId: null, duration: 1400 },
  { target: 'search', filter: 'Text', query: '', selectedId: null, duration: 1100 },
  { target: 'search', filter: 'Text', query: '1', selectedId: null, duration: 160 },
  { target: 'search', filter: 'Text', query: '14', selectedId: null, duration: 1200 },
  { target: 'tile-14', filter: 'Text', query: '14', selectedId: null, duration: 1300 },
  { target: 'tile-14', filter: 'Text', query: '14', selectedId: 14, duration: 1800 },
  { target: 'filter-all', filter: 'All', query: '', selectedId: null, duration: 1200 },
  { target: 'filter-simulation', filter: 'Simulation', query: '', selectedId: null, duration: 1500 },
  { target: 'idle', filter: 'Simulation', query: '', selectedId: null, duration: 1000 },
];

const DigitalWaterArchiveDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const visibleArtifacts = useMemo(
    () => filterArtifacts(DEMO_ARTIFACTS, { filter: step.filter, query: step.query }),
    [step.filter, step.query]
  );

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

  return (
    <DigitalWaterDemoChrome
      containerRef={containerRef}
      cursor={cursor}
      artifactCount={DEMO_ARTIFACTS.length}
      totalWater={TOTAL_WATER}
      className={className}
      style={style}
    >
      <div className="dwd-archive">
        <div className="dwd-archive__toolbar">
          <div className="dwd-archive__filters">
            {FILTER_TYPES.map((filter) => {
              const key = `filter-${filter.toLowerCase()}`;
              return (
                <span
                  key={filter}
                  ref={setTargetRef(key)}
                  className={[
                    'dwd-archive__filter',
                    step.filter === filter ? 'is-active' : '',
                    step.target === key ? 'is-hovered' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {filter}
                </span>
              );
            })}
          </div>
          <input
            ref={setTargetRef('search')}
            className={[
              'dwd-archive__search',
              step.target === 'search' ? 'is-hovered' : '',
            ].filter(Boolean).join(' ')}
            value={step.query}
            placeholder="Search by ID..."
            readOnly
            aria-label="Search by ID"
          />
        </div>

        <div className="dwd-archive__grid">
          {visibleArtifacts.map((artifact) => {
            const key = `tile-${artifact.id}`;
            return (
              <article
                key={artifact.id}
                ref={setTargetRef(key)}
                className={[
                  'dwd-archive__tile',
                  step.selectedId === artifact.id ? 'is-selected' : '',
                  step.target === key ? 'is-hovered' : '',
                ].filter(Boolean).join(' ')}
              >
                <div className="dwd-archive__tile-header">
                  <div className="dwd-archive__tile-id">LIQUID ARTIFACT #{artifact.id}</div>
                  <div className="dwd-archive__tile-type">{artifact.type}</div>
                </div>
                <p className="dwd-archive__tile-preview">{artifact.preview}</p>
                <div className="dwd-archive__tile-water">WATER: {artifact.water}L</div>
              </article>
            );
          })}
        </div>
      </div>
    </DigitalWaterDemoChrome>
  );
};

export default DigitalWaterArchiveDemo;

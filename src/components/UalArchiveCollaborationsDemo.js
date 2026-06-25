import React, { useEffect, useRef, useState } from 'react';
import UalArchiveDemoChrome from './UalArchiveDemoChrome';
import {
  DEMO_COLLABORATIONS,
  DEMO_COLLABORATIONS_BY_PARTNER,
  filterCollaborations,
} from './ualArchiveDemoData';
import './UalArchiveDemoShared.css';

const MAP_PINS = [
  { id: 'pin-1', left: '28%', top: '36%' },
  { id: 'pin-2', left: '52%', top: '48%' },
  { id: 'pin-3', left: '68%', top: '30%' },
  { id: 'pin-4', left: '42%', top: '62%' },
];

const STEPS = [
  { target: 'entry-0', groupBy: 'partner', query: '', duration: 1600 },
  { target: 'sort-partner', groupBy: 'partner', query: '', duration: 1400 },
  { target: 'sort-partner', groupBy: 'project', query: '', duration: 1800 },
  { target: 'search', groupBy: 'project', query: 'fabric', duration: 1800 },
  { target: 'idle', groupBy: 'project', query: 'fabric', duration: 1000 },
];

const ListIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 3.5h10M2 7h10M2 10.5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MapIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M4.5 2.5L1.5 3.5v8l3-1 3.5 1.5 3.5-1.5 3 1V4.5l-3 1-3.5-1.5-3.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1.5 2.5h11M3.5 7h7M5.5 11.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 8.5L8.5 3M8.5 3H4.5M8.5 3v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UalArchiveCollaborationsDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const sourceEntries = step.groupBy === 'project'
    ? DEMO_COLLABORATIONS_BY_PARTNER
    : DEMO_COLLABORATIONS;
  const entries = filterCollaborations(sourceEntries, step.query);

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
    <UalArchiveDemoChrome
      containerRef={containerRef}
      cursor={cursor}
      activeSubnav="collaborations"
      className={className}
      style={style}
    >
      <div className="ual-archive-demo__filter-bar">
        <div className="ual-archive-demo__filter-top">
          <div className="ual-archive-demo__cohorts">
            <span
              className={`ual-archive-demo__cohort${step.groupBy === 'partner' ? ' is-active' : ''}`}
            >
              Project
            </span>
            <span
              ref={setTargetRef('sort-partner')}
              className={[
                'ual-archive-demo__cohort',
                step.groupBy === 'project' ? 'is-active' : '',
                step.target === 'sort-partner' ? 'is-hovered' : '',
              ].filter(Boolean).join(' ')}
            >
              Partner
            </span>
          </div>

          <div className="ual-archive-demo__search-wrap">
            <span className="ual-archive-demo__search-label">Search:</span>
            <input
              ref={setTargetRef('search')}
              className={`ual-archive-demo__search-input${step.target === 'search' ? ' is-focused' : ''}`}
              value={step.query}
              readOnly
              aria-label="Search collaborations"
            />
            <span className="ual-archive-demo__filter-chip">
              <FilterIcon />
              <span>Filter</span>
            </span>
          </div>

          <div className="ual-archive-demo__view-wrap">
            <span className="ual-archive-demo__view-label">View</span>
            <span className="ual-archive-demo__view-btn"><ListIcon /></span>
            <span className="ual-archive-demo__view-btn is-active"><MapIcon /></span>
          </div>
        </div>
      </div>

      <div className="ual-archive-demo__collab-layout">
        <div className="ual-archive-demo__collab-list">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              ref={index === 0 ? setTargetRef('entry-0') : undefined}
              className={[
                'ual-archive-demo__collab-item',
                step.target === 'entry-0' && index === 0 ? 'is-hovered' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="ual-archive-demo__collab-num">{index + 1}</div>
              <div className="ual-archive-demo__collab-body">
                <div className="ual-archive-demo__collab-title">{entry.title}</div>
                <div className="ual-archive-demo__collab-pills">
                  {entry.pills.map((pill) => (
                    <span key={pill} className="ual-archive-demo__collab-pill">
                      <span>{pill}</span>
                      <ArrowIcon />
                    </span>
                  ))}
                </div>
              </div>
              {step.groupBy === 'partner' && (
                <div
                  className="ual-archive-demo__collab-thumb"
                  style={{ background: `linear-gradient(160deg, ${entry.color}, #ececec)` }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="ual-archive-demo__collab-map">
          {MAP_PINS.map((pin, index) => (
            <span
              key={pin.id}
              className={[
                'ual-archive-demo__map-pin',
                step.target === 'entry-0' && index === 0 ? 'is-hovered' : '',
              ].filter(Boolean).join(' ')}
              style={{ left: pin.left, top: pin.top }}
            />
          ))}
        </div>
      </div>
    </UalArchiveDemoChrome>
  );
};

export default UalArchiveCollaborationsDemo;

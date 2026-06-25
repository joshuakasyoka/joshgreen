import React, { useEffect, useRef, useState } from 'react';
import UalArchiveDemoChrome from './UalArchiveDemoChrome';
import { DEMO_ARTEFACTS, filterArtefacts } from './ualArchiveDemoData';
import './UalArchiveDemoShared.css';

const STEPS = [
  { target: 'filter-toggle', filterOpen: false, activeTag: null, query: '', duration: 1200 },
  { target: 'filter-toggle', filterOpen: true, activeTag: null, query: '', duration: 1400 },
  { target: 'tag-participatory', filterOpen: true, activeTag: null, query: '', duration: 1400 },
  { target: 'tag-participatory', filterOpen: true, activeTag: 'participatory', query: '', duration: 1800 },
  { target: 'filter-toggle', filterOpen: false, activeTag: 'participatory', query: '', duration: 1200 },
  { target: 'chip-participatory', filterOpen: false, activeTag: 'participatory', query: '', duration: 1400 },
  { target: 'chip-participatory', filterOpen: false, activeTag: null, query: '', duration: 1200 },
  { target: 'search', filterOpen: false, activeTag: null, query: '', duration: 1200 },
  { target: 'search', filterOpen: false, activeTag: null, query: 'sound', duration: 1800 },
  { target: 'idle', filterOpen: false, activeTag: null, query: 'sound', duration: 1000 },
];

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

const UalArchiveFilterDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const visibleArtefacts = filterArtefacts(DEMO_ARTEFACTS, {
    query: step.query,
    activeTag: step.activeTag,
  });
  const visibleIds = new Set(visibleArtefacts.map((item) => item.id));

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
      activeSubnav="artefacts"
      className={className}
      style={style}
    >
      <div className="ual-archive-demo__filter-bar">
        <div className="ual-archive-demo__filter-top">
          <div className="ual-archive-demo__cohorts">
            <span className="ual-archive-demo__cohort is-active">All</span>
            <span className="ual-archive-demo__cohort">2025 – 26</span>
            <span className="ual-archive-demo__cohort">2024 – 25</span>
          </div>

          <div className="ual-archive-demo__search-wrap">
            <span className="ual-archive-demo__search-label">Search:</span>
            <input
              ref={setTargetRef('search')}
              className={`ual-archive-demo__search-input${step.target === 'search' ? ' is-focused' : ''}`}
              value={step.query}
              readOnly
              aria-label="Search artefacts"
            />
            <span
              ref={setTargetRef('filter-toggle')}
              className={[
                'ual-archive-demo__filter-chip',
                step.filterOpen ? 'is-active' : '',
                step.target === 'filter-toggle' ? 'is-hovered' : '',
              ].filter(Boolean).join(' ')}
            >
              <FilterIcon />
              <span>Filter</span>
            </span>
          </div>

          <div className="ual-archive-demo__view-wrap">
            <span className="ual-archive-demo__view-label">View</span>
            <span className="ual-archive-demo__view-btn is-active"><GridIcon /></span>
            <span className="ual-archive-demo__view-btn"><MapIcon /></span>
            <span className="ual-archive-demo__view-btn"><GraphIcon /></span>
          </div>
        </div>

        <div className="ual-archive-demo__active-chips">
          {step.activeTag && (
            <span
              ref={setTargetRef('chip-participatory')}
              className={[
                'ual-archive-demo__active-chip',
                step.target === 'chip-participatory' ? 'is-hovered' : '',
              ].filter(Boolean).join(' ')}
            >
              {step.activeTag}
              <span aria-hidden="true">×</span>
            </span>
          )}
        </div>

        {step.filterOpen && (
          <div className="ual-archive-demo__filter-panel">
            <h3 className="ual-archive-demo__filter-group-label">Methods</h3>
            <div className="ual-archive-demo__filter-tags">
              {['participatory', 'audiorecording', 'mapping'].map((tag) => (
                <span
                  key={tag}
                  ref={tag === 'participatory' ? setTargetRef('tag-participatory') : undefined}
                  className={[
                    'ual-archive-demo__filter-tag',
                    step.activeTag === tag ? 'is-selected' : '',
                    step.target === `tag-${tag}` ? 'is-hovered' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="ual-archive-demo__grid">
        {DEMO_ARTEFACTS.filter((artefact) => visibleIds.has(artefact.id)).map((artefact) => (
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
    </UalArchiveDemoChrome>
  );
};

export default UalArchiveFilterDemo;

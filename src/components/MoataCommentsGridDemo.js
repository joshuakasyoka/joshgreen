import React, { useEffect, useRef, useState } from 'react';
import './MoataCommentsGridDemo.css';

const FILTER_OPTIONS = ['All', 'Open', 'In Review', 'Resolved'];

const COMMENTS = [
  {
    id: '0',
    ref: 'A4F281',
    author: 'Samuel',
    initials: 'SP',
    date: '12 May',
    text: 'Need to review the impact on ancient woodland boundary here',
    status: 'In Review',
  },
  {
    id: '1',
    ref: 'B8C392',
    author: 'Samuel',
    initials: 'SP',
    date: '10 May',
    text: 'Check setback distance from the coastal path',
    status: 'High',
  },
  {
    id: '2',
    ref: 'C1D045',
    author: 'Thomas',
    initials: 'TS',
    date: '8 May',
    text: 'Updated layer opacity for woodland overlay',
    status: 'Resolved',
  },
  {
    id: '3',
    ref: 'D2E118',
    author: 'Priya',
    initials: 'PK',
    date: '7 May',
    text: 'Confirm ecology buffer before sign-off',
    status: 'High',
  },
  {
    id: '4',
    ref: 'E3F229',
    author: 'Thomas',
    initials: 'TS',
    date: '5 May',
    text: 'Rail alignment comment — needs programme review',
    status: 'In Review',
  },
  {
    id: '5',
    ref: 'F4G330',
    author: 'Samuel',
    initials: 'SP',
    date: '3 May',
    text: 'Utilities crossing flagged for clash check',
    status: 'High',
  },
];

const STEPS = [
  { filter: 'All', panelWide: false, target: 'filter-btn', duration: 1400 },
  { filter: 'All', panelWide: false, filterOpen: true, target: 'filter-btn', duration: 1200 },
  { filter: 'All', panelWide: false, filterOpen: true, target: 'filter-in-review', hoverFilter: true, duration: 1400 },
  { filter: 'In Review', panelWide: false, duration: 1400 },
  { filter: 'In Review', panelWide: false, target: 'resize-handle', duration: 1600 },
  { filter: 'In Review', panelWide: true, target: 'resize-handle', resizing: true, duration: 1800 },
  { filter: 'In Review', panelWide: true, duration: 2200 },
  { phase: 'idle', filter: 'In Review', panelWide: true, duration: 1200 },
];

const STATUS_CLASS = {
  High: 'high',
  'In Review': 'in-review',
  Resolved: 'resolved',
};


const Sym = ({ name, size = 20, fill = 1, color }) => (
  <span
    className="material-symbols-rounded"
    style={{
      fontSize: size,
      lineHeight: 1,
      display: 'inline-flex',
      fontVariationSettings: `'wght' 400, 'FILL' ${fill}, 'GRAD' 0, 'opsz' 20`,
      ...(color ? { color } : {}),
    }}
    aria-hidden="true"
  >
    {name}
  </span>
);

const StatusPill = ({ status }) => {
  const slug = STATUS_CLASS[status] || 'resolved';
  return (
    <span className={`moata-comments-grid-demo__status-pill moata-comments-grid-demo__status-pill--${slug}`}>
      {status}
    </span>
  );
};

const filterComments = (filter) => COMMENTS.filter((comment) => {
  if (filter === 'Resolved') return comment.status === 'Resolved';
  if (filter === 'In Review') return comment.status === 'In Review';
  if (filter === 'Open') return comment.status === 'High' || comment.status === 'In Review';
  return true;
});

const MoataCommentsGridDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';
  const panelWide = Boolean(step.panelWide);
  const filterOpen = Boolean(step.filterOpen);
  const visibleComments = filterComments(step.filter || 'All');

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
      if (!container || isIdle || !step.target) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target || !container.contains(target)) {
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
    const layoutTimer = window.setTimeout(updateCursor, panelWide ? 420 : 80);
    window.addEventListener('resize', updateCursor);
    return () => {
      window.clearTimeout(layoutTimer);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running, isIdle, panelWide]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-comments-grid-demo ${className}`.trim()} style={style}>
      <div className="moata-comments-grid-demo__stage" ref={containerRef}>
        <div className="moata-comments-grid-demo__map" aria-hidden="true">
          <div className="moata-comments-grid-demo__map-toolbar">
            <span className="moata-comments-grid-demo__map-chip is-active">
              <Sym name="arrow_selector_tool" size={15} />
            </span>
            <span className="moata-comments-grid-demo__map-chip">
              <Sym name="chat_bubble" size={15} fill={0} />
            </span>
          </div>
        </div>

        <div
          className={[
            'moata-comments-grid-demo__panel',
            panelWide ? 'is-wide' : '',
            step.resizing ? 'is-resizing' : '',
          ].filter(Boolean).join(' ')}
        >
          <span
            ref={setTargetRef('resize-handle')}
            className={`moata-comments-grid-demo__resize-handle ${step.resizing ? 'is-active' : ''}`.trim()}
            aria-hidden="true"
          />

          <div className="moata-comments-grid-demo__tabs">
            <span className="moata-comments-grid-demo__tab-collapse">
              <Sym name="keyboard_double_arrow_right" size={16} color="#6b7280" />
            </span>
            <span className="moata-comments-grid-demo__tab is-active">
              <Sym name="forum" size={16} color="#111827" />
              Comments
            </span>
            <span className="moata-comments-grid-demo__tab-add">
              <Sym name="add" size={15} color="#6b7280" />
            </span>
          </div>

          <div className="moata-comments-grid-demo__body">
            <div className="moata-comments-grid-demo__header">
              <h4>{COMMENTS.length} Comments</h4>
              <div className="moata-comments-grid-demo__filter-wrap">
                <span
                  ref={setTargetRef('filter-btn')}
                  className={[
                    'moata-comments-grid-demo__icon-btn',
                    step.filter !== 'All' ? 'is-active' : '',
                    filterOpen ? 'is-hovered' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <Sym name="filter_list" size={16} />
                </span>
                {filterOpen && (
                  <div className="moata-comments-grid-demo__filter-menu">
                    {FILTER_OPTIONS.map((option) => (
                      <span
                        key={option}
                        ref={option === 'In Review' ? setTargetRef('filter-in-review') : undefined}
                        className={[
                          'moata-comments-grid-demo__filter-item',
                          step.filter === option ? 'is-selected' : '',
                          option === 'In Review' && step.hoverFilter ? 'is-hovered' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="moata-comments-grid-demo__search">
              <Sym name="search" size={15} color="#6b7280" />
              <span>Search comments…</span>
            </div>

            {step.filter !== 'All' && (
              <div className="moata-comments-grid-demo__filter-chip-wrap">
                <span className="moata-comments-grid-demo__filter-chip">
                  {step.filter}
                  <span className="moata-comments-grid-demo__filter-chip-close" aria-hidden="true">
                    <Sym name="close" size={12} color="#6b7280" />
                  </span>
                </span>
              </div>
            )}

            <div className="moata-comments-grid-demo__list-scroll">
              <div className={`moata-comments-grid-demo__list ${panelWide ? 'is-grid' : ''}`.trim()}>
                {visibleComments.map((comment) => (
                  <div key={comment.id} className="moata-comments-grid-demo__card">
                    <div className="moata-comments-grid-demo__card-top">
                      <span className="moata-comments-grid-demo__avatar">{comment.initials}</span>
                      <span className="moata-comments-grid-demo__card-spacer" />
                      <span className="moata-comments-grid-demo__card-action">
                        <Sym name="more_horiz" size={15} />
                      </span>
                      <span className="moata-comments-grid-demo__card-action">
                        <Sym
                          name="check_circle"
                          size={16}
                          fill={comment.status === 'Resolved' ? 1 : 0}
                        />
                      </span>
                    </div>
                    <div className="moata-comments-grid-demo__card-ref">#{comment.ref}</div>
                    <div className="moata-comments-grid-demo__card-meta">
                      {comment.author}{' '}
                      <span className="moata-comments-grid-demo__card-date">{comment.date}</span>
                    </div>
                    <p className="moata-comments-grid-demo__card-text">{comment.text}</p>
                    {comment.status && <StatusPill status={comment.status} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <svg
          className={`moata-comments-grid-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          aria-hidden="true"
        >
          <path
            d="M5.5 3.5L18 12.5L11.5 14L9.5 20.5L5.5 3.5Z"
            fill="#111"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default MoataCommentsGridDemo;

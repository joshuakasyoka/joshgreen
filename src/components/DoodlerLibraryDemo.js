import React, { useEffect, useRef, useState } from 'react';
import './DoodlerLibraryDemo.css';

const SECTIONS = [
  { chip: 'Krachten', caption: 'Dit gaat er goed...' },
  { chip: 'Klachten', caption: 'Dit speelt mee...' },
  { chip: 'Inzichten', caption: 'Dit viel op...' },
  { chip: 'Aanpak', caption: 'Dit gaan we doen...' },
];

const SESSIONS = [
  { activityName: 'Intake', date: '12 januari 2026' },
  { activityName: 'Adviesgesprek', date: '4 februari 2026' },
];

const STEPS = [
  { target: 'library-screen', duration: 1800 },
  { target: 'session-0', duration: 2000 },
  { target: 'section-0-0', duration: 1600 },
  { target: 'session-1', duration: 1800 },
  { target: 'open-btn-1', duration: 1400 },
  { target: 'section-1-2', duration: 1600 },
  { target: 'idle', duration: 1000 },
];

const LibraryIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4 1.5v9M8 1.5v9" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 2.5v7M2.5 6h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const OpenIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M6.5 1.5h3v3M9.5 1.5L4.5 6.5M4 3.5H2.5a1 1 0 00-1 1V8.5a1 1 0 001 1H6.5a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DoodlerLibraryDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const highlightedSession = step.target?.startsWith('session-')
    ? Number(step.target.split('-')[1])
    : step.target?.startsWith('open-btn-')
      ? Number(step.target.split('-')[2])
      : step.target?.startsWith('section-')
        ? Number(step.target.split('-')[1])
        : null;
  const highlightedSection = step.target?.startsWith('section-')
    ? Number(step.target.split('-')[2])
    : null;
  const highlightedOpen = step.target?.startsWith('open-btn-') ? Number(step.target.split('-')[2]) : null;

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
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
      if (!container || !step.target || step.target === 'idle') {
        setCursor((prev) => ({ ...prev, visible: step.target !== 'idle' }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target) {
        setCursor((prev) => ({ ...prev, visible: step.target !== 'idle' }));
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
  }, [step, running]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`doodler-library-demo ${className}`.trim()} style={style}>
      <div className="doodler-library-demo__window" ref={containerRef}>
        <div className="doodler-library-demo__browser-bar">
          <span className="doodler-library-demo__dot doodler-library-demo__dot--red" />
          <span className="doodler-library-demo__dot doodler-library-demo__dot--yellow" />
          <span className="doodler-library-demo__dot doodler-library-demo__dot--green" />
          <span className="doodler-library-demo__url">doodler.app/bibliotheek</span>
        </div>

        <div className="doodler-library-demo__content">
          <div className="doodler-library-demo__header">
            <span className="doodler-library-demo__logo">doodler</span>
            <div className="doodler-library-demo__header-actions">
              <button type="button" className="doodler-library-demo__btn doodler-library-demo__btn--outline is-active">
                <LibraryIcon />
                Bibliotheek
              </button>
              <button type="button" className="doodler-library-demo__btn doodler-library-demo__btn--primary">
                <PlusIcon />
                Nieuwe doodle
              </button>
            </div>
          </div>

          <div className="doodler-library-demo__screen" ref={setTargetRef('library-screen')}>
            <div className="doodler-library-demo__sessions">
              {SESSIONS.map((session, sessionIndex) => (
                <article
                  key={session.activityName}
                  className={`doodler-library-demo__session-card ${
                    highlightedSession === sessionIndex ? 'is-highlighted' : ''
                  }`}
                  ref={setTargetRef(`session-${sessionIndex}`)}
                >
                  <div className="doodler-library-demo__session-header">
                    <div className="doodler-library-demo__session-meta">
                      <h2>{session.activityName}</h2>
                      <p>Laatste sessie: {session.date}</p>
                    </div>
                    <button
                      type="button"
                      className={`doodler-library-demo__btn doodler-library-demo__btn--outline doodler-library-demo__open-btn ${
                        highlightedOpen === sessionIndex ? 'is-highlighted' : ''
                      }`}
                      ref={setTargetRef(`open-btn-${sessionIndex}`)}
                    >
                      <OpenIcon />
                      Openen
                    </button>
                  </div>

                  <div className="doodler-library-demo__preview-row">
                    {SECTIONS.map((section, sectionIndex) => (
                      <div
                        key={section.chip}
                        className={`doodler-library-demo__section ${
                          highlightedSession === sessionIndex && highlightedSection === sectionIndex
                            ? 'is-highlighted'
                            : ''
                        }`}
                        ref={setTargetRef(`section-${sessionIndex}-${sectionIndex}`)}
                      >
                        <span className="doodler-library-demo__section-chip">{section.chip}</span>
                        <div className="doodler-library-demo__section-panel">
                          <div className="doodler-library-demo__section-caption">{section.caption}</div>
                          <div className="doodler-library-demo__section-grid">
                            <span />
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`doodler-library-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          aria-hidden="true"
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path
              d="M1 1l5.2 16.2L8.5 12 14 10.5 1 1z"
              fill="#111"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DoodlerLibraryDemo;

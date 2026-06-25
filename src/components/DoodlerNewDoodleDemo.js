import React, { useEffect, useRef, useState } from 'react';
import './DoodlerNewDoodleDemo.css';

const ACTIVITIES = ['Intake', 'Adviesgesprek', 'Behandelplan', 'Psycho-educatie', 'Gespreksverslag'];

const KRACHTEN_ITEMS = [
  {
    chip: 'Goed met taal',
    description: 'Je kunt goed praten en denkt graag diep na over dingen.',
  },
  {
    chip: 'Blijven proberen',
    description: 'Je wilt je taken graag goed uitvoeren.',
  },
  {
    chip: 'Makkelijk praten met anderen',
    description: 'Je kunt makkelijk contact maken met nieuwe mensen.',
  },
  {
    chip: 'Goede band met zus',
    description: 'Met je zus deel je vaak hoe het met je gaat.',
  },
];

const STEPS_ANIMATION = [
  { frame: 'modal', target: 'phase-dropdown', duration: 800 },
  { frame: 'dropdown-open', target: 'phase-dropdown', duration: 1000 },
  { frame: 'activity-selected', target: 'option-behandelplan', duration: 1400 },
  { frame: 'file-added', target: 'upload', duration: 1600 },
  { frame: 'generating', target: 'generate-btn', duration: 2400 },
  { frame: 'krachten', target: 'krachten-heading', duration: 2000 },
  { frame: 'idle', target: null, duration: 1000 },
];

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DocIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 2h4l3 3v9a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8l3 3 6-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DoodlerNewDoodleDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS_ANIMATION[stepIndex];
  const showKrachten = step.frame === 'krachten' || (step.frame === 'idle' && stepIndex === STEPS_ANIMATION.length - 1);
  const dropdownOpen = ['dropdown-open', 'activity-selected', 'file-added', 'generating'].includes(step.frame)
    || (step.frame === 'krachten');
  const selectedActivity = ['activity-selected', 'file-added', 'generating', 'krachten'].includes(step.frame)
    || step.frame === 'idle';
  const hasFile = ['file-added', 'generating', 'krachten'].includes(step.frame) || step.frame === 'idle';
  const isGenerating = step.frame === 'generating';

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
      if (!container || !step.target) {
        setCursor((prev) => ({ ...prev, visible: step.frame !== 'idle' && step.frame !== 'krachten' }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target) {
        setCursor((prev) => ({ ...prev, visible: true }));
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
      setStepIndex((current) => (current + 1) % STEPS_ANIMATION.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`doodler-new-doodle-demo ${className}`.trim()} style={style}>
      <div className="doodler-new-doodle-demo__window" ref={containerRef}>
        <div className="doodler-new-doodle-demo__browser-bar">
          <span className="doodler-new-doodle-demo__dot doodler-new-doodle-demo__dot--red" />
          <span className="doodler-new-doodle-demo__dot doodler-new-doodle-demo__dot--yellow" />
          <span className="doodler-new-doodle-demo__dot doodler-new-doodle-demo__dot--green" />
          <span className="doodler-new-doodle-demo__url">doodler.app/mvp</span>
        </div>

        <div className={`doodler-new-doodle-demo__content ${showKrachten ? 'is-flow' : 'is-modal'}`}>
          {!showKrachten ? (
            <div className="doodler-new-doodle-demo__modal-scene">
              <div className="doodler-new-doodle-demo__modal">
                <div className="doodler-new-doodle-demo__modal-header">
                  <h3>Nieuw contactmoment toevoegen</h3>
                  <button type="button" aria-label="Close" className="doodler-new-doodle-demo__close">×</button>
                </div>

                <div className="doodler-new-doodle-demo__field">
                  <label>Selecteer de fase van het zorgtraject</label>
                  <div className="doodler-new-doodle-demo__dropdown-wrap">
                    <div
                      ref={setTargetRef('phase-dropdown')}
                      className={`doodler-new-doodle-demo__dropdown ${dropdownOpen && !selectedActivity ? 'is-open' : ''}`}
                    >
                      <span>{selectedActivity ? 'Behandelplan' : 'Kies een contactmoment'}</span>
                      <ChevronDown />
                    </div>
                    {dropdownOpen && !selectedActivity && (
                      <div className="doodler-new-doodle-demo__menu">
                        {ACTIVITIES.map((name) => (
                          <button
                            key={name}
                            type="button"
                            ref={name === 'Behandelplan' ? setTargetRef('option-behandelplan') : undefined}
                            className={name === 'Behandelplan' ? 'is-highlighted' : ''}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="doodler-new-doodle-demo__field">
                  <label>Bestand toevoegen</label>
                  {hasFile ? (
                    <div className="doodler-new-doodle-demo__file">
                      <DocIcon />
                      <span>bestand_voorbeeld</span>
                    </div>
                  ) : (
                    <div ref={setTargetRef('upload')} className="doodler-new-doodle-demo__upload">
                      <PlusIcon />
                      <span>Bestand toevoegen</span>
                    </div>
                  )}
                </div>

                <div className="doodler-new-doodle-demo__actions">
                  <button type="button" className="doodler-new-doodle-demo__btn doodler-new-doodle-demo__btn--outline">
                    Annuleren
                  </button>
                  <button
                    ref={setTargetRef('generate-btn')}
                    type="button"
                    className={`doodler-new-doodle-demo__btn doodler-new-doodle-demo__btn--primary ${isGenerating ? 'is-loading' : ''}`}
                  >
                    <CheckIcon />
                    {isGenerating ? 'Genereren...' : 'Doodles genereren'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="doodler-new-doodle-demo__flow">
              <div className="doodler-new-doodle-demo__flow-header">
                <div className="doodler-new-doodle-demo__flow-nav">
                  <span className="doodler-new-doodle-demo__back" aria-hidden="true">←</span>
                  <span className="doodler-new-doodle-demo__logo">doodler</span>
                </div>
              </div>

              <div className="doodler-new-doodle-demo__flow-screen">
                <div className="doodler-new-doodle-demo__flow-copy">
                  <h3 ref={setTargetRef('krachten-heading')}>Krachten</h3>
                  <p>Dit zijn de krachten die je bij je cliënt ziet.</p>
                </div>

                <div className="doodler-new-doodle-demo__flow-layout">
                  <div className="doodler-new-doodle-demo__display-panel">
                    <div className="doodler-new-doodle-demo__display-caption">Dit gaat er goed...</div>
                    <div className="doodler-new-doodle-demo__display-grid">
                      {KRACHTEN_ITEMS.map((item) => (
                        <div key={item.chip} className="doodler-new-doodle-demo__display-tile">
                          <div className="doodler-new-doodle-demo__display-art" aria-hidden="true" />
                          <strong>{item.chip}</strong>
                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="doodler-new-doodle-demo__edit-cards">
                    {KRACHTEN_ITEMS.map((item) => (
                      <div key={`${item.chip}-edit`} className="doodler-new-doodle-demo__edit-card">
                        <span className="doodler-new-doodle-demo__edit-chip">{item.chip}</span>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="doodler-new-doodle-demo__flow-actions">
                  <button type="button" className="doodler-new-doodle-demo__btn doodler-new-doodle-demo__btn--outline">
                    Doodles e-mailen
                  </button>
                  <button type="button" className="doodler-new-doodle-demo__btn doodler-new-doodle-demo__btn--primary">
                    Doodles afdrukken
                  </button>
                </div>
              </div>
            </div>
          )}

          <div
            className={`doodler-new-doodle-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
            style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
            aria-hidden="true"
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path
                d="M1 1l4.2 16.2L7.5 11 14 9.5 1 1z"
                fill="#111"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoodlerNewDoodleDemo;

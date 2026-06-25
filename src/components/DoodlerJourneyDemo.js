import React, { useEffect, useRef, useState } from 'react';
import './DoodlerJourneyDemo.css';

const STAGES = ['Krachten', 'Klachten', 'Inzichten', 'Aanpak'];

const STAGE_META = [
  { subtitle: 'Dit zijn de krachten die je bij je cliënt ziet.', caption: 'Dit gaat er goed...' },
  { subtitle: 'Dit zijn de klachten die je bij je cliënt ziet.', caption: 'Dit speelt mee...' },
  { subtitle: 'Dit zijn de inzichten over je cliënt.', caption: 'Dit viel op...' },
  { subtitle: 'Dit is de aanpak die je voorstelt aan je cliënt.', caption: 'Dit gaan we doen...' },
];

const TILE_ITEMS = [
  { chip: 'Goed met taal', description: 'Je kunt goed praten en denkt graag diep na over dingen.' },
  { chip: 'Blijven proberen', description: 'Je wilt je taken graag goed uitvoeren.' },
  { chip: 'Makkelijk praten met anderen', description: 'Je kunt makkelijk contact maken met nieuwe mensen.' },
  { chip: 'Goede band met zus', description: 'Met je zus deel je vaak hoe het met je gaat.' },
];

const SUMMARY_SECTIONS = STAGES.map((stage, index) => ({
  chip: stage,
  caption: STAGE_META[index].caption,
}));

const STEPS_ANIMATION = [
  { scene: 'stage', stage: 0, target: 'heading', duration: 2000 },
  { scene: 'stage', stage: 0, target: 'next-btn', duration: 1400 },
  { scene: 'stage', stage: 1, target: 'heading', duration: 1800 },
  { scene: 'stage', stage: 1, target: 'next-btn', duration: 1400 },
  { scene: 'stage', stage: 2, target: 'heading', duration: 1800 },
  { scene: 'stage', stage: 2, target: 'next-btn', duration: 1400 },
  { scene: 'stage', stage: 3, target: 'heading', duration: 1800 },
  { scene: 'stage', stage: 3, target: 'summary-btn', duration: 1400 },
  { scene: 'summary', target: 'summary-heading', duration: 2000 },
  { scene: 'summary', target: 'summary-0', duration: 1800 },
  { scene: 'summary', target: 'summary-1', duration: 1600 },
  { scene: 'summary', target: 'summary-2', duration: 1600 },
  { scene: 'summary', target: 'summary-3', duration: 1600 },
  { scene: 'idle', duration: 1000 },
];

const DoodlerJourneyDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS_ANIMATION[stepIndex];
  const isSummary = step.scene === 'summary' || step.scene === 'idle';
  const stageIndex = step.scene === 'stage' ? step.stage : 3;
  const stageMeta = STAGE_META[stageIndex] || STAGE_META[0];
  const progress = isSummary ? 100 : ((stageIndex + 1) / STAGES.length) * 100;
  const highlightedSummary =
    step.scene === 'summary' && step.target?.startsWith('summary-')
      ? Number(step.target.split('-')[1])
      : null;

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
        setCursor((prev) => ({ ...prev, visible: step.scene !== 'idle' }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target) {
        setCursor((prev) => ({ ...prev, visible: step.scene !== 'idle' }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setCursor({
        x: targetRect.left - containerRect.left + targetRect.width * 0.55,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: step.scene !== 'idle',
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
    <div className={`doodler-journey-demo ${className}`.trim()} style={style}>
      <div className="doodler-journey-demo__window" ref={containerRef}>
        <div className="doodler-journey-demo__browser-bar">
          <span className="doodler-journey-demo__dot doodler-journey-demo__dot--red" />
          <span className="doodler-journey-demo__dot doodler-journey-demo__dot--yellow" />
          <span className="doodler-journey-demo__dot doodler-journey-demo__dot--green" />
          <span className="doodler-journey-demo__url">doodler.app/behandelplan</span>
        </div>

        <div className="doodler-journey-demo__content">
          <div className="doodler-journey-demo__flow">
            <div className="doodler-journey-demo__flow-header">
              <div className="doodler-journey-demo__flow-nav">
                <span className="doodler-journey-demo__back" aria-hidden="true">←</span>
                <span className="doodler-journey-demo__logo">doodler</span>
              </div>
            </div>

            <div className="doodler-journey-demo__flow-screen">
              <div className="doodler-journey-demo__stepper">
                <div className="doodler-journey-demo__stepper-nav">
                  {isSummary ? (
                    <span className="doodler-journey-demo__step is-summary">Reviewen</span>
                  ) : (
                    STAGES.map((label, index) => (
                      <span
                        key={label}
                        className={`doodler-journey-demo__step ${index === stageIndex ? 'is-active' : ''}`}
                      >
                        {label}
                      </span>
                    ))
                  )}
                </div>
                <div className="doodler-journey-demo__progress">
                  <div className="doodler-journey-demo__progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {!isSummary ? (
                <>
                  <div className="doodler-journey-demo__flow-copy">
                    <h3 ref={setTargetRef('heading')}>{STAGES[stageIndex]}</h3>
                    <p>{stageMeta.subtitle}</p>
                  </div>

                  <div className="doodler-journey-demo__flow-layout">
                    <div className="doodler-journey-demo__display-panel">
                      <div className="doodler-journey-demo__display-caption">{stageMeta.caption}</div>
                      <div className="doodler-journey-demo__display-grid">
                        {TILE_ITEMS.map((item) => (
                          <div key={item.chip} className="doodler-journey-demo__display-tile">
                            <div className="doodler-journey-demo__display-art" aria-hidden="true" />
                            <strong>{item.chip}</strong>
                            <p>{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="doodler-journey-demo__edit-cards">
                      {TILE_ITEMS.map((item) => (
                        <div key={`${item.chip}-edit`} className="doodler-journey-demo__edit-card">
                          <span className="doodler-journey-demo__edit-chip">{item.chip}</span>
                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="doodler-journey-demo__flow-actions">
                    {stageIndex < 3 ? (
                      <button
                        ref={setTargetRef('next-btn')}
                        type="button"
                        className={`doodler-journey-demo__btn doodler-journey-demo__btn--primary ${
                          step.target === 'next-btn' ? 'is-highlighted' : ''
                        }`}
                      >
                        Volgende sectie
                      </button>
                    ) : (
                      <button
                        ref={setTargetRef('summary-btn')}
                        type="button"
                        className={`doodler-journey-demo__btn doodler-journey-demo__btn--primary ${
                          step.target === 'summary-btn' ? 'is-highlighted' : ''
                        }`}
                      >
                        Ga naar samenvatting
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="doodler-journey-demo__flow-copy">
                    <h3 ref={setTargetRef('summary-heading')}>Bekijk de doodles</h3>
                    <p>Alle onderdelen van het zorgtraject in één overzicht.</p>
                  </div>

                  <div className="doodler-journey-demo__summary">
                    {SUMMARY_SECTIONS.map((section, index) => (
                      <div
                        key={section.chip}
                        ref={setTargetRef(`summary-${index}`)}
                        className={`doodler-journey-demo__summary-section ${
                          highlightedSummary === index ? 'is-highlighted' : ''
                        }`}
                      >
                        <span className="doodler-journey-demo__summary-chip">{section.chip}</span>
                        <div className="doodler-journey-demo__summary-panel">
                          <div className="doodler-journey-demo__summary-caption">{section.caption}</div>
                          <div className="doodler-journey-demo__summary-grid">
                            {[0, 1, 2, 3].map((tile) => (
                              <div key={tile} className="doodler-journey-demo__summary-tile" aria-hidden="true" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className={`doodler-journey-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default DoodlerJourneyDemo;

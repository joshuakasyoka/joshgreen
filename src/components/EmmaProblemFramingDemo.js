import React, { useEffect, useRef, useState } from 'react';
import {
  EMMA_FRAMING_NOTES,
  EMMA_FRAMING_THEMES,
} from './emmaResearchDemoData';
import './MoataProcessDemoShared.css';
import './EmmaProblemFramingDemo.css';

const STEPS = [
  { visibleCount: 0, clustered: false, activeTheme: null, subtitle: 'Discovery workshop - Mettle Design Studio and Mott MacDonald', duration: 1400 },
  { visibleCount: 8, clustered: false, activeTheme: null, subtitle: 'Working the interview findings onto the board…', duration: 2200 },
  { visibleCount: 8, clustered: false, activeTheme: null, subtitle: 'Sticky notes from across GIS, land and carbon…', duration: 1600 },
  { visibleCount: 8, clustered: true, activeTheme: null, subtitle: 'Eight notes - three products, one shared question', duration: 2000 },
  { visibleCount: 8, clustered: true, activeTheme: 'gis', subtitle: 'GIS - keep specialist depth, open plain-language queries', duration: 2200 },
  { visibleCount: 8, clustered: true, activeTheme: 'land', subtitle: 'Land - status and constraints without a one-off chatbot', duration: 2200 },
  { visibleCount: 8, clustered: true, activeTheme: 'carbon', subtitle: 'Carbon - everyday language for totals and scenarios', duration: 2200 },
  { visibleCount: 8, clustered: true, activeTheme: 'shared', subtitle: 'Shared strategy - one entry point, product-specific depth', duration: 2200 },
  { visibleCount: 8, clustered: true, activeTheme: 'all', subtitle: 'Prioritised together - challenge separate chatbots, keep what each product needs', duration: 3200 },
];

const EmmaProblemFramingDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];

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

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  const isThemeActive = (theme) => {
    if (!step.activeTheme) return false;
    if (step.activeTheme === 'all') return true;
    return step.activeTheme === theme;
  };

  return (
    <div
      className={`moata-process-demo emma-problem-framing-demo ${className}`.trim()}
      style={style}
    >
      <div className="moata-process-demo__card" ref={containerRef}>
        <div className="moata-process-demo__label">
          <span className="moata-process-demo__label-dot" aria-hidden="true" />
          Design together
        </div>

        <div className="moata-process-demo__body emma-problem-framing-demo__body">
          <p className="emma-problem-framing-demo__subtitle">{step.subtitle}</p>

          <div className="emma-problem-framing-demo__stage">
            <div className="emma-problem-framing-demo__board">
              <span className="emma-problem-framing-demo__board-label">Discovery workshop</span>

              <div className="emma-problem-framing-demo__notes">
              {EMMA_FRAMING_NOTES.map((note, index) => {
                const isVisible = index < step.visibleCount;
                const isHighlighted = isThemeActive(note.theme);
                const useClusteredPosition = step.clustered;

                return (
                  <div
                    key={note.id}
                    className={[
                      'emma-problem-framing-demo__note',
                      isVisible ? 'is-visible' : '',
                      useClusteredPosition ? 'is-clustered' : '',
                      isHighlighted ? 'is-highlighted' : '',
                    ].filter(Boolean).join(' ')}
                    style={{
                      '--note-left': useClusteredPosition ? note.left : note.scatterLeft,
                      '--note-top': useClusteredPosition ? note.top : note.scatterTop,
                      '--note-delay': `${index * 0.07}s`,
                    }}
                  >
                    {note.text}
                  </div>
                );
              })}
              </div>
            </div>

            <div className="emma-problem-framing-demo__legend">
              {Object.entries(EMMA_FRAMING_THEMES).map(([key, theme]) => (
                <span
                  key={key}
                  className={[
                    'emma-problem-framing-demo__legend-item',
                    isThemeActive(key) ? 'is-active' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {theme.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmmaProblemFramingDemo;

import React, { useEffect, useRef, useState } from 'react';
import { EMMA_RESEARCH_FINDINGS } from './emmaResearchDemoData';
import './MoataProcessDemoShared.css';
import './EmmaInsightGraphDemo.css';

const STEPS = [
  { visibleCount: 0, highlightPriority: false, duration: 800 },
  { visibleCount: 1, highlightPriority: false, duration: 450 },
  { visibleCount: 2, highlightPriority: false, duration: 450 },
  { visibleCount: 3, highlightPriority: false, duration: 450 },
  { visibleCount: 4, highlightPriority: false, duration: 450 },
  { visibleCount: 5, highlightPriority: false, duration: 500 },
  { visibleCount: 5, highlightPriority: true, duration: 2200 },
  { visibleCount: 5, highlightPriority: true, showNote: true, duration: 1200 },
];

const EmmaInsightGraphDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const maxValue = EMMA_RESEARCH_FINDINGS[0].value;

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

  return (
    <div
      className={`moata-process-demo emma-insight-graph-demo ${className}`.trim()}
      style={style}
    >
      <div className="moata-process-demo__card" ref={containerRef}>
        <div className="moata-process-demo__label">
          <span className="moata-process-demo__label-dot" aria-hidden="true" />
          Research synthesis
        </div>

        <div className="moata-process-demo__body emma-insight-graph-demo__body">
          <p className="emma-insight-graph-demo__subtitle">
            Barriers to democratising GIS — ranked by interview frequency
          </p>

          <div className="emma-insight-graph-demo__chart" role="img" aria-label="Bar chart of interview findings">
            {EMMA_RESEARCH_FINDINGS.map((finding, index) => {
              const isVisible = index < step.visibleCount;
              const isPriority = step.highlightPriority && finding.priority;
              const width = `${(finding.value / maxValue) * 100}%`;

              return (
                <div
                  key={finding.label}
                  className={[
                    'emma-insight-graph-demo__row',
                    isVisible ? 'is-visible' : '',
                    isPriority ? 'is-priority' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <span className="emma-insight-graph-demo__finding">{finding.label}</span>
                  <div className="emma-insight-graph-demo__bar-group">
                    <span
                      className={[
                        'emma-insight-graph-demo__priority-dot',
                        isPriority ? 'is-visible' : '',
                      ].filter(Boolean).join(' ')}
                      aria-hidden="true"
                    />
                    <div className="emma-insight-graph-demo__track">
                      <span
                        className="emma-insight-graph-demo__bar"
                        style={{ width: isVisible ? width : '0%' }}
                      />
                    </div>
                  </div>
                  <span className="emma-insight-graph-demo__value">{finding.value}%</span>
                </div>
              );
            })}
          </div>

          <p
            className={[
              'emma-insight-graph-demo__note',
              step.showNote ? 'is-visible' : '',
            ].filter(Boolean).join(' ')}
          >
            Natural language became the bridge — specialists keep SQL depth, project admins get plain-language layers and map views.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmmaInsightGraphDemo;

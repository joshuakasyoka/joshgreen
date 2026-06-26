import React, { useEffect, useRef, useState } from 'react';
import { RESEARCH_FINDINGS } from './moataResearchDemoData';
import './MoataProcessDemoShared.css';
import './MoataInsightGraphDemo.css';

const STEPS = [
  { visibleCount: 0, highlightPriority: false, duration: 800 },
  { visibleCount: 1, highlightPriority: false, duration: 450 },
  { visibleCount: 2, highlightPriority: false, duration: 450 },
  { visibleCount: 3, highlightPriority: false, duration: 450 },
  { visibleCount: 4, highlightPriority: false, duration: 450 },
  { visibleCount: 5, highlightPriority: false, duration: 500 },
  { visibleCount: 5, highlightPriority: true, duration: 2200 },
  { phase: 'idle', visibleCount: 5, highlightPriority: true, duration: 1200 },
];

const MoataInsightGraphDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const maxValue = RESEARCH_FINDINGS[0].value;

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
    <div className={`moata-insight-graph-demo moata-process-demo ${className}`.trim()} style={style}>
      <div className="moata-process-demo__card" ref={containerRef}>
        <div className="moata-process-demo__label">
          <span className="moata-process-demo__label-dot" />
          Research synthesis
        </div>

        <div className="moata-process-demo__body moata-insight-graph-demo__body">
          <p className="moata-insight-graph-demo__subtitle">
            Collaboration blockers ranked across user interviews
          </p>

          <div className="moata-insight-graph-demo__chart" role="img" aria-label="Bar chart of interview findings">
            {RESEARCH_FINDINGS.map((finding, index) => {
              const isVisible = index < step.visibleCount;
              const isPriority = step.highlightPriority && finding.priority;
              const width = `${(finding.value / maxValue) * 100}%`;

              return (
                <div
                  key={finding.id}
                  className={[
                    'moata-insight-graph-demo__row',
                    isVisible ? 'is-visible' : '',
                    isPriority ? 'is-priority' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <span className="moata-insight-graph-demo__label">{finding.label}</span>
                  <div className="moata-insight-graph-demo__bar-group">
                    <span
                      className={[
                        'moata-insight-graph-demo__priority-dot',
                        isPriority ? 'is-visible' : '',
                      ].filter(Boolean).join(' ')}
                      aria-hidden="true"
                    />
                    <div className="moata-insight-graph-demo__track">
                      <span
                        className="moata-insight-graph-demo__bar"
                        style={{ width: isVisible ? width : '0%' }}
                      />
                    </div>
                  </div>
                  <span className="moata-insight-graph-demo__value">{finding.value}%</span>
                </div>
              );
            })}
          </div>

          <p
            className={[
              'moata-insight-graph-demo__note',
              step.highlightPriority ? 'is-visible' : '',
            ].filter(Boolean).join(' ')}
          >
            Isolated project spaces had to ship before thread metadata or 3D parity could matter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoataInsightGraphDemo;

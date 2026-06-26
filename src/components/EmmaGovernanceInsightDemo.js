import React, { useEffect, useRef, useState } from 'react';
import { EMMA_GOVERNANCE_QUOTE } from './emmaResearchDemoData';
import './MoataProcessDemoShared.css';
import './EmmaGovernanceInsightDemo.css';

const STEPS = [
  { phase: 'quote', highlight: false, subtitle: 'Programme interviews — trust and control', duration: 1500 },
  { phase: 'quote', highlight: true, subtitle: 'Programme interviews — trust and control', duration: 2800 },
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderLineText = (text, insights, showInsights) => {
  if (!showInsights || !insights?.length) return text;

  const pattern = new RegExp(`(${insights.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isInsight = insights.some(
      (phrase) => part.toLowerCase() === phrase.toLowerCase()
    );
    if (!isInsight) return part;
    return (
      <span key={`${part}-${index}`} className="emma-governance-insight-demo__insight">
        {part}
      </span>
    );
  });
};

const EmmaGovernanceInsightDemo = ({ className = '', style }) => {
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

  return (
    <div
      className={`moata-process-demo emma-governance-insight-demo ${className}`.trim()}
      style={style}
    >
      <div className="moata-process-demo__card" ref={containerRef}>
        <div className="moata-process-demo__label">
          <span className="moata-process-demo__label-dot" aria-hidden="true" />
          Trust & Control
        </div>

        <div className="moata-process-demo__body emma-governance-insight-demo__body">
          <p className="emma-governance-insight-demo__subtitle">{step.subtitle}</p>

          <div className="emma-governance-insight-demo__stage">
            <article className="emma-governance-insight-demo__quote is-visible">
              <span className="emma-governance-insight-demo__speaker">{EMMA_GOVERNANCE_QUOTE.speaker}</span>
              <p className="emma-governance-insight-demo__quote-text">
                {renderLineText(
                  EMMA_GOVERNANCE_QUOTE.text,
                  EMMA_GOVERNANCE_QUOTE.insights,
                  step.highlight
                )}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmmaGovernanceInsightDemo;

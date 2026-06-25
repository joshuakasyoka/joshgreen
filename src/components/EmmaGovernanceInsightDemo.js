import React, { useEffect, useRef, useState } from 'react';
import {
  EMMA_GOVERNANCE_QUOTE,
  EMMA_GOVERNANCE_RISK_LAYERS,
} from './emmaResearchDemoData';
import './MoataProcessDemoShared.css';
import './EmmaGovernanceInsightDemo.css';

const STEPS = [
  { phase: 'quote', highlight: false, subtitle: 'Programme interviews — trust and control', duration: 1500 },
  { phase: 'quote', highlight: true, subtitle: 'Programme interviews — trust and control', duration: 2800 },
  { phase: 'risk', riskPulse: false, checkedCount: 0, subtitle: 'The fear — natural language taking full control', duration: 1200 },
  { phase: 'risk', riskPulse: false, checkedCount: 1, subtitle: 'The fear — natural language taking full control', duration: 700 },
  { phase: 'risk', riskPulse: false, checkedCount: 2, subtitle: 'The fear — natural language taking full control', duration: 700 },
  { phase: 'risk', riskPulse: true, checkedCount: 3, subtitle: 'Layers changing on the shared map — without consent', duration: 3200 },
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
  const showQuote = step.phase === 'quote';
  const showRisk = step.phase === 'risk';

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
          Design insight
        </div>

        <div className="moata-process-demo__body emma-governance-insight-demo__body">
          <p className="emma-governance-insight-demo__subtitle">{step.subtitle}</p>

          <div className="emma-governance-insight-demo__stage">
            <article
              className={[
                'emma-governance-insight-demo__quote',
                showQuote ? 'is-visible' : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="emma-governance-insight-demo__speaker">{EMMA_GOVERNANCE_QUOTE.speaker}</span>
              <p className="emma-governance-insight-demo__quote-text">
                {renderLineText(
                  EMMA_GOVERNANCE_QUOTE.text,
                  EMMA_GOVERNANCE_QUOTE.insights,
                  showQuote && step.highlight
                )}
              </p>
            </article>

            <div
              className={[
                'emma-governance-insight-demo__risk',
                showRisk ? 'is-visible' : '',
                step.riskPulse ? 'is-pulse' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="emma-governance-insight-demo__risk-map">
                <span className="emma-governance-insight-demo__risk-map-label">Shared programme map</span>
                {step.riskPulse && (
                  <span className="emma-governance-insight-demo__risk-badge">Acting without consent</span>
                )}
              </div>

              <div className="emma-governance-insight-demo__risk-chat">
                <span className="emma-governance-insight-demo__risk-chat-label">EMMA</span>
                <p className="emma-governance-insight-demo__risk-chat-text">
                  Adding Transport Network to the layer tree…
                </p>
                <ul className="emma-governance-insight-demo__risk-layers">
                  {EMMA_GOVERNANCE_RISK_LAYERS.map((layer, index) => {
                    const isChecked = index < (step.checkedCount || 0);
                    return (
                      <li
                        key={layer.name}
                        className={[
                          'emma-governance-insight-demo__risk-layer',
                          isChecked ? 'is-checked' : '',
                          isChecked && step.riskPulse ? 'is-alert' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        <span className="emma-governance-insight-demo__risk-layer-check" aria-hidden="true" />
                        <span>{layer.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmmaGovernanceInsightDemo;

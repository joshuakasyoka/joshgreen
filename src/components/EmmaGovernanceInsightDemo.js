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
  { phase: 'risk', beat: 'idle', checkedCount: 0, mapLayers: 0, subtitle: 'The fear — natural language taking full control', duration: 1000 },
  { phase: 'risk', beat: 'command', checkedCount: 0, mapLayers: 0, subtitle: 'The fear — natural language taking full control', duration: 1400 },
  { phase: 'risk', beat: 'bypass', checkedCount: 0, mapLayers: 0, subtitle: 'No Allow step — EMMA acts immediately', duration: 1800 },
  { phase: 'risk', beat: 'changing', checkedCount: 1, mapLayers: 1, subtitle: 'Layers changing on the shared map…', duration: 750 },
  { phase: 'risk', beat: 'changing', checkedCount: 2, mapLayers: 2, subtitle: 'Layers changing on the shared map…', duration: 750 },
  { phase: 'risk', beat: 'alert', checkedCount: 3, mapLayers: 3, subtitle: 'Everyone on the programme sees the change — without consent', duration: 3600 },
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

const MapLayers = ({ visibleCount }) => (
  <svg
    className="emma-governance-insight-demo__map-svg"
    viewBox="0 0 320 200"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <path
      className={`emma-governance-insight-demo__map-layer emma-governance-insight-demo__map-layer--road ${visibleCount >= 1 ? 'is-visible' : ''}`}
      d="M24 148 C 58 132, 72 108, 96 96 S 148 72, 188 68 S 252 58, 296 44"
    />
    <path
      className={`emma-governance-insight-demo__map-layer emma-governance-insight-demo__map-layer--road ${visibleCount >= 1 ? 'is-visible' : ''}`}
      d="M36 168 C 88 152, 120 128, 168 118 S 228 100, 288 88"
    />
    <path
      className={`emma-governance-insight-demo__map-layer emma-governance-insight-demo__map-layer--rail ${visibleCount >= 2 ? 'is-visible' : ''}`}
      d="M40 56 L 108 72 L 168 84 L 248 96 L 296 108"
    />
    <path
      className={`emma-governance-insight-demo__map-layer emma-governance-insight-demo__map-layer--rail ${visibleCount >= 2 ? 'is-visible' : ''}`}
      d="M52 176 L 124 160 L 196 148 L 268 132"
    />
    <rect
      className={`emma-governance-insight-demo__map-layer emma-governance-insight-demo__map-layer--group ${visibleCount >= 3 ? 'is-visible' : ''}`}
      x="108"
      y="88"
      width="132"
      height="72"
      rx="6"
    />
  </svg>
);

const EmmaGovernanceInsightDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const showQuote = step.phase === 'quote';
  const showRisk = step.phase === 'risk';
  const showCommand = ['command', 'bypass', 'changing', 'alert'].includes(step.beat);
  const showBypass = ['bypass', 'changing', 'alert'].includes(step.beat);
  const showAlert = step.beat === 'alert';

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
                showAlert ? 'is-alert' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="emma-governance-insight-demo__risk-map">
                <span className="emma-governance-insight-demo__risk-map-label">Shared programme map</span>
                <MapLayers visibleCount={step.mapLayers || 0} />
                <span
                  className={[
                    'emma-governance-insight-demo__risk-viewers',
                    (step.mapLayers || 0) > 0 ? 'is-visible' : '',
                  ].filter(Boolean).join(' ')}
                >
                  12 programme members viewing
                </span>
                {showAlert && (
                  <span className="emma-governance-insight-demo__risk-badge">Changed without consent</span>
                )}
              </div>

              <div className="emma-governance-insight-demo__risk-chat">
                <span className="emma-governance-insight-demo__risk-chat-label">EMMA</span>

                <p
                  className={[
                    'emma-governance-insight-demo__risk-user-prompt',
                    showCommand ? 'is-visible' : '',
                  ].filter(Boolean).join(' ')}
                >
                  Add transport layers for corridor assessment
                </p>

                <p
                  className={[
                    'emma-governance-insight-demo__risk-chat-text',
                    showCommand ? 'is-visible' : '',
                  ].filter(Boolean).join(' ')}
                >
                  Adding Transport Network to the layer tree…
                </p>

                <div
                  className={[
                    'emma-governance-insight-demo__risk-skipped',
                    showBypass ? 'is-visible' : '',
                    showAlert ? 'is-bypassed' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <span className="emma-governance-insight-demo__risk-skipped-label">Expected permission step</span>
                  <div className="emma-governance-insight-demo__risk-skipped-card">
                    <strong>Add Transport Network to layer tree</strong>
                    <code>$ addLayerGroup(&quot;Transport Network&quot;)</code>
                    <div className="emma-governance-insight-demo__risk-skipped-actions">
                      <span>Deny</span>
                      <span>Allow</span>
                    </div>
                  </div>
                  <span className="emma-governance-insight-demo__risk-skipped-stamp">Bypassed</span>
                </div>

                <ul className="emma-governance-insight-demo__risk-layers">
                  {EMMA_GOVERNANCE_RISK_LAYERS.map((layer, index) => {
                    const isChecked = index < (step.checkedCount || 0);
                    return (
                      <li
                        key={layer.name}
                        className={[
                          'emma-governance-insight-demo__risk-layer',
                          isChecked ? 'is-checked' : '',
                          isChecked && showAlert ? 'is-alert' : '',
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

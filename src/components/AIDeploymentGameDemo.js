import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  DEMO_METRICS,
  DEMO_PLAYER,
  DEMO_QUESTIONS,
} from './aiDeploymentGameDemoData';
import './AIDeploymentGameDemo.css';

const STEPS = [
  {
    phase: 'game',
    questionIndex: 0,
    character: 'middle',
    hurdle: 78,
    choices: [],
    target: 'question',
    duration: 1400,
  },
  {
    phase: 'game',
    questionIndex: 0,
    character: 'middle',
    hurdle: 52,
    choices: [],
    target: 'up-btn',
    duration: 1200,
  },
  {
    phase: 'game',
    questionIndex: 0,
    character: 'up',
    hurdle: 28,
    choices: [0],
    target: 'up-btn',
    duration: 1000,
  },
  {
    phase: 'game',
    questionIndex: 1,
    character: 'middle',
    hurdle: 80,
    choices: [0],
    target: 'question',
    duration: 1300,
  },
  {
    phase: 'game',
    questionIndex: 1,
    character: 'middle',
    hurdle: 50,
    choices: [0],
    target: 'down-btn',
    duration: 1200,
  },
  {
    phase: 'game',
    questionIndex: 1,
    character: 'down',
    hurdle: 24,
    choices: [0, 1],
    target: 'down-btn',
    duration: 1000,
  },
  {
    phase: 'game',
    questionIndex: 2,
    character: 'middle',
    hurdle: 76,
    choices: [0, 1],
    target: 'up-btn',
    duration: 1200,
  },
  {
    phase: 'game',
    questionIndex: 2,
    character: 'up',
    hurdle: 30,
    choices: [0, 1, 2],
    target: 'up-btn',
    duration: 1000,
  },
  {
    phase: 'results',
    questionIndex: 2,
    character: 'middle',
    hurdle: 0,
    choices: [0, 1, 2],
    target: 'results',
    duration: 3200,
  },
  { phase: 'idle', target: 'idle', duration: 1000 },
];

const INK = '#1a1a1a';

const ChevronUp = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 4l5 6H4l5-6z" fill="currentColor" />
  </svg>
);

const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 14l5-6H4l5 6z" fill="currentColor" />
  </svg>
);

const RadarChart = ({ metrics }) => {
  const size = 168;
  const center = size / 2;
  const radius = size * 0.38;
  const maxValue = Math.max(...Object.values(metrics).map((v) => Math.abs(v)), 1);

  const points = [
    { metric: 'efficiency', angle: -90 },
    { metric: 'cost', angle: -18 },
    { metric: 'innovation', angle: 54 },
    { metric: 'humanity', angle: 126 },
    { metric: 'ethics', angle: 198 },
  ].map((point) => {
    const value = ((metrics[point.metric] / maxValue) * 50) + 50;
    const rad = (point.angle * Math.PI) / 180;
    const dist = (value / 100) * radius;
    return {
      ...point,
      x: center + dist * Math.cos(rad),
      y: center + dist * Math.sin(rad),
    };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');
  const dominant = Object.entries(metrics).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="adg-demo__results">
      <h3 className="adg-demo__results-title">Your AI implementation priorities</h3>
      <p className="adg-demo__results-lead">
        Your approach prioritises <strong>{dominant}</strong>
      </p>
      <div className="adg-demo__radar">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
            <circle
              key={scale}
              cx={center}
              cy={center}
              r={radius * scale}
              fill="none"
              stroke={INK}
              strokeWidth="1"
              opacity="0.35"
            />
          ))}
          {points.map((point) => {
            const rad = (point.angle * Math.PI) / 180;
            return (
              <line
                key={point.metric}
                x1={center}
                y1={center}
                x2={center + radius * Math.cos(rad)}
                y2={center + radius * Math.sin(rad)}
                stroke={INK}
                strokeWidth="1"
                opacity="0.35"
              />
            );
          })}
          <polygon points={polygon} fill="rgba(26, 26, 26, 0.08)" stroke={INK} strokeWidth="1.5" />
          {points.map((point) => (
            <circle key={point.metric} cx={point.x} cy={point.y} r="3" fill={INK} />
          ))}
          <text x={center} y={center - radius - 8} textAnchor="middle" fontSize="8" fill={INK}>
            EFFICIENCY
          </text>
        </svg>
      </div>
      <div className="adg-demo__metrics">
        {Object.entries(metrics).map(([metric, value]) => (
          <div key={metric}>
            <span>{metric}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIDeploymentGameDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const isResults = step.phase === 'results';
  const question = DEMO_QUESTIONS[step.questionIndex] || DEMO_QUESTIONS[0];
  const characterTop =
    step.character === 'up' ? '25%' : step.character === 'down' ? '75%' : '50%';

  const visibleChoices = useMemo(
    () => DEMO_QUESTIONS.filter((_, index) => step.choices?.includes(index)),
    [step.choices]
  );

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
      if (!container || isIdle) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target) {
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
    window.addEventListener('resize', updateCursor);
    return () => window.removeEventListener('resize', updateCursor);
  }, [step, running, isIdle]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`adg-demo ${className}`.trim()} style={style}>
      <div className="adg-demo__window" ref={containerRef}>
        <div className="adg-demo__browser-bar">
          <span className="adg-demo__dot adg-demo__dot--red" />
          <span className="adg-demo__dot adg-demo__dot--yellow" />
          <span className="adg-demo__dot adg-demo__dot--green" />
          <span className="adg-demo__url">ai-deployment-game.vercel.app</span>
        </div>

        <div className="adg-demo__content">
          <header className="adg-demo__header">
            <h2 className="adg-demo__title">Deployment &amp; integration</h2>
            <p className="adg-demo__subtitle">
              Understand the consequences of deployment of AI systems
            </p>
          </header>

          <div className="adg-demo__stage">
          {isResults ? (
            <div ref={setTargetRef('results')}>
              <RadarChart metrics={DEMO_METRICS} />
            </div>
          ) : (
            <>
              <div className="adg-demo__question-bar" ref={setTargetRef('question')}>
                <p className="adg-demo__question-meta">
                  Question {step.questionIndex + 1} of {DEMO_QUESTIONS.length}
                </p>
                <p className="adg-demo__question-text">{question.question}</p>
              </div>

              <div className="adg-demo__layout">
                <div className="adg-demo__game-panel">
                  <p className="adg-demo__panel-label">Game area</p>
                  <div className="adg-demo__game-meta">
                    <span>
                      {DEMO_PLAYER.name}: {DEMO_PLAYER.job}
                    </span>
                    <span>
                      Q: {visibleChoices.length} / {DEMO_QUESTIONS.length}
                    </span>
                  </div>

                  <div className="adg-demo__arena">
                    <div className="adg-demo__lane adg-demo__lane--yes">Yes</div>
                    <div className="adg-demo__lane adg-demo__lane--no">No</div>

                    <div
                      className="adg-demo__character"
                      style={{ top: characterTop }}
                    >
                      <div className="adg-demo__pixel-head" />
                      <div className="adg-demo__pixel-body">
                        <span />
                        <span />
                      </div>
                      <div className="adg-demo__pixel-arms">
                        <span />
                        <span />
                      </div>
                      <div className="adg-demo__pixel-legs">
                        <span />
                        <span />
                      </div>
                    </div>

                    {step.hurdle > 0 && (
                      <div className="adg-demo__hurdle" style={{ left: `${step.hurdle}%` }}>
                        <div className="adg-demo__hurdle-top">
                          <span />
                          <span />
                        </div>
                        <div className="adg-demo__hurdle-bottom">
                          <span />
                          <span />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="adg-demo__controls">
                    <button
                      ref={setTargetRef('up-btn')}
                      type="button"
                      className={[
                        'adg-demo__control-btn',
                        step.target === 'up-btn' ? 'is-hovered' : '',
                        step.character === 'up' ? 'is-active' : '',
                      ].filter(Boolean).join(' ')}
                      aria-label="Answer yes"
                    >
                      <ChevronUp />
                    </button>
                    <button
                      ref={setTargetRef('down-btn')}
                      type="button"
                      className={[
                        'adg-demo__control-btn',
                        step.target === 'down-btn' ? 'is-hovered' : '',
                        step.character === 'down' ? 'is-active' : '',
                      ].filter(Boolean).join(' ')}
                      aria-label="Answer no"
                    >
                      <ChevronDown />
                    </button>
                  </div>
                </div>

                <div className="adg-demo__choices-panel">
                  <p className="adg-demo__panel-label">Choices</p>
                  {visibleChoices.length > 0 ? (
                    visibleChoices.map((choice, index) => (
                      <div key={choice.question} className="adg-demo__choice-row">
                        <span>Q{index + 1}</span>
                        <span className="adg-demo__choice-answer">{choice.answer}</span>
                      </div>
                    ))
                  ) : (
                    <p className="adg-demo__choice-row">Choices will appear here</p>
                  )}
                </div>
              </div>
            </>
          )}
          </div>

          <div
            className={`adg-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
            style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
            aria-hidden="true"
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path
                d="M1 1l4.2 16.2L7.5 11 14 9.5 1 1z"
                fill="#fff"
                stroke={INK}
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

export default AIDeploymentGameDemo;

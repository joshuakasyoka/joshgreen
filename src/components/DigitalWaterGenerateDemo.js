import React, { useEffect, useRef, useState } from 'react';
import DigitalWaterDemoChrome from './DigitalWaterDemoChrome';
import { GENERATE_NAME, GENERATE_PREVIEW } from './digitalWaterDemoData';
import './DigitalWaterDemoShared.css';

const TYPE_OPTIONS = ['Text', 'Image', 'Audio'];

const STEPS = [
  { target: 'name', phase: 'form', name: '', contentType: null, duration: 1000 },
  { target: 'name', phase: 'form', name: 'V', contentType: null, duration: 140 },
  { target: 'name', phase: 'form', name: 'Vi', contentType: null, duration: 130 },
  { target: 'name', phase: 'form', name: 'Vis', contentType: null, duration: 130 },
  { target: 'name', phase: 'form', name: 'Visi', contentType: null, duration: 130 },
  { target: 'name', phase: 'form', name: 'Visit', contentType: null, duration: 130 },
  { target: 'name', phase: 'form', name: 'Visito', contentType: null, duration: 130 },
  { target: 'name', phase: 'form', name: GENERATE_NAME, contentType: null, duration: 900 },
  { target: 'type-text', phase: 'form', name: GENERATE_NAME, contentType: null, duration: 1100 },
  { target: 'type-text', phase: 'form', name: GENERATE_NAME, contentType: 'Text', duration: 1200 },
  { target: 'generate', phase: 'form', name: GENERATE_NAME, contentType: 'Text', duration: 1100 },
  { target: 'generate', phase: 'generating', name: GENERATE_NAME, contentType: 'Text', duration: 1800 },
  { target: 'idle', phase: 'preview', name: GENERATE_NAME, contentType: 'Text', duration: 2200 },
  { target: 'archive', phase: 'preview', name: GENERATE_NAME, contentType: 'Text', duration: 1400 },
  { target: 'idle', phase: 'preview', name: GENERATE_NAME, contentType: 'Text', duration: 1000 },
];

const DigitalWaterGenerateDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const canGenerate = step.name.trim().length > 0 && step.contentType != null;

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

  const renderBody = () => {
    if (step.phase === 'generating') {
      return (
        <div className="dwd-generate__loading">
          <div className="dwd-generate__spinner" aria-hidden="true" />
          <p>Generating water sounds...</p>
        </div>
      );
    }

    if (step.phase === 'preview') {
      return (
        <div className="dwd-generate__preview">
          <div className="dwd-generate__preview-box">
            <p className="dwd-generate__preview-text">{GENERATE_PREVIEW.preview}</p>
            <p className="dwd-generate__preview-author">{GENERATE_PREVIEW.author}</p>
          </div>
          <p className="dwd-generate__meta">
            LIQUID ARTIFACT #{GENERATE_PREVIEW.id} · WATER REQUIRED: {GENERATE_PREVIEW.water}L
          </p>
          <span
            ref={setTargetRef('archive')}
            className={[
              'dwd-generate__archive-btn',
              step.target === 'archive' ? 'is-hovered' : '',
            ].filter(Boolean).join(' ')}
          >
            View Archive
          </span>
        </div>
      );
    }

    return (
      <div className="dwd-generate">
        <div className="dwd-generate__panel">
          <h2 className="dwd-generate__name">{step.name || 'Your Name'}</h2>
          <p className="dwd-generate__label">Choose</p>
          <input
            ref={setTargetRef('name')}
            className={[
              'dwd-generate__input',
              step.target === 'name' ? 'is-hovered' : '',
            ].filter(Boolean).join(' ')}
            value={step.name}
            readOnly
            aria-label="Enter your name"
            placeholder="Enter your name"
          />
          <div className="dwd-generate__options">
            {TYPE_OPTIONS.map((option) => {
              const key = `type-${option.toLowerCase()}`;
              return (
                <span
                  key={option}
                  ref={setTargetRef(key)}
                  className={[
                    'dwd-generate__option',
                    step.contentType === option ? 'is-selected' : '',
                    step.target === key ? 'is-hovered' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {option}
                </span>
              );
            })}
          </div>
          <span
            ref={setTargetRef('generate')}
            className={[
              'dwd-generate__button',
              canGenerate ? 'is-enabled' : '',
              step.target === 'generate' ? 'is-hovered' : '',
            ].filter(Boolean).join(' ')}
          >
            Generate
          </span>
        </div>
      </div>
    );
  };

  return (
    <DigitalWaterDemoChrome
      containerRef={containerRef}
      cursor={cursor}
      artifactCount={14}
      totalWater={19.1}
      className={className}
      style={style}
    >
      {renderBody()}
    </DigitalWaterDemoChrome>
  );
};

export default DigitalWaterGenerateDemo;

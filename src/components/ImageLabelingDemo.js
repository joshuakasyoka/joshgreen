import React, { useEffect, useRef, useState } from 'react';
import {
  DEMO_VIDEO,
  PREDEFINED_TAGS,
} from './imageLabelingDemoData';
import './ImageLabelingDemo.css';

const STEPS = [
  {
    started: false,
    playing: false,
    selectedTags: [],
    earnings: 0,
    imageCount: 0,
    timer: '0:00',
    target: 'start',
    duration: 1200,
  },
  {
    started: true,
    playing: false,
    selectedTags: [],
    earnings: 0,
    imageCount: 0,
    timer: '0:00',
    target: 'play',
    duration: 1400,
  },
  {
    started: true,
    playing: true,
    selectedTags: [],
    earnings: 0,
    imageCount: 0,
    timer: '0:08',
    target: 'tag-person',
    duration: 1200,
  },
  {
    started: true,
    playing: true,
    selectedTags: ['Person'],
    earnings: 0,
    imageCount: 0,
    timer: '0:14',
    target: 'tag-outdoor',
    duration: 1400,
  },
  {
    started: true,
    playing: true,
    selectedTags: ['Person', 'Outdoor'],
    earnings: 0,
    imageCount: 0,
    timer: '0:19',
    target: 'submit',
    duration: 1200,
  },
  {
    started: true,
    playing: true,
    selectedTags: [],
    earnings: 0.07,
    imageCount: 1,
    timer: '0:24',
    target: 'submit',
    duration: 1800,
  },
  { target: 'idle', duration: 1000 },
];

const ClockIcon = () => (
  <svg className="ilabel-demo__stat-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7 4v3.2l2 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ImageIcon = () => (
  <svg className="ilabel-demo__stat-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1.5" y="2.5" width="11" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="5" cy="6" r="1.2" fill="currentColor" />
    <path d="M1.5 10l3-2.5 2.5 2 2-1.5 3.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const PlayTriangle = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
    <path d="M1 1l12 7-12 7V1z" />
  </svg>
);

const tagKey = (tag) => `tag-${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

const ImageLabelingDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const canSubmit = (step.selectedTags?.length || 0) >= 2;
  const progress = Math.min(((step.imageCount || 0) / 50) * 100, 100);

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
    <div className={`ilabel-demo ${className}`.trim()} style={style}>
      <div className="ilabel-demo__window" ref={containerRef}>
        <div className="ilabel-demo__browser-bar">
          <span className="ilabel-demo__dot ilabel-demo__dot--red" />
          <span className="ilabel-demo__dot ilabel-demo__dot--yellow" />
          <span className="ilabel-demo__dot ilabel-demo__dot--green" />
          <span className="ilabel-demo__url">data-training-beta.vercel.app</span>
        </div>

        <div className="ilabel-demo__content">
          <header className="ilabel-demo__header">
            <h2 className="ilabel-demo__title">Training a model</h2>
            <p className="ilabel-demo__subtitle">
              Training a model based on photos uploaded to YouTube between 2009 – 2012
            </p>
          </header>

          <div className="ilabel-demo__stats">
            <span className="ilabel-demo__stat">
              <span className="ilabel-demo__stat-icon">£</span>
              {(step.earnings ?? 0).toFixed(2)}
            </span>
            <span className="ilabel-demo__stat">
              <ClockIcon />
              {step.timer || '0:00'}
            </span>
            <span className="ilabel-demo__stat">
              <ImageIcon />
              {step.imageCount || 0}/1000
            </span>
          </div>

          <div className="ilabel-demo__progress">
            <div className="ilabel-demo__progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="ilabel-demo__stage">
            {!step.started ? (
              <div className="ilabel-demo__start-wrap">
                <button
                  ref={setTargetRef('start')}
                  type="button"
                  className={[
                    'ilabel-demo__start-btn',
                    step.target === 'start' ? 'is-hovered' : '',
                  ].filter(Boolean).join(' ')}
                >
                  Start labeling
                </button>
              </div>
            ) : (
              <div className="ilabel-demo__labeling">
                <div className="ilabel-demo__video">
                  <div
                    className={[
                      'ilabel-demo__video-frame',
                      step.playing ? 'is-playing' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {!step.playing && (
                      <button
                        ref={setTargetRef('play')}
                        type="button"
                        className={[
                          'ilabel-demo__play-btn',
                          step.target === 'play' ? 'is-hovered' : '',
                        ].filter(Boolean).join(' ')}
                        aria-label="Play video"
                      >
                        <span className="ilabel-demo__play-icon">
                          <PlayTriangle />
                        </span>
                      </button>
                    )}
                    <div className="ilabel-demo__video-caption">
                      <p className="ilabel-demo__video-title">{DEMO_VIDEO.title}</p>
                      <p className="ilabel-demo__video-meta">{DEMO_VIDEO.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="ilabel-demo__controls">
                  <p className="ilabel-demo__hint">Select at least 2 labels</p>

                  <div className="ilabel-demo__tags">
                  {PREDEFINED_TAGS.map((tag) => {
                    const key = tagKey(tag);
                    const isSelected = step.selectedTags?.includes(tag);
                    return (
                      <button
                        key={tag}
                        ref={setTargetRef(key)}
                        type="button"
                        className={[
                          'ilabel-demo__tag',
                          isSelected ? 'is-selected' : '',
                          step.target === key ? 'is-hovered' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                <button
                  ref={setTargetRef('submit')}
                  type="button"
                  className={[
                    'ilabel-demo__submit',
                    canSubmit ? 'is-enabled' : 'is-disabled',
                    step.target === 'submit' && canSubmit ? 'is-hovered' : '',
                  ].filter(Boolean).join(' ')}
                >
                  Submit labels
                </button>
                </div>
              </div>
            )}
          </div>

          <div
            className={`ilabel-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
            style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
            aria-hidden="true"
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path
                d="M1 1l4.2 16.2L7.5 11 14 9.5 1 1z"
                fill="#fff"
                stroke="#1a1a1a"
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

export default ImageLabelingDemo;

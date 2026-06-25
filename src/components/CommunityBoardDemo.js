import React, { useEffect, useRef, useState } from 'react';
import {
  DEMO_COMPLAINTS,
  DEMO_INPUT,
  DEMO_SOLUTION,
} from './communityBoardDemoData';
import './CommunityBoardDemo.css';

const STEPS = [
  { target: 'textarea', view: 'list', inputText: '', showNewComplaint: false, playing: false, duration: 1000 },
  { target: 'textarea', view: 'list', inputText: DEMO_INPUT.slice(0, 42), showNewComplaint: false, playing: false, duration: 900 },
  { target: 'textarea', view: 'list', inputText: DEMO_INPUT, showNewComplaint: false, playing: false, duration: 1200 },
  { target: 'submit', view: 'list', inputText: '', showNewComplaint: true, playing: false, duration: 1400 },
  { target: 'board-view', view: 'list', inputText: '', showNewComplaint: true, playing: false, duration: 1200 },
  { target: 'board-view', view: 'board', inputText: '', showNewComplaint: true, playing: false, duration: 1800 },
  { target: 'play', view: 'board', inputText: '', showNewComplaint: true, playing: false, duration: 1200 },
  { target: 'play', view: 'board', inputText: '', showNewComplaint: true, playing: true, duration: 2200 },
  { target: 'idle', view: 'board', inputText: '', showNewComplaint: true, playing: true, duration: 1000 },
];

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
    <path d="M3 2.5v9l8-4.5-8-4.5z" />
  </svg>
);

const CommunityBoardDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const complaints = step.showNewComplaint
    ? [
        {
          id: 'new',
          text: DEMO_INPUT,
          importance: 7,
        },
        ...DEMO_COMPLAINTS,
      ]
    : DEMO_COMPLAINTS;

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
    <div className={`cboard-demo ${className}`.trim()} style={style}>
      <div className="cboard-demo__window" ref={containerRef}>
        <div className="cboard-demo__browser-bar">
          <span className="cboard-demo__dot cboard-demo__dot--red" />
          <span className="cboard-demo__dot cboard-demo__dot--yellow" />
          <span className="cboard-demo__dot cboard-demo__dot--green" />
          <span className="cboard-demo__url">community-note-board.vercel.app</span>
        </div>

        <div className="cboard-demo__content">
          <header className="cboard-demo__header">
            <div>
              <h2 className="cboard-demo__title">Problem framing</h2>
              <p className="cboard-demo__subtitle">
                How do we define the problems for algorithms to solve?
              </p>
            </div>
            <div className="cboard-demo__view-btns">
              <span
                className={[
                  'cboard-demo__view-btn',
                  step.view === 'list' ? 'is-active' : '',
                ].filter(Boolean).join(' ')}
              >
                List view
              </span>
              <span
                ref={setTargetRef('board-view')}
                className={[
                  'cboard-demo__view-btn',
                  step.view === 'board' ? 'is-active' : '',
                  step.target === 'board-view' ? 'is-hovered' : '',
                ].filter(Boolean).join(' ')}
              >
                Board view
              </span>
            </div>
          </header>

          <div className="cboard-demo__grid">
            <div className="cboard-demo__panel">
              <textarea
                ref={setTargetRef('textarea')}
                className={[
                  'cboard-demo__textarea',
                  step.target === 'textarea' ? 'is-hovered' : '',
                  step.inputText ? 'is-focused' : '',
                ].filter(Boolean).join(' ')}
                value={step.inputText}
                readOnly
                aria-label="Complaint input"
                placeholder="Start typing your problem here..."
              />
              <button
                ref={setTargetRef('submit')}
                type="button"
                className={[
                  'cboard-demo__submit',
                  step.target === 'submit' ? 'is-hovered' : '',
                ].filter(Boolean).join(' ')}
              >
                Submit
              </button>
            </div>

            <div
              className={[
                'cboard-demo__panel',
                step.view === 'board' ? 'cboard-demo__panel--board' : '',
              ].filter(Boolean).join(' ')}
            >
              {step.view === 'list' ? (
                complaints.map((complaint) => (
                  <div key={complaint.id} className="cboard-demo__complaint">
                    <div className="cboard-demo__complaint-row">
                      <p className="cboard-demo__complaint-text">{complaint.text}</p>
                      <span className="cboard-demo__importance">
                        {complaint.importance}/10
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="cboard-demo__board-grid">
                  {complaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="cboard-demo__board-tile"
                    >
                      <p>{complaint.text}</p>
                      <span className="cboard-demo__board-score">#{complaint.importance}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="cboard-demo__panel">
              <div className="cboard-demo__solution-header">
                <h3 className="cboard-demo__solution-title">Solution</h3>
                <button
                  ref={setTargetRef('play')}
                  type="button"
                  className={[
                    'cboard-demo__play-btn',
                    step.target === 'play' ? 'is-hovered' : '',
                    step.playing ? 'is-playing' : '',
                  ].filter(Boolean).join(' ')}
                  aria-label="Play solution audio"
                >
                  <PlayIcon />
                </button>
              </div>
              <div
                className={[
                  'cboard-demo__solution-body',
                  step.playing ? 'is-playing' : '',
                ].filter(Boolean).join(' ')}
              >
                {DEMO_SOLUTION}
              </div>
            </div>
          </div>

          <div
            className={`cboard-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default CommunityBoardDemo;

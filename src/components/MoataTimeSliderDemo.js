import React, { useEffect, useRef, useState } from 'react';
import './MoataTimeSliderDemo.css';

const STEPS = [
  { playhead: 18, playing: false, target: 'playhead', duration: 1800 },
  { playhead: 42, playing: false, target: 'playhead', duration: 2000 },
  { playhead: 42, playing: true, target: 'play-btn', duration: 1600 },
  { playhead: 58, playing: true, target: 'scale', duration: 1800 },
  { playhead: 72, playing: false, target: 'playhead', duration: 2000 },
  { playhead: 72, playing: false, target: 'scale', duration: 1600 },
  { phase: 'idle', duration: 1000 },
];

const PURPLE = '#7939F7';

const Sym = ({ name, size = 18, fill = 1, color }) => (
  <span
    className="material-symbols-rounded"
    style={{
      fontSize: size,
      lineHeight: 1,
      display: 'inline-flex',
      fontVariationSettings: `'wght' 400, 'FILL' ${fill}, 'GRAD' 0, 'opsz' 20`,
      ...(color ? { color } : {}),
    }}
    aria-hidden="true"
  >
    {name}
  </span>
);

const ScaleTicks = ({ playhead }) => (
  <svg className="moata-time-slider-demo__scale-svg" viewBox="0 0 400 72" preserveAspectRatio="none" aria-hidden="true">
    <line x1="0" y1="36" x2="400" y2="36" stroke="#e5e7eb" strokeWidth="1" />
    {[0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400].map((x) => (
      <g key={x}>
        <line
          x1={x}
          y1={x % 50 === 0 ? '22' : '28'}
          x2={x}
          y2="36"
          stroke={x % 50 === 0 ? '#94a3b8' : '#cbd5e1'}
          strokeWidth="1"
        />
      </g>
    ))}
    <text x="28" y="58" fill="#6b7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">2021</text>
    <text x="168" y="58" fill="#6b7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">2023</text>
    <text x="308" y="58" fill="#6b7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">2025</text>
    <line
      x1={(playhead / 100) * 400}
      y1="10"
      x2={(playhead / 100) * 400}
      y2="36"
      stroke={PURPLE}
      strokeWidth="2"
      strokeDasharray="4,3"
    />
    <polygon
      points={`${(playhead / 100) * 400 - 6},4 ${(playhead / 100) * 400 + 6},4 ${(playhead / 100) * 400},14`}
      fill={PURPLE}
    />
  </svg>
);

const MoataTimeSliderDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';
  const playhead = step.playhead ?? 42;

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
      if (!container || isIdle || !step.target) {
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
    <div className={`moata-time-slider-demo ${className}`.trim()} style={style}>
      <div className="moata-time-slider-demo__stage" ref={containerRef}>
        <div className="moata-time-slider-demo__panel">
          <div className="moata-time-slider-demo__slider-zone">
            <div className="moata-time-slider-demo__pill">25/01/2021 | 01:23:00</div>

            <div className="moata-time-slider-demo__track">
              <div className="moata-time-slider-demo__track-rail" />
              <div className="moata-time-slider-demo__track-fill" style={{ width: `${playhead}%` }} />
              <div
                ref={setTargetRef('playhead')}
                className={`moata-time-slider-demo__handle ${step.playing ? 'is-playing' : ''}`}
                style={{ left: `${playhead}%` }}
              />
            </div>

            <div
              ref={setTargetRef('scale')}
              className={`moata-time-slider-demo__scale ${
                step.target === 'scale' ? 'is-highlighted' : ''
              }`}
            >
              <ScaleTicks playhead={playhead} />
            </div>

            <div className="moata-time-slider-demo__transport">
              <div className="moata-time-slider-demo__endpoint">
                <strong>01/01/2021</strong>
                <span>00:00:00</span>
              </div>
              <div className="moata-time-slider-demo__controls">
                <button type="button" className="moata-time-slider-demo__control-btn" aria-label="Previous">
                  <Sym name="skip_previous" size={20} />
                </button>
                <button
                  type="button"
                  ref={setTargetRef('play-btn')}
                  className={`moata-time-slider-demo__control-btn ${
                    step.playing ? 'is-active' : ''
                  } ${step.target === 'play-btn' ? 'is-highlighted' : ''}`}
                  aria-label={step.playing ? 'Pause' : 'Play'}
                >
                  <Sym name={step.playing ? 'pause' : 'play_arrow'} size={22} />
                </button>
                <button type="button" className="moata-time-slider-demo__control-btn" aria-label="Next">
                  <Sym name="skip_next" size={20} />
                </button>
              </div>
              <div className="moata-time-slider-demo__endpoint moata-time-slider-demo__endpoint--end">
                <strong>01/01/2026</strong>
                <span>00:00:00</span>
              </div>
            </div>
          </div>
        </div>

        <svg
          className={`moata-time-slider-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          aria-hidden="true"
        >
          <path
            d="M5.5 3.5L18 12.5L11.5 14L9.5 20.5L5.5 3.5Z"
            fill="#111"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default MoataTimeSliderDemo;

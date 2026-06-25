import React, { useEffect, useRef, useState } from 'react';
import './MoataCommentEditDemo.css';

const COORDS = '51.5074, -0.1278';

const STEPS = [
  { status: 'High', type: null, customField: null, target: 'status-value', duration: 1600 },
  { status: 'High', type: null, customField: null, statusMenu: true, target: 'status-option-in-review', duration: 1400 },
  { status: 'In Review', type: null, customField: null, typeMenu: true, target: 'type-value', duration: 1600 },
  { status: 'In Review', type: 'Planning', customField: null, target: 'type-option-planning', duration: 1400 },
  { status: 'In Review', type: 'Planning', customField: null, target: 'add-field', duration: 1600 },
  { status: 'In Review', type: 'Planning', customField: 'Environmental', target: 'custom-field', duration: 2000 },
  { phase: 'idle', duration: 1000 },
];

const MUTED_ICON = 'rgba(0, 0, 0, 0.54)';

const Sym = ({ name, size = 20, fill = 1, color }) => (
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

const StatusPill = ({ status }) => {
  const slug = status === 'High' ? 'high' : status === 'In Review' ? 'in-review' : 'resolved';
  return (
    <span className={`moata-comment-edit-demo__status-pill moata-comment-edit-demo__status-pill--${slug}`}>
      {status}
    </span>
  );
};

const MoataCommentEditDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';

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
    <div className={`moata-comment-edit-demo ${className}`.trim()} style={style}>
      <div className="moata-comment-edit-demo__stage" ref={containerRef}>
        <div className="moata-comment-edit-demo__panel">
          <div className="moata-comment-edit-demo__detail-header">
            <span className="moata-comment-edit-demo__icon-btn">
              <Sym name="arrow_back" size={17} color={MUTED_ICON} />
            </span>
            <span className="moata-comment-edit-demo__detail-ref">#A4F281</span>
            <span className="moata-comment-edit-demo__icon-btn">
              <Sym name="check_circle" size={17} fill={0} color={MUTED_ICON} />
            </span>
          </div>

          <div className="moata-comment-edit-demo__body">
            <p className="moata-comment-edit-demo__section-label">Properties</p>

            <div className="moata-comment-edit-demo__prop-row">
              <div className="moata-comment-edit-demo__prop-label">
                <Sym name="adjust" size={15} color={MUTED_ICON} />
                <span>Status</span>
              </div>
              <div className="moata-comment-edit-demo__prop-value">
                <span ref={setTargetRef('status-value')} className="moata-comment-edit-demo__prop-hit">
                  <StatusPill status={step.status} />
                </span>
                {step.statusMenu && (
                  <div className="moata-comment-edit-demo__menu">
                    {['High', 'In Review', 'Resolved'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        ref={option === 'In Review' ? setTargetRef('status-option-in-review') : undefined}
                        className={`moata-comment-edit-demo__menu-item ${
                          option === step.status ? 'is-selected' : ''
                        } ${option === 'In Review' && step.target === 'status-option-in-review' ? 'is-hovered' : ''}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="moata-comment-edit-demo__prop-row">
              <div className="moata-comment-edit-demo__prop-label">
                <Sym name="notes" size={15} color={MUTED_ICON} />
                <span>Type</span>
              </div>
              <div className="moata-comment-edit-demo__prop-value">
                <span ref={setTargetRef('type-value')} className="moata-comment-edit-demo__prop-hit">
                  <span className="moata-comment-edit-demo__prop-text">{step.type || 'Not set'}</span>
                </span>
                {step.typeMenu && (
                  <div className="moata-comment-edit-demo__menu">
                    {['Structural', 'Planning', 'Layer'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        ref={option === 'Planning' ? setTargetRef('type-option-planning') : undefined}
                        className={`moata-comment-edit-demo__menu-item ${
                          option === step.type ? 'is-selected' : ''
                        } ${option === 'Planning' && step.target === 'type-option-planning' ? 'is-hovered' : ''}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="moata-comment-edit-demo__prop-row">
              <div className="moata-comment-edit-demo__prop-label">
                <Sym name="calendar_today" size={15} color={MUTED_ICON} />
                <span>Date Created</span>
              </div>
              <div className="moata-comment-edit-demo__prop-value">
                <span className="moata-comment-edit-demo__prop-text">12 May 2024</span>
              </div>
            </div>

            <div className="moata-comment-edit-demo__prop-row">
              <div className="moata-comment-edit-demo__prop-label">
                <Sym name="my_location" size={15} color={MUTED_ICON} />
                <span>Coordinates</span>
              </div>
              <div className="moata-comment-edit-demo__prop-value">
                <span className="moata-comment-edit-demo__prop-text moata-comment-edit-demo__prop-text--mono">{COORDS}</span>
              </div>
            </div>

            {step.customField && (
              <div ref={setTargetRef('custom-field')} className="moata-comment-edit-demo__prop-row is-new">
                <div className="moata-comment-edit-demo__prop-label">
                  <Sym name="label" size={15} color={MUTED_ICON} />
                  <span>Discipline</span>
                </div>
                <div className="moata-comment-edit-demo__prop-value">
                  <span className="moata-comment-edit-demo__prop-text">{step.customField}</span>
                </div>
              </div>
            )}

            <button
              type="button"
              ref={setTargetRef('add-field')}
              className={`moata-comment-edit-demo__add-field ${
                step.target === 'add-field' ? 'is-hovered' : ''
              }`}
            >
              <Sym name="add" size={15} color="#9ca3af" />
              <span>Add a field</span>
            </button>
          </div>
        </div>

        <svg
          className={`moata-comment-edit-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default MoataCommentEditDemo;

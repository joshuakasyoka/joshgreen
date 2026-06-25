import React, { useEffect, useRef, useState } from 'react';
import './MoataCommentsDemo.css';

const INITIAL_MESSAGE = 'Need to review impact on ancient woodland boundary.';
const COORDS = '51.5074, -0.1278';

const getTypingDuration = (char, index) => {
  if (index === 0) return 520;
  if (char === ' ') return 180;
  const prev = INITIAL_MESSAGE[index - 1];
  if (prev === ' ') return 95;
  return 52 + (index % 4) * 14;
};

const buildSteps = () => {
  const setup = [
    { phase: 'create', draft: '', target: 'create-input', duration: 1400, showCaret: false },
  ];

  const typing = INITIAL_MESSAGE.split('').map((char, index) => ({
    phase: 'create',
    draft: INITIAL_MESSAGE.slice(0, index + 1),
    target: 'create-input',
    duration: getTypingDuration(char, index),
    showCaret: true,
  }));

  const finish = [
    {
      phase: 'create',
      draft: INITIAL_MESSAGE,
      target: 'create-send',
      duration: 1200,
      showCaret: false,
    },
    { phase: 'card', view: 'thread', status: 'High', target: 'status-pill', duration: 1600 },
    { phase: 'card', view: 'thread', status: 'High', statusMenu: true, target: 'status-in-review', duration: 1800 },
    { phase: 'card', view: 'thread', status: 'In Review', target: 'info-btn', duration: 1400 },
    { phase: 'card', view: 'info', status: 'In Review', target: 'info-back', duration: 2200 },
    { phase: 'card', view: 'thread', status: 'In Review', target: 'reply-input', duration: 1600 },
    { phase: 'idle', duration: 1000 },
  ];

  return [...setup, ...typing, ...finish];
};

const STEPS = buildSteps();

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

const STATUS_CLASS = {
  High: 'high',
  Medium: 'medium',
  Low: 'low',
  'In Review': 'in-review',
  Resolved: 'resolved',
};

const StatusPill = ({ status, pulse }) => {
  const slug = STATUS_CLASS[status] || 'high';
  return (
    <span
      className={[
        'moata-comments-demo__status-pill',
        `moata-comments-demo__status-pill--${slug}`,
        pulse ? 'is-pulse' : '',
      ].filter(Boolean).join(' ')}
    >
      <span className={`moata-comments-demo__status-dot moata-comments-demo__status-dot--${slug}`} />
      {status}
    </span>
  );
};

const IconBtn = ({ children, hovered, innerRef }) => (
  <span ref={innerRef} className={`moata-comments-demo__icon-btn ${hovered ? 'is-hovered' : ''}`}>
    {children}
  </span>
);

const CreateBubble = ({ draft, sendHovered, sendActive, showCaret, setTargetRef }) => {
  const expanded = draft.length > 0;

  return (
    <div className="moata-comments-demo__create">
      <div className={`moata-comments-demo__create-row ${expanded ? 'is-expanded' : ''}`.trim()}>
        <div
          ref={setTargetRef('create-input')}
          className={`moata-comments-demo__create-input ${draft ? '' : 'is-placeholder'}`.trim()}
        >
          {draft ? (
            <>
              {draft}
              {showCaret && <span className="moata-comments-demo__caret" aria-hidden="true" />}
            </>
          ) : (
            'Add a comment…'
          )}
        </div>
        {!expanded && (
          <span className="moata-comments-demo__create-send">
            <Sym name="send" size={11} color="#9ca3af" />
          </span>
        )}
      </div>
      {expanded && (
        <>
          <div className="moata-comments-demo__divider" />
          <div className="moata-comments-demo__create-footer">
            <IconBtn><Sym name="emoji_emotions" size={17} color={MUTED_ICON} /></IconBtn>
            <IconBtn><Sym name="alternate_email" size={17} color={MUTED_ICON} /></IconBtn>
            <IconBtn><Sym name="image" size={17} color={MUTED_ICON} /></IconBtn>
            <span className="moata-comments-demo__create-coords">{COORDS}</span>
            <span className="moata-comments-demo__create-footer-spacer" />
            <span
              ref={setTargetRef('create-send')}
              className={[
                'moata-comments-demo__create-send',
                'moata-comments-demo__create-send--lg',
                sendActive ? 'is-active' : '',
                sendHovered ? 'is-hovered' : '',
              ].filter(Boolean).join(' ')}
            >
              <Sym name="send" size={11} color="#fff" />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

const InfoView = ({ backHovered, setTargetRef }) => (
  <>
    <div className="moata-comments-demo__info-header">
      <IconBtn innerRef={setTargetRef('info-back')} hovered={backHovered}>
        <Sym name="chevron_left" size={18} color={MUTED_ICON} />
      </IconBtn>
      <h4 className="moata-comments-demo__info-title">Comment Info</h4>
      <IconBtn><Sym name="edit" size={15} color={MUTED_ICON} /></IconBtn>
    </div>
    <div className="moata-comments-demo__info-fields">
      {[
        { icon: 'calendar_today', label: 'Date Created', value: '12 May 2024' },
        { icon: 'my_location', label: 'Coordinates', value: COORDS },
        { icon: 'adjust', label: 'Status', value: 'status' },
        { icon: 'notes', label: 'Type', value: 'Structural' },
      ].map((row) => (
        <div key={row.label} className="moata-comments-demo__info-row">
          <span className="moata-comments-demo__info-icon">
            <Sym name={row.icon} size={15} color={MUTED_ICON} />
          </span>
          <span className="moata-comments-demo__info-label">{row.label}</span>
          <span className="moata-comments-demo__info-value">
            {row.value === 'status' ? <StatusPill status="In Review" /> : row.value}
          </span>
        </div>
      ))}
    </div>
    <div className="moata-comments-demo__activity">
      <p className="moata-comments-demo__activity-label">Activity</p>
      <div className="moata-comments-demo__activity-item">
        <div className="moata-comments-demo__activity-line">
          <span className="moata-comments-demo__avatar moata-comments-demo__avatar--sm">SP</span>
          <span className="moata-comments-demo__activity-connector" />
        </div>
        <div className="moata-comments-demo__activity-text">
          <strong>Samuel</strong> Created this Comment
          <span className="moata-comments-demo__activity-time">10:30 AM</span>
        </div>
      </div>
      <div className="moata-comments-demo__activity-item">
        <div className="moata-comments-demo__activity-line">
          <span className="moata-comments-demo__avatar moata-comments-demo__avatar--sm">TS</span>
        </div>
        <div className="moata-comments-demo__activity-text">
          <strong>Thomas</strong> Changed this Comment to <strong>In Review</strong>
          <span className="moata-comments-demo__activity-time">10:45 AM</span>
        </div>
      </div>
    </div>
  </>
);

const CommentCard = ({
  view,
  status,
  statusMenu,
  statusOptionHovered,
  infoHovered,
  backHovered,
  setTargetRef,
}) => (
  <div className="moata-comments-demo__card">
    {view === 'info' ? (
      <InfoView backHovered={backHovered} setTargetRef={setTargetRef} />
    ) : (
      <>
        <div className="moata-comments-demo__card-header">
          <h4 className="moata-comments-demo__card-title">Comment</h4>
          <div className="moata-comments-demo__status-wrap" ref={setTargetRef('status-pill')}>
            <StatusPill status={status} pulse />
            {statusMenu && (
              <div className="moata-comments-demo__status-menu">
                {['High', 'Medium', 'Low', 'In Review', 'Resolved'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    ref={option === 'In Review' ? setTargetRef('status-in-review') : undefined}
                    className={`moata-comments-demo__status-menu-item ${option === 'In Review' && statusOptionHovered ? 'is-hovered' : ''}`}
                  >
                    <StatusPill status={option} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <IconBtn><Sym name="check_circle" size={15} fill={0} color={MUTED_ICON} /></IconBtn>
          <IconBtn innerRef={setTargetRef('info-btn')} hovered={infoHovered}>
            <Sym name="page_info" size={15} color={MUTED_ICON} />
          </IconBtn>
          <IconBtn><Sym name="open_in_new" size={15} color={MUTED_ICON} /></IconBtn>
          <IconBtn><Sym name="close" size={15} color={MUTED_ICON} /></IconBtn>
        </div>

        <div className="moata-comments-demo__thread">
          <div className="moata-comments-demo__message">
            <span className="moata-comments-demo__avatar">SP</span>
            <div>
              <div className="moata-comments-demo__message-meta">
                <span className="moata-comments-demo__message-name">Samuel</span>
                <span className="moata-comments-demo__message-time">10:30 AM</span>
              </div>
              <p className="moata-comments-demo__message-text">{INITIAL_MESSAGE}</p>
            </div>
          </div>
        </div>

        <div className="moata-comments-demo__divider" />

        <div className="moata-comments-demo__reply">
          <span className="moata-comments-demo__avatar moata-comments-demo__avatar--sm">SP</span>
          <div ref={setTargetRef('reply-input')} className="moata-comments-demo__reply-field">
            <span className="moata-comments-demo__reply-input">Reply</span>
            <span className="moata-comments-demo__send-btn">
              <Sym name="send" size={11} color="#9ca3af" />
            </span>
          </div>
        </div>
      </>
    )}
  </div>
);

const MoataCommentsDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isCreate = step.phase === 'create';
  const isCard = step.phase === 'card';
  const isIdle = step.phase === 'idle';

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
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

      const key = step.target || 'create-input';
      const target = targetRefs.current[key];
      if (!target) {
        setCursor((prev) => ({ ...prev, visible: true }));
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

    const frame = requestAnimationFrame(updateCursor);
    window.addEventListener('resize', updateCursor);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running, isIdle]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-comments-demo ${className}`.trim()} style={style}>
      <div className="moata-comments-demo__stage" ref={containerRef}>
        {isCreate && (
          <CreateBubble
            draft={step.draft}
            sendActive={step.draft.trim().length > 0}
            sendHovered={step.target === 'create-send'}
            showCaret={step.showCaret}
            setTargetRef={setTargetRef}
          />
        )}

        {isCard && (
          <CommentCard
            view={step.view}
            status={step.status}
            statusMenu={step.statusMenu}
            statusOptionHovered={step.target === 'status-in-review'}
            infoHovered={step.target === 'info-btn'}
            backHovered={step.target === 'info-back'}
            setTargetRef={setTargetRef}
          />
        )}

        <svg
          className={`moata-comments-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default MoataCommentsDemo;

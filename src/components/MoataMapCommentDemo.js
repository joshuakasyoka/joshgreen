import React, { useEffect, useRef, useState } from 'react';
import './MoataMapCommentDemo.css';

const MUTED_ICON = 'rgba(0, 0, 0, 0.54)';

const COMMENTS = [
  {
    id: '1',
    text: 'Need to review the impact on ancient woodland boundary here',
    coords: '51.5074, -0.1278',
    initials: 'SP',
    left: '48%',
    top: '40%',
    mapTarget: 'map-click-1',
  },
  {
    id: '2',
    text: 'Check setback distance from the coastal path',
    coords: '51.5092, -0.1291',
    initials: 'SP',
    left: '64%',
    top: '56%',
    mapTarget: 'map-click-2',
  },
];

const TOOLBAR = [
  { id: 'select', sym: 'arrow_selector_tool' },
  { id: 'point', sym: 'fiber_manual_record' },
  { id: 'shape', sym: 'circle' },
  { id: 'draw', sym: 'draw' },
  { id: 'graphics', sym: 'image' },
  { id: 'comment', sym: 'chat_bubble' },
];

const getTypingDuration = (text, char, index) => {
  if (index === 0) return 520;
  if (char === ' ') return 180;
  const prev = text[index - 1];
  if (prev === ' ') return 95;
  return 52 + (index % 4) * 14;
};

const buildCommentFlow = (comment, placedBefore) => {
  const placed = [...placedBefore];
  const setup = [
    {
      activeTool: 'comment',
      mode: 'none',
      draft: '',
      placedComments: placed,
      commentId: comment.id,
      target: comment.mapTarget,
      duration: 1600,
    },
    {
      activeTool: 'comment',
      mode: 'compose',
      draft: '',
      placedComments: placed,
      commentId: comment.id,
      target: 'create-input',
      duration: 750,
      showCaret: false,
    },
  ];

  const typing = comment.text.split('').map((char, index) => ({
    activeTool: 'comment',
    mode: 'compose',
    draft: comment.text.slice(0, index + 1),
    placedComments: placed,
    commentId: comment.id,
    target: 'create-input',
    duration: getTypingDuration(comment.text, char, index),
    showCaret: true,
  }));

  const finish = [
    {
      activeTool: 'comment',
      mode: 'compose',
      draft: comment.text,
      placedComments: placed,
      commentId: comment.id,
      target: 'create-send',
      duration: 1100,
      showCaret: false,
    },
    {
      activeTool: 'comment',
      mode: 'placed',
      draft: '',
      placedComments: [...placed, comment.id],
      commentId: comment.id,
      target: comment.mapTarget,
      duration: 1200,
    },
  ];

  return [...setup, ...typing, ...finish];
};

const buildSteps = () => {
  const intro = [
    { activeTool: 'select', mode: 'none', placedComments: [], target: 'tool-comment', duration: 1400 },
    { activeTool: 'comment', mode: 'none', placedComments: [], target: 'tool-comment', duration: 1200 },
  ];

  const first = buildCommentFlow(COMMENTS[0], []);
  const second = buildCommentFlow(COMMENTS[1], ['1']);

  return [
    ...intro,
    ...first,
    ...second,
    { phase: 'idle', activeTool: 'comment', mode: 'none', placedComments: ['1', '2'], duration: 1400 },
  ];
};

const STEPS = buildSteps();

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

const CreateBubble = ({ draft, coords, sendHovered, showCaret, setTargetRef }) => {
  const expanded = draft.length > 0;

  return (
    <div className="moata-map-comment-demo__create">
      <div className={`moata-map-comment-demo__create-row ${expanded ? 'is-expanded' : ''}`.trim()}>
        <div
          ref={setTargetRef('create-input')}
          className={`moata-map-comment-demo__create-input ${draft ? '' : 'is-placeholder'}`.trim()}
        >
          {draft ? (
            <>
              {draft}
              {showCaret && <span className="moata-map-comment-demo__caret" aria-hidden="true" />}
            </>
          ) : (
            'Add a comment…'
          )}
        </div>
        {!expanded && (
          <span className="moata-map-comment-demo__create-send">
            <Sym name="send" size={11} color="#9ca3af" />
          </span>
        )}
      </div>
      {expanded && (
        <>
          <div className="moata-map-comment-demo__create-divider" />
          <div className="moata-map-comment-demo__create-footer">
            <span className="moata-map-comment-demo__create-icon"><Sym name="emoji_emotions" size={17} color={MUTED_ICON} /></span>
            <span className="moata-map-comment-demo__create-icon"><Sym name="alternate_email" size={17} color={MUTED_ICON} /></span>
            <span className="moata-map-comment-demo__create-icon"><Sym name="image" size={17} color={MUTED_ICON} /></span>
            <span className="moata-map-comment-demo__create-coords">{coords}</span>
            <span className="moata-map-comment-demo__create-footer-spacer" />
            <span
              ref={setTargetRef('create-send')}
              className={[
                'moata-map-comment-demo__create-send',
                'moata-map-comment-demo__create-send--lg',
                'is-active',
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

const MoataMapCommentDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';
  const commentMode = step.activeTool === 'comment';
  const isComposing = step.mode === 'compose';
  const placedComments = step.placedComments || [];
  const activeComment = COMMENTS.find((comment) => comment.id === step.commentId);

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
    <div className={`moata-map-comment-demo ${className}`.trim()} style={style}>
      <div
        className={`moata-map-comment-demo__stage ${commentMode ? 'is-comment-mode' : ''}`}
        ref={containerRef}
      >
        {COMMENTS.map((comment) => (
          <div
            key={comment.mapTarget}
            ref={setTargetRef(comment.mapTarget)}
            className="moata-map-comment-demo__click-target"
            style={{ left: comment.left, top: comment.top }}
            aria-hidden="true"
          />
        ))}

        {placedComments.map((commentId) => {
          const comment = COMMENTS.find((item) => item.id === commentId);
          if (!comment) return null;

          return (
            <div
              key={comment.id}
              className="moata-map-comment-demo__pin-wrap is-placed"
              style={{ left: comment.left, top: comment.top }}
            >
              <span className="moata-map-comment-demo__pin">{comment.initials}</span>
            </div>
          );
        })}

        {isComposing && activeComment && (
          <div
            className="moata-map-comment-demo__pin-wrap"
            style={{ left: activeComment.left, top: activeComment.top }}
          >
            <span className="moata-map-comment-demo__pin">{activeComment.initials}</span>
            <div className="moata-map-comment-demo__compose-bubble">
              <CreateBubble
                draft={step.draft}
                coords={activeComment.coords}
                sendHovered={step.target === 'create-send'}
                showCaret={step.showCaret}
                setTargetRef={setTargetRef}
              />
            </div>
          </div>
        )}

        <div className="moata-map-comment-demo__toolbar">
          {TOOLBAR.map((tool) => (
            <button
              key={tool.id}
              type="button"
              ref={tool.id === 'comment' ? setTargetRef('tool-comment') : undefined}
              className={`moata-map-comment-demo__tool ${step.activeTool === tool.id ? 'is-active' : ''}`}
              aria-label={tool.id}
            >
              <Sym name={tool.sym} size={20} />
              <span className="moata-map-comment-demo__tool-caret">
                <Sym name="arrow_drop_down" size={14} />
              </span>
            </button>
          ))}
        </div>

        <svg
          className={`moata-map-comment-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default MoataMapCommentDemo;

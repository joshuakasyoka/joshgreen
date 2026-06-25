import React, { useEffect, useRef, useState } from 'react';
import './MoataCommentsPanelDemo.css';

const COORDS = '51.5074, -0.1278';

const COMMENTS = [
  {
    id: '0',
    ref: 'A4F281',
    author: 'Samuel',
    initials: 'SP',
    date: '12 May',
    dateFull: '12 May 2024',
    text: 'Need to review the impact on ancient woodland boundary here',
    status: 'In Review',
    type: 'Structural',
    thread: [
      {
        id: 'm1',
        initials: 'SP',
        name: 'Samuel',
        time: '10:30 AM',
        text: 'Need to review the impact on ancient woodland boundary here',
      },
      {
        id: 'm1b',
        initials: 'TS',
        name: 'Thomas',
        time: '10:45 AM',
        text: 'Flagging for planning review — can we confirm the buffer zone?',
      },
    ],
  },
  {
    id: '1',
    ref: 'B8C392',
    author: 'Samuel',
    initials: 'SP',
    date: '10 May',
    dateFull: '10 May 2024',
    text: 'Check setback distance from the coastal path',
    status: 'High',
    type: null,
    thread: [
      {
        id: 'm2',
        initials: 'SP',
        name: 'Samuel',
        time: '9:15 AM',
        text: 'Check setback distance from the coastal path',
      },
    ],
  },
  {
    id: '2',
    ref: 'C1D045',
    author: 'Thomas',
    initials: 'TS',
    date: '8 May',
    dateFull: '8 May 2024',
    text: 'Updated layer opacity for woodland overlay',
    status: 'Resolved',
    type: 'Layer',
    thread: [
      {
        id: 'm3',
        initials: 'TS',
        name: 'Thomas',
        time: '2:00 PM',
        text: 'Updated layer opacity for woodland overlay',
      },
    ],
  },
];

const ACTIVITY = [
  { id: '1', initials: 'SP', name: 'Samuel', action: 'Created this comment', boldWord: null, time: '10:30 AM' },
  { id: '2', initials: 'TS', name: 'Thomas', action: 'Changed status to', boldWord: 'In Review', time: '10:45 AM' },
];

const REPLY_TEXT = 'Happy to confirm the 50m buffer applies here.';

const PENDING_REPLY = {
  id: 'm1c',
  initials: 'SP',
  name: 'Samuel',
  time: '11:02 AM',
  text: REPLY_TEXT,
};

const getTypingDuration = (char, index) => {
  if (index === 0) return 480;
  if (char === ' ') return 160;
  const prev = REPLY_TEXT[index - 1];
  if (prev === ' ') return 90;
  return 48 + (index % 4) * 12;
};

const buildSteps = () => {
  const open = [
    { view: 'list', filter: 'Open', target: 'detail-btn-0', duration: 1800 },
    { view: 'detail', detailId: '0', target: 'detail-status', scroll: 'status', duration: 2000 },
    { view: 'detail', detailId: '0', target: 'detail-activity', scroll: 'activity', duration: 2200 },
    { view: 'detail', detailId: '0', target: 'detail-thread', scroll: 'thread', duration: 2200 },
    { view: 'detail', detailId: '0', target: 'detail-reply', replyDraft: '', showCaret: false, duration: 700 },
  ];

  const typing = REPLY_TEXT.split('').map((char, index) => ({
    view: 'detail',
    detailId: '0',
    target: 'detail-reply',
    replyDraft: REPLY_TEXT.slice(0, index + 1),
    showCaret: true,
    duration: getTypingDuration(char, index),
  }));

  const finish = [
    {
      view: 'detail',
      detailId: '0',
      target: 'detail-send',
      replyDraft: REPLY_TEXT,
      showCaret: false,
      duration: 1200,
    },
    {
      view: 'detail',
      detailId: '0',
      target: 'detail-thread',
      scroll: 'thread',
      replySent: true,
      duration: 2200,
    },
    { view: 'detail', detailId: '0', target: 'detail-back', scroll: 'top', duration: 1400 },
  ];

  return [...open, ...typing, ...finish];
};

const STEPS = buildSteps();

const STATUS_CLASS = {
  High: 'high',
  'In Review': 'in-review',
  Resolved: 'resolved',
};

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
  const slug = STATUS_CLASS[status] || 'resolved';
  return (
    <span className={`moata-comments-panel-demo__status-pill moata-comments-panel-demo__status-pill--${slug}`}>
      {status}
    </span>
  );
};

const PropRow = ({ icon, label, children, innerRef }) => (
  <div ref={innerRef} className="moata-comments-panel-demo__prop-row">
    <div className="moata-comments-panel-demo__prop-label">
      <Sym name={icon} size={15} color={MUTED_ICON} />
      <span>{label}</span>
    </div>
    <div className="moata-comments-panel-demo__prop-value">{children}</div>
  </div>
);

const CommentDetailView = ({ comment, step, setTargetRef, highlightTarget }) => {
  const replyDraft = step.replyDraft ?? '';
  const threadMessages = step.replySent
    ? [...comment.thread, PENDING_REPLY]
    : comment.thread;
  const sendActive = replyDraft.trim().length > 0 && !step.replySent;
  const sendHovered = highlightTarget && step.target === 'detail-send';

  return (
  <div className="moata-comments-panel-demo__detail">
    <div className="moata-comments-panel-demo__detail-header">
      <span
        ref={setTargetRef('detail-back')}
        className={`moata-comments-panel-demo__icon-btn ${
          highlightTarget && step.target === 'detail-back' ? 'is-hovered' : ''
        }`}
      >
        <Sym name="arrow_back" size={17} color={MUTED_ICON} />
      </span>
      <span className="moata-comments-panel-demo__detail-ref">#{comment.ref}</span>
      <span className="moata-comments-panel-demo__icon-btn">
        <Sym name="check_circle" size={17} fill={0} color={MUTED_ICON} />
      </span>
      <span className="moata-comments-panel-demo__icon-btn">
        <Sym name="more_horiz" size={17} color={MUTED_ICON} />
      </span>
    </div>

    <div className="moata-comments-panel-demo__detail-scroll-wrap">
      <div
        ref={setTargetRef('detail-scroll')}
        className="moata-comments-panel-demo__detail-scroll"
      >
        <div className="moata-comments-panel-demo__section">
          <p className="moata-comments-panel-demo__section-label">Properties</p>
          <PropRow
            innerRef={setTargetRef('detail-status')}
            icon="adjust"
            label="Status"
          >
            <StatusPill status={comment.status} />
          </PropRow>
          <PropRow icon="notes" label="Type">
            <span className="moata-comments-panel-demo__prop-text">{comment.type || 'Not set'}</span>
          </PropRow>
          <PropRow icon="calendar_today" label="Date Created">
            <span className="moata-comments-panel-demo__prop-text">{comment.dateFull}</span>
          </PropRow>
          <PropRow icon="my_location" label="Coordinates">
            <span className="moata-comments-panel-demo__prop-text moata-comments-panel-demo__prop-text--mono">{COORDS}</span>
          </PropRow>
          <div className="moata-comments-panel-demo__add-field">
            <Sym name="add" size={15} color="#9ca3af" />
            <span>Add a field</span>
          </div>
        </div>

        <div className="moata-comments-panel-demo__divider" />

        <div
          ref={setTargetRef('detail-activity')}
          className="moata-comments-panel-demo__section"
        >
          <p className="moata-comments-panel-demo__section-label">Activity</p>
          {ACTIVITY.map((event, index) => (
            <div key={event.id} className="moata-comments-panel-demo__activity-item">
              <div className="moata-comments-panel-demo__activity-line">
                <span className="moata-comments-panel-demo__avatar moata-comments-panel-demo__avatar--sm">
                  {event.initials}
                </span>
                {index < ACTIVITY.length - 1 && (
                  <span className="moata-comments-panel-demo__activity-connector" />
                )}
              </div>
              <div className="moata-comments-panel-demo__activity-text">
                <strong>{event.name}</strong> {event.action}
                {event.boldWord && (
                  <>
                    {' '}
                    <strong>{event.boldWord}</strong>
                  </>
                )}
                <span className="moata-comments-panel-demo__activity-time">{event.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="moata-comments-panel-demo__divider" />

        <div ref={setTargetRef('detail-thread')} className="moata-comments-panel-demo__section">
          <p className="moata-comments-panel-demo__section-label">
            Thread · {threadMessages.length}
          </p>
          {threadMessages.map((msg) => (
            <div
              key={msg.id}
              className={`moata-comments-panel-demo__thread-msg ${
                msg.id === PENDING_REPLY.id ? 'is-new' : ''
              }`.trim()}
            >
              <span className="moata-comments-panel-demo__avatar moata-comments-panel-demo__avatar--sm">
                {msg.initials}
              </span>
              <div>
                <div className="moata-comments-panel-demo__thread-meta">
                  <span className="moata-comments-panel-demo__thread-name">{msg.name}</span>
                  <span className="moata-comments-panel-demo__thread-time">{msg.time}</span>
                </div>
                <p className="moata-comments-panel-demo__thread-text">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="moata-comments-panel-demo__detail-reply">
      <span className="moata-comments-panel-demo__avatar moata-comments-panel-demo__avatar--sm">SP</span>
      <div
        ref={setTargetRef('detail-reply')}
        className="moata-comments-panel-demo__reply-field"
      >
        {replyDraft && !step.replySent ? (
          <span className="moata-comments-panel-demo__reply-text">
            {replyDraft}
            {step.showCaret && (
              <span className="moata-comments-panel-demo__reply-caret" aria-hidden="true" />
            )}
          </span>
        ) : (
          <span className="moata-comments-panel-demo__reply-placeholder">Reply…</span>
        )}
        <span
          ref={setTargetRef('detail-send')}
          className={[
            'moata-comments-panel-demo__reply-send',
            sendActive ? 'is-active' : '',
            sendHovered ? 'is-hovered' : '',
          ].filter(Boolean).join(' ')}
        >
          <Sym name="send" size={11} color={sendActive ? '#fff' : '#9ca3af'} />
        </span>
      </div>
    </div>
  </div>
  );
};

const CommentsListView = ({ step, visibleComments, setTargetRef, highlightTarget }) => (
  <div className="moata-comments-panel-demo__list-view">
    <div className="moata-comments-panel-demo__header">
      <h4 className="moata-comments-panel-demo__header-title">Comments</h4>
      <span ref={setTargetRef('filter-btn')} className="moata-comments-panel-demo__icon-btn">
        <Sym name="filter_list" size={16} />
      </span>
    </div>

    <div className="moata-comments-panel-demo__search">
      <Sym name="search" size={15} color="#6b7280" />
      <span className="moata-comments-panel-demo__search-input">Search comments…</span>
    </div>

    {step.filter !== 'Open' && (
      <div className="moata-comments-panel-demo__filter-chip-wrap">
        <span className="moata-comments-panel-demo__filter-chip">{step.filter}</span>
      </div>
    )}

    <div className="moata-comments-panel-demo__list-scroll">
      <div className="moata-comments-panel-demo__list">
        {visibleComments.map((comment) => {
          const detailHovered = highlightTarget && step.target === `detail-btn-${comment.id}`;
          return (
            <div
              key={comment.id}
              ref={setTargetRef(`comment-${comment.id}`)}
              className="moata-comments-panel-demo__card"
            >
              <div className="moata-comments-panel-demo__card-inner">
                <div className="moata-comments-panel-demo__card-top">
                  <span className="moata-comments-panel-demo__avatar">{comment.initials}</span>
                  <span className="moata-comments-panel-demo__card-actions" />
                  <span
                    ref={setTargetRef(`detail-btn-${comment.id}`)}
                    className={[
                      'moata-comments-panel-demo__card-action',
                      detailHovered ? 'is-hovered' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <Sym name="open_in_new" size={15} fill={0} />
                  </span>
                  <span className="moata-comments-panel-demo__card-action">
                    <Sym name="check_circle" size={16} fill={comment.status === 'Resolved' ? 1 : 0} />
                  </span>
                </div>
                <div className="moata-comments-panel-demo__card-ref">#{comment.ref}</div>
                <div className="moata-comments-panel-demo__card-meta">
                  {comment.author}{' '}
                  <span className="moata-comments-panel-demo__card-date">{comment.date}</span>
                </div>
                <p className="moata-comments-panel-demo__card-text">{comment.text}</p>
                {comment.status && <StatusPill status={comment.status} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const MoataCommentsPanelDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [cursorSnap, setCursorSnap] = useState(true);
  const [running, setRunning] = useState(false);
  const wasRunningRef = useRef(false);

  const step = STEPS[stepIndex];
  const highlightTarget = running;
  const isDetail = step.view === 'detail';
  const detailComment =
    COMMENTS.find((comment) => comment.id === step.detailId) ?? COMMENTS[0];

  const visibleComments = COMMENTS.filter((comment) => {
    if (step.filter === 'Resolved') return comment.status === 'Resolved';
    if (step.filter === 'In Review') return comment.status === 'In Review';
    if (step.filter === 'Open') {
      return comment.status === 'High' || comment.status === 'In Review';
    }
    return true;
  });

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
    if (running && !wasRunningRef.current) {
      setStepIndex(0);
      setCursorSnap(true);
    }
    wasRunningRef.current = running;
  }, [running]);

  useEffect(() => {
    if (!running) {
      setCursor({ x: 0, y: 0, visible: false });
      setCursorSnap(true);
      return undefined;
    }

    setCursorSnap(true);

    let cancelled = false;

    const updateCursor = () => {
      if (cancelled) return;

      const container = containerRef.current;
      if (!container || !step.target) {
        setCursor({ x: 0, y: 0, visible: false });
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target || !container.contains(target)) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (targetRect.width < 2 || targetRect.height < 2) {
        return;
      }

      setCursor({
        x: targetRect.left - containerRect.left + targetRect.width * 0.55,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: true,
      });

      requestAnimationFrame(() => {
        if (!cancelled) setCursorSnap(false);
      });
    };

    const viewSwitch = step.view === 'list' ? [0, 100, 320, 600] : [0, 80, 280, 640];
    const timers = viewSwitch.map((ms) => window.setTimeout(updateCursor, ms));
    window.addEventListener('resize', updateCursor);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('resize', updateCursor);
    };
  }, [stepIndex, running, step.target, step.view]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-comments-panel-demo ${className}`.trim()} style={style}>
      <div className="moata-comments-panel-demo__stage" ref={containerRef}>
        <div className={`moata-comments-panel-demo__panel ${isDetail ? 'is-detail' : ''}`.trim()}>
          <div className="moata-comments-panel-demo__tabs">
            <span className="moata-comments-panel-demo__tab-collapse">
              <Sym name="keyboard_double_arrow_right" size={16} color="#6b7280" />
            </span>
            <span className="moata-comments-panel-demo__tab is-active">
              <Sym name="forum" size={16} color="#111827" />
              Comments
            </span>
            <span className="moata-comments-panel-demo__tab-add">
              <Sym name="add" size={15} color="#6b7280" />
            </span>
          </div>

          <div className="moata-comments-panel-demo__body">
            <div
              className={`moata-comments-panel-demo__view ${
                !isDetail ? 'is-visible' : ''
              }`.trim()}
            >
              <CommentsListView
                step={step}
                visibleComments={visibleComments}
                setTargetRef={setTargetRef}
                highlightTarget={highlightTarget}
              />
            </div>
            <div
              className={`moata-comments-panel-demo__view ${
                isDetail ? 'is-visible' : ''
              }`.trim()}
            >
              {detailComment && (
                <CommentDetailView
                  comment={detailComment}
                  step={step}
                  setTargetRef={setTargetRef}
                  highlightTarget={highlightTarget}
                />
              )}
            </div>
          </div>
        </div>

        <svg
          className={[
            'moata-comments-panel-demo__cursor',
            cursor.visible ? 'is-visible' : '',
            cursorSnap ? 'is-snapped' : '',
          ].filter(Boolean).join(' ')}
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

export default MoataCommentsPanelDemo;

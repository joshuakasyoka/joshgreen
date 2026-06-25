import React, { useEffect, useRef, useState } from 'react';
import AccModelViewport from './AccModelViewport';
import './MoataModelViewerDemo.css';

const MODELS = [
  { id: 'v1', name: 'RC-COL-001', date: '12.08.2016', color: '#f44336', cutoff: 42 },
  { id: 'v2', name: 'RC-COL-002', date: '15.03.2018', color: '#4caf50', cutoff: 58 },
  { id: 'v3', name: 'RC-COL-003', date: '22.11.2020', color: '#ce93d8', cutoff: 82 },
];

const COMMENT_TEXT = 'Check ring clearance against revised section diameter';

const getTypingDuration = (text, char, index) => {
  if (index === 0) return 520;
  if (char === ' ') return 180;
  const prev = text[index - 1];
  if (prev === ' ') return 95;
  return 52 + (index % 4) * 14;
};

const commentFlowBase = {
  panel: 'layer',
  show3D: true,
  externalColumn: true,
  rotate: false,
  activeRing: 'v2',
  hoverColumn: 'v2',
  slider: 100,
  visible: ['v1', 'v2', 'v3'],
};

const buildCommentSteps = () => {
  const intro = [
    { ...commentFlowBase, target: 'external-column', duration: 1400 },
    {
      ...commentFlowBase,
      target: 'external-compose',
      commentCompose: true,
      commentDraft: '',
      showCaret: false,
      duration: 750,
    },
  ];

  const typing = COMMENT_TEXT.split('').map((char, index) => ({
    ...commentFlowBase,
    commentCompose: true,
    commentDraft: COMMENT_TEXT.slice(0, index + 1),
    target: 'external-compose',
    duration: getTypingDuration(COMMENT_TEXT, char, index),
    showCaret: true,
  }));

  const finish = [
    {
      ...commentFlowBase,
      commentCompose: true,
      commentDraft: COMMENT_TEXT,
      target: 'external-send',
      showCaret: false,
      duration: 1100,
    },
    {
      ...commentFlowBase,
      commentPlaced: true,
      phase: 'idle',
      duration: 2000,
    },
  ];

  return [...intro, ...typing, ...finish];
};

const STEPS = [
  { panel: 'layer', show3D: false, target: 'ar-btn', duration: 1400 },
  { panel: 'layer', show3D: true, target: 'ar-btn', duration: 1200 },
  {
    panel: 'layer',
    show3D: true,
    externalColumn: true,
    target: 'viewport',
    rotate: true,
    slider: 100,
    visible: ['v1', 'v2', 'v3'],
    hoverColumn: 'v2',
    activeRing: 'v2',
    duration: 2000,
  },
  {
    panel: 'layer',
    show3D: true,
    externalColumn: true,
    target: 'column-v2',
    rotate: false,
    hoverColumn: 'v2',
    slider: 100,
    visible: ['v1', 'v2', 'v3'],
    duration: 1600,
  },
  {
    panel: 'layer',
    show3D: true,
    externalColumn: true,
    target: 'ring-v2',
    rotate: false,
    activeRing: 'v2',
    hoverColumn: 'v2',
    slider: 100,
    visible: ['v1', 'v2', 'v3'],
    duration: 1800,
  },
  ...buildCommentSteps(),
];

const MUTED_ICON = 'rgba(0, 0, 0, 0.54)';

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

const sliderDate = (pct) => {
  if (pct >= 100) return '01.06.2022';
  if (pct >= 78) return '22.11.2020';
  if (pct >= 52) return '15.03.2018';
  return '12.08.2016';
};

const CommentComposeBubble = ({ draft, sendHovered, showCaret, setTargetRef }) => {
  const expanded = draft.length > 0;

  return (
    <div className="moata-model-viewer-demo__comment-compose">
      <div className={`moata-model-viewer-demo__comment-compose-row ${expanded ? 'is-expanded' : ''}`.trim()}>
        <div
          ref={setTargetRef('external-compose')}
          className={`moata-model-viewer-demo__comment-compose-input ${draft ? '' : 'is-placeholder'}`.trim()}
        >
          {draft ? (
            <>
              {draft}
              {showCaret && (
                <span className="moata-model-viewer-demo__comment-compose-caret" aria-hidden="true" />
              )}
            </>
          ) : (
            'Add a comment…'
          )}
        </div>
        {!expanded && (
          <span className="moata-model-viewer-demo__comment-compose-send">
            <Sym name="send" size={11} color="#9ca3af" />
          </span>
        )}
      </div>
      {expanded && (
        <>
          <div className="moata-model-viewer-demo__comment-compose-divider" />
          <div className="moata-model-viewer-demo__comment-compose-footer">
            <span className="moata-model-viewer-demo__comment-compose-meta">RC-COL-002</span>
            <span className="moata-model-viewer-demo__comment-compose-footer-spacer" />
            <span
              ref={setTargetRef('external-send')}
              className={[
                'moata-model-viewer-demo__comment-compose-send',
                'moata-model-viewer-demo__comment-compose-send--lg',
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

const MoataModelViewerDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';
  const isAsset = step.panel === 'asset';
  const show3D = step.show3D !== false;
  const visible = step.visible || ['v1', 'v2', 'v3'];
  const slider = step.slider ?? 100;
  const commentPlaced = Boolean(step.commentPlaced);
  const commentCompose = Boolean(step.commentCompose);
  const commentDraft = step.commentDraft ?? '';
  const externalColumn = Boolean(step.externalColumn);
  const sendHovered = step.target === 'external-send';
  const arHovered = step.target === 'ar-btn';

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
    else delete targetRefs.current[key];
  };

  const bindExternalRef = (key) => (node) => {
    if (key === 'column-v2') setTargetRef('external-column')(node);
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
      if (!target || !container.contains(target)) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (targetRect.width < 4 || targetRect.height < 4) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }

      setCursor({
        x: targetRect.left - containerRect.left + targetRect.width * 0.55,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: true,
      });
    };

    updateCursor();
    const layoutTimer = window.setTimeout(updateCursor, 80);
    const scrollTimer = window.setTimeout(updateCursor, step.scroll ? 520 : 0);
    window.addEventListener('resize', updateCursor);
    return () => {
      window.clearTimeout(layoutTimer);
      window.clearTimeout(scrollTimer);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running, isIdle]);

  useEffect(() => {
    if (!running || isIdle) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => {
        if (current >= STEPS.length - 1) return current;
        return current + 1;
      });
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration, isIdle]);

  return (
    <div className={`moata-model-viewer-demo ${className}`.trim()} style={style}>
      <div className="moata-model-viewer-demo__stage" ref={containerRef}>
        {externalColumn && (
          <div className="moata-model-viewer-demo__external-scene is-visible">
            <AccModelViewport
              className="moata-model-viewer-demo__external-viewport"
              anchorClassName="moata-model-viewer-demo__column-anchor"
              visible={['v2']}
              hoverColumn={step.hoverColumn === 'v2' ? 'v2' : undefined}
              activeRing={step.activeRing === 'v2' ? 'v2' : undefined}
              focusId="v2"
              rotating={step.rotate}
              setTargetRef={bindExternalRef}
            />
            {(commentCompose || commentPlaced) && (
              <div className="moata-model-viewer-demo__external-comment">
                <div className="moata-model-viewer-demo__external-comment-wrap">
                  <span className="moata-model-viewer-demo__comment-pin">SP</span>
                  {commentCompose && !commentPlaced && (
                    <CommentComposeBubble
                      draft={commentDraft}
                      sendHovered={sendHovered}
                      showCaret={Boolean(step.showCaret)}
                      setTargetRef={setTargetRef}
                    />
                  )}
                  {commentPlaced && (
                    <div className="moata-model-viewer-demo__comment-card">
                      <div className="moata-model-viewer-demo__comment-card-meta">
                        <strong>Samuel</strong>
                        <span>RC-COL-002</span>
                      </div>
                      <p>{COMMENT_TEXT}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="moata-model-viewer-demo__panel">
          <div className="moata-model-viewer-demo__tabs">
            <span className="moata-model-viewer-demo__tab-collapse">
              <Sym name="keyboard_double_arrow_right" size={16} color="#6b7280" />
            </span>
            <span className={`moata-model-viewer-demo__tab ${!isAsset ? 'is-active' : ''}`.trim()}>
              <Sym name="layers" size={16} color={!isAsset ? '#111827' : '#6b7280'} />
              Layers
            </span>
            {isAsset && (
              <span className="moata-model-viewer-demo__tab is-active">
                <Sym name="home" size={16} color="#111827" />
                RC-COL-002
              </span>
            )}
            <span className="moata-model-viewer-demo__tab-add">
              <Sym name="add" size={15} color="#6b7280" />
            </span>
          </div>

          <div className="moata-model-viewer-demo__body">
            <div className="moata-model-viewer-demo__header">
              <h4 className="moata-model-viewer-demo__title">
                {isAsset ? 'RC-COL-002' : 'Circular RC Column'}
              </h4>
              <p className="moata-model-viewer-demo__subtitle">
                {isAsset ? 'Circular RC Column' : 'Primary Structure Group'}
              </p>
              <div className="moata-model-viewer-demo__toolbar">
                <span className="moata-model-viewer-demo__icon-btn"><Sym name="visibility" size={18} color={MUTED_ICON} /></span>
                <span className="moata-model-viewer-demo__icon-btn"><Sym name="table_chart" size={18} color={MUTED_ICON} /></span>
                <span className="moata-model-viewer-demo__icon-btn"><Sym name="my_location" size={18} color={MUTED_ICON} /></span>
                {!isAsset && (
                  <span className="moata-model-viewer-demo__icon-btn"><Sym name="content_copy" size={18} color={MUTED_ICON} /></span>
                )}
                <span
                  ref={setTargetRef('ar-btn')}
                  className={[
                    'moata-model-viewer-demo__icon-btn',
                    show3D ? 'is-active' : '',
                    arHovered ? 'is-hovered' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <Sym name="view_in_ar" size={18} />
                </span>
              </div>
            </div>

            {!show3D && (
              <div className="moata-model-viewer-demo__layer-list">
                {MODELS.map((model) => (
                  <div
                    key={model.id}
                    className={[
                      'moata-model-viewer-demo__layer-item',
                      model.id === 'v2' ? 'is-selected' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <Sym name="home" size={16} color={model.id === 'v2' ? '#111827' : '#6b7280'} />
                    <span>{model.name}</span>
                  </div>
                ))}
              </div>
            )}

            {show3D && (
              <div className="moata-model-viewer-demo__scroll">
                <div ref={scrollRef} className="moata-model-viewer-demo__scroll-inner">
                  <div className="moata-model-viewer-demo__section">
                    <div className="moata-model-viewer-demo__section-head">
                      ACC Model Viewer
                      <Sym name="expand_more" size={18} color={MUTED_ICON} />
                    </div>
                    <div className="moata-model-viewer-demo__section-body">
                      <AccModelViewport
                        className="moata-model-viewer-demo__viewport"
                        anchorClassName="moata-model-viewer-demo__column-anchor"
                        visible={visible}
                        hoverColumn={step.hoverColumn}
                        activeRing={step.activeRing}
                        focusId={step.focusId}
                        viewMode={step.viewMode}
                        rotating={step.rotate}
                        setTargetRef={setTargetRef}
                        overlay={
                          commentPlaced && visible.includes('v2') ? (
                            <div className="moata-model-viewer-demo__viewport-comment" aria-hidden="true">
                              <span className="moata-model-viewer-demo__comment-pin">SP</span>
                            </div>
                          ) : null
                        }
                      />
                      <div className="moata-model-viewer-demo__slider-wrap">
                        <div ref={setTargetRef('slider')} className="moata-model-viewer-demo__slider-track">
                          <div className="moata-model-viewer-demo__slider-fill" style={{ width: `${slider}%` }} />
                          <div className="moata-model-viewer-demo__slider-thumb" style={{ left: `${slider}%` }} />
                        </div>
                        <div className="moata-model-viewer-demo__slider-labels">
                          <span>01.01.2015</span>
                          <strong>{sliderDate(slider)}</strong>
                          <span>01.06.2022</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div ref={setTargetRef('version-section')} className="moata-model-viewer-demo__section">
                    <div className="moata-model-viewer-demo__section-head">
                      Version Control
                      <Sym name="expand_more" size={18} color={MUTED_ICON} />
                    </div>
                    <div className="moata-model-viewer-demo__section-body">
                      <div
                        ref={setTargetRef('version-select')}
                        className={`moata-model-viewer-demo__select ${step.versionOpen ? 'is-open' : ''}`.trim()}
                      >
                        <span className="moata-model-viewer-demo__select-label">Selected</span>
                        <div className="moata-model-viewer-demo__select-value">
                          <span className="moata-model-viewer-demo__select-value-text">
                            {visible.length === MODELS.length ? 'All Models' : `${visible.length} Selected`}
                          </span>
                          <span className="moata-model-viewer-demo__select-chevron">
                            <Sym name="keyboard_arrow_down" size={18} color={MUTED_ICON} />
                          </span>
                        </div>
                        {step.versionOpen && (
                          <div className="moata-model-viewer-demo__select-menu">
                            {MODELS.map((model) => (
                              <div
                                key={model.id}
                                className={[
                                  'moata-model-viewer-demo__select-item',
                                  model.id === 'v2' && step.versionOpen ? 'is-hovered' : '',
                                ].filter(Boolean).join(' ')}
                              >
                                <div className="moata-model-viewer-demo__select-item-meta">
                                  <strong>{model.name}</strong>
                                  <span>{model.date}</span>
                                </div>
                                <span
                                  className={`moata-model-viewer-demo__checkbox ${visible.includes(model.id) ? 'is-checked' : ''}`.trim()}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <svg
          className={`moata-model-viewer-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default MoataModelViewerDemo;

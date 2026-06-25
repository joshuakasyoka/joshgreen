import React, { useEffect, useRef, useState, useCallback } from 'react';
import EmmaGisMap from './EmmaGisMap';
import './EmmaGisDemoShared.css';

export const ICON = '#666';
export const ICON_SIZE = 18;
export const EMMA_ICON = '#85868F';

export const Sym = ({ name, size = ICON_SIZE, fill = 1, color }) => (
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

export const MgoBadge = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#101223" />
    <path d="M7.35 16.95L10.5 13.8C11.4 12.9 11.4 11.1 10.5 10.2L7.32 7.05L6 8.4L8.7 11.1H5.1V12.9H8.7L6 15.6L7.35 16.95Z" fill="#fff" />
    <path d="M18.73 13.62L14.43 12.46C13.2 12.13 11.64 13.03 11.31 14.26L10.17 18.59L12 19.06L12.99 15.37L14.79 18.49L16.35 17.59L14.55 14.47L18.24 15.46L18.73 13.62Z" fill="#fff" />
    <path d="M10.16 5.43L11.31 9.74C11.64 10.97 13.2 11.87 14.43 11.54L18.74 10.36L18.23 8.54L14.55 9.53L16.35 6.41L14.79 5.51L12.99 8.63L12 4.94L10.16 5.43Z" fill="#fff" />
  </svg>
);

export const LayerCheckbox = ({ checked }) => (
  <span className={`emma-gis-demo__layer-check ${checked ? 'is-checked' : ''}`.trim()} aria-hidden="true">
    {checked && <Sym name="check" size={12} color="#fff" />}
  </span>
);

export const LayerRow = ({ name, type = 'raster', checked, depth = 0, expanded, isGroup, highlight, innerRef, animateIn }) => (
  <div
    ref={innerRef}
    className={[
      'emma-gis-demo__layer-row',
      highlight ? 'is-highlight' : '',
      isGroup ? 'is-group' : '',
      animateIn ? 'is-entering' : '',
    ].filter(Boolean).join(' ')}
    style={{ paddingLeft: `${8 + depth * 14}px` }}
  >
    {isGroup ? (
      <span className="emma-gis-demo__layer-chevron">
        <Sym name={expanded ? 'expand_more' : 'chevron_right'} size={14} color={ICON} />
      </span>
    ) : (
      <span className="emma-gis-demo__layer-chevron emma-gis-demo__layer-chevron--spacer" />
    )}
    <Sym name={type === 'group' ? 'folder' : 'grid_on'} size={14} color={ICON} fill={0} />
    <span className="emma-gis-demo__layer-name">{name}</span>
    <LayerCheckbox checked={checked} />
  </div>
);

export const EmmaLayerCard = ({ title, body, highlight, visible = true }) => (
  <div className={`emma-gis-demo__layer-card emma-gis-demo__msg ${visible ? 'is-visible' : ''} ${highlight ? 'is-highlight' : ''}`.trim()}>
    <div className="emma-gis-demo__layer-card-text">
      <strong>{title}</strong>
      <span>{body}</span>
    </div>
    <Sym name="layers" size={20} color={EMMA_ICON} />
  </div>
);

export const EmmaActionCard = ({ title, body, apis = [], expanded, highlight, icon = 'expand_more', visible = true, toggleRef }) => (
  <div className={`emma-gis-demo__action-card emma-gis-demo__msg ${visible ? 'is-visible' : ''} ${highlight ? 'is-highlight' : ''}`.trim()}>
    <div className="emma-gis-demo__action-card-head">
      <div className="emma-gis-demo__action-card-text">
        <strong>{title}</strong>
        <span>{body}</span>
      </div>
      <span ref={toggleRef} className="emma-gis-demo__action-card-toggle">
        <Sym name={expanded ? 'expand_less' : icon} size={20} color={EMMA_ICON} />
      </span>
    </div>
    <div className={`emma-gis-demo__action-card-apis-wrap ${expanded ? 'is-expanded' : ''}`.trim()}>
      <ul className="emma-gis-demo__action-card-apis">
        {apis.map((api) => (
          <li key={api}>{api}</li>
        ))}
      </ul>
    </div>
  </div>
);

export const EmmaPermissionCard = ({
  title = 'Add Transport Network to layer tree',
  command = 'addLayerGroup("Transport Network")',
  status = 'pending',
  highlight = false,
  allowHover = false,
  allowSelected = false,
  allowRef,
  denyRef,
  visible = true,
}) => {
  const isPending = status === 'pending';
  const isApproved = status === 'approved';
  const isDenied = status === 'denied';

  return (
    <div
      className={[
        'emma-gis-demo__permission-card',
        'emma-gis-demo__msg',
        visible ? 'is-visible' : '',
        highlight ? 'is-highlight' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="emma-gis-demo__permission-card-head">
        <strong className="emma-gis-demo__permission-card-title">{title}</strong>
        {isApproved && <span className="emma-gis-demo__permission-card-status">Allowed</span>}
        {isDenied && <span className="emma-gis-demo__permission-card-status">Denied</span>}
      </div>

      <div className="emma-gis-demo__permission-card-command">
        <pre>
          <span className="emma-gis-demo__permission-card-prompt">$ </span>
          {command}
        </pre>
      </div>

      {isPending && (
        <div className="emma-gis-demo__permission-card-actions">
          <span ref={denyRef} className="emma-gis-demo__permission-btn emma-gis-demo__permission-btn--deny">
            Deny
          </span>
          <span
            ref={allowRef}
            className={[
              'emma-gis-demo__permission-btn',
              'emma-gis-demo__permission-btn--allow',
              allowHover ? 'is-hover' : '',
              allowSelected ? 'is-selected' : '',
            ].filter(Boolean).join(' ')}
          >
            Allow
          </span>
        </div>
      )}
    </div>
  );
};

export const EmmaAiBubble = ({ children, visible = true }) => (
  <div className={`emma-gis-demo__bubble-ai emma-gis-demo__msg ${visible ? 'is-visible' : ''}`.trim()}>{children}</div>
);

export const EmmaUserBubble = ({ children, visible = true }) => (
  <div className={`emma-gis-demo__bubble-user emma-gis-demo__msg ${visible ? 'is-visible' : ''}`.trim()}>{children}</div>
);

export const EmmaThinking = ({ visible }) => (
  <div className={`emma-gis-demo__thinking emma-gis-demo__msg ${visible ? 'is-visible' : ''}`.trim()}>
    <span className="emma-gis-demo__thinking-dot" />
    EMMA is thinking…
  </div>
);

export const DemoCursor = ({ x, y, visible }) => (
  <svg
    className={`emma-gis-demo__cursor ${visible ? 'is-visible' : ''}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
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
);

export const useDemoAnimation = (steps, containerRef) => {
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });

  const step = steps[stepIndex];

  const setTargetRef = useCallback((key) => (node) => {
    if (node) targetRefs.current[key] = node;
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (!running) return undefined;

    const updateCursor = () => {
      const container = containerRef.current;
      if (!container || !step.target) {
        setCursor((prev) => ({ ...prev, visible: Boolean(step.target) }));
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
  }, [step, running, containerRef]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % steps.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration, steps.length]);

  return { step, stepIndex, cursor, setTargetRef, running };
};

export const GisDemoWindow = ({ children, containerRef, cursor, className = '', style }) => (
  <div className={`emma-gis-demo ${className}`.trim()} style={style}>
    <div className="emma-gis-demo__window" ref={containerRef}>
      <div className="emma-gis-demo__browser-bar">
        <span className="emma-gis-demo__dot emma-gis-demo__dot--red" />
        <span className="emma-gis-demo__dot emma-gis-demo__dot--yellow" />
        <span className="emma-gis-demo__dot emma-gis-demo__dot--green" />
        <span className="emma-gis-demo__url">geospatial.mottmac.com/sample</span>
      </div>
      {children}
      <DemoCursor x={cursor.x} y={cursor.y} visible={cursor.visible} />
    </div>
  </div>
);

export const EmmaRail = ({ railBtnRef }) => (
  <div className="emma-gis-demo__emma-rail" aria-hidden="true">
    <span ref={railBtnRef} className="emma-gis-demo__emma-rail-btn"><Sym name="dock_to_left" color={ICON} /></span>
    <span className="emma-gis-demo__emma-rail-btn"><Sym name="chat_add_on" color={ICON} fill={0} /></span>
    <span className="emma-gis-demo__emma-rail-spacer" />
    <span className="emma-gis-demo__emma-rail-badge"><MgoBadge /></span>
  </div>
);

export const EmmaChatShell = ({
  title,
  children,
  open = true,
  inputValue = '',
  inputActive,
  sendActive,
  inputWrapRef,
  sendRef,
}) => (
  <aside className={`emma-gis-demo__emma-panel ${open ? 'is-open' : ''}`.trim()} aria-hidden="true">
    <div className="emma-gis-demo__emma-panel-inner">
      <div className="emma-gis-demo__emma-header">
        <span className="emma-gis-demo__emma-title">{title}</span>
        <Sym name="close" color={ICON} />
      </div>
      <div className="emma-gis-demo__emma-thread">{children}</div>
      <div ref={inputWrapRef} className="emma-gis-demo__emma-input-wrap">
        <div className={`emma-gis-demo__emma-input ${inputActive || inputValue ? 'is-active' : ''}`.trim()}>
          {inputValue ? (
            <span className="emma-gis-demo__emma-typed">{inputValue}</span>
          ) : (
            <span className="emma-gis-demo__emma-placeholder">Ask Emma</span>
          )}
          <span ref={sendRef} className={`emma-gis-demo__emma-send ${sendActive ? 'is-active' : ''}`.trim()}>
            <Sym name="arrow_upward" size={16} color="#fff" />
          </span>
        </div>
        <p className="emma-gis-demo__emma-disclaimer">EMMA can make mistakes. Check important info.</p>
      </div>
    </div>
  </aside>
);

export const LayersPanel = ({ children }) => (
  <aside className="emma-gis-demo__layers-panel" aria-hidden="true">
    <div className="emma-gis-demo__layers-header">
      <strong>Sample</strong>
      <span>Project Space</span>
    </div>
    <div className="emma-gis-demo__layers-tabs">
      <span className="emma-gis-demo__layers-tab is-active">Layers</span>
      <span className="emma-gis-demo__layers-tab">Graphics</span>
    </div>
    <div className="emma-gis-demo__layer-list">{children}</div>
  </aside>
);

export const MapArea = ({ pan = 0, mapMode = 'default', children }) => (
  <div className="emma-gis-demo__map-shell">
    <div className="emma-gis-demo__content">
      <EmmaGisMap pan={pan} mode={mapMode} />
      {children}
      <div className="emma-gis-demo__map-bar" aria-hidden="true">
        <div className="emma-gis-demo__toolbar">
          {['arrow_selector_tool', 'fiber_manual_record', 'circle', 'draw', 'image', 'chat_bubble'].map((icon, index) => (
            <span key={icon} className={`emma-gis-demo__tool ${index === 0 ? 'is-active' : ''}`.trim()}>
              <Sym name={icon} color={index === 0 ? '#111827' : ICON} fill={index === 5 ? 0 : 1} />
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

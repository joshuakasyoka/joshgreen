import React, { useEffect, useRef, useState } from 'react';
import './MoataAppOverviewDemo.css';

const MAP_BG = `${process.env.PUBLIC_URL}/images/moata/map-overview.webp`;
const MAP_TOOLS = ['arrow_selector_tool', 'fiber_manual_record', 'circle', 'draw', 'image', 'chat_bubble'];
const MAP_CONTROLS_COLLAPSED = ['chevron_left', 'my_location'];

const EMMA_CHAT = {
  title: 'Substation siting — northern corridor',
  user: 'Assessing a proposed substation site in the northern corridor. Need to understand road access for heavy plant and any rail proximity for the EMF exclusion zone.',
  ai: 'I can calculate HGV access routes on the classified road network and measure standoff distances from operational rail lines — flagging any crossings that would need Network Rail consultation. Do you want me to bring the transport and rail layers forward?',
};

const STEPS = [
  { emmaOpen: false, pan: 0, duration: 1600 },
  { emmaOpen: true, pan: 0, duration: 3200 },
  { emmaOpen: true, pan: 1, duration: 2800 },
  { emmaOpen: true, pan: 2, duration: 2600 },
  { emmaOpen: false, pan: 0, duration: 1200 },
  { phase: 'idle', emmaOpen: false, pan: 0, duration: 900 },
];

const ICON = '#666';
const ICON_SIZE = 18;

const Sym = ({ name, size = ICON_SIZE, fill = 1, color }) => (
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

/** MGO badge — custom logo; all other icons use Material Symbols */
const MgoBadge = () => (
  <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#101223" />
    <path d="M7.35 16.95L10.5 13.8C11.4 12.9 11.4 11.1 10.5 10.2L7.32 7.05L6 8.4L8.7 11.1H5.1V12.9H8.7L6 15.6L7.35 16.95Z" fill="#fff" />
    <path d="M18.73 13.62L14.43 12.46C13.2 12.13 11.64 13.03 11.31 14.26L10.17 18.59L12 19.06L12.99 15.37L14.79 18.49L16.35 17.59L14.55 14.47L18.24 15.46L18.73 13.62Z" fill="#fff" />
    <path d="M10.16 5.43L11.31 9.74C11.64 10.97 13.2 11.87 14.43 11.54L18.74 10.36L18.23 8.54L14.55 9.53L16.35 6.41L14.79 5.51L12.99 8.63L12 4.94L10.16 5.43Z" fill="#fff" />
  </svg>
);

const MoataAppOverviewDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const emmaOpen = step.emmaOpen ?? false;
  const panClass = `is-pan-${step.pan ?? 0}`;

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

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-app-overview-demo ${className}`.trim()} style={style}>
      <div className="moata-app-overview-demo__window" ref={containerRef}>
        <div className="moata-app-overview-demo__browser-bar">
          <span className="moata-app-overview-demo__dot moata-app-overview-demo__dot--red" />
          <span className="moata-app-overview-demo__dot moata-app-overview-demo__dot--yellow" />
          <span className="moata-app-overview-demo__dot moata-app-overview-demo__dot--green" />
          <span className="moata-app-overview-demo__url">geospatial.mottmac.com/sample</span>
        </div>

        <div className="moata-app-overview-demo__workspace">
          <div className="moata-app-overview-demo__emma-rail" aria-hidden="true">
            <span className="moata-app-overview-demo__emma-rail-btn">
              <Sym name="dock_to_left" color={ICON} />
            </span>
            <span className="moata-app-overview-demo__emma-rail-btn">
              <Sym name="chat_add_on" color={ICON} fill={0} />
            </span>
            <span className="moata-app-overview-demo__emma-rail-spacer" />
            <span className="moata-app-overview-demo__emma-rail-badge">
              <MgoBadge />
            </span>
          </div>

          <aside
            className={`moata-app-overview-demo__emma-panel ${emmaOpen ? 'is-open' : ''}`.trim()}
            aria-hidden="true"
          >
            <div className="moata-app-overview-demo__emma-panel-inner">
              <div className="moata-app-overview-demo__emma-header">
                <span className="moata-app-overview-demo__emma-title">{EMMA_CHAT.title}</span>
                <Sym name="close" color={ICON} />
              </div>

              <div className="moata-app-overview-demo__emma-thread">
                <div className="moata-app-overview-demo__emma-bubble moata-app-overview-demo__emma-bubble--user">
                  {EMMA_CHAT.user}
                </div>
                <div className="moata-app-overview-demo__emma-reply">
                  <p>{EMMA_CHAT.ai}</p>
                  <div className="moata-app-overview-demo__emma-actions">
                    <Sym name="content_copy" color={ICON} fill={0} />
                    <Sym name="thumb_up" color={ICON} fill={0} />
                    <Sym name="thumb_down" color={ICON} fill={0} />
                    <Sym name="flag" color={ICON} fill={0} />
                  </div>
                </div>
              </div>

              <div className="moata-app-overview-demo__emma-input-wrap">
                <div className="moata-app-overview-demo__emma-input">
                  <span className="moata-app-overview-demo__emma-placeholder">Ask EMMA questions and explore</span>
                  <span className="moata-app-overview-demo__emma-send">
                    <Sym name="arrow_upward" size={16} color="#fff" />
                  </span>
                </div>
                <p className="moata-app-overview-demo__emma-disclaimer">EMMA can make mistakes. Check important info.</p>
              </div>
            </div>
          </aside>

          <div className="moata-app-overview-demo__map-shell">
            <div className="moata-app-overview-demo__content">
              <div
                className={`moata-app-overview-demo__map ${panClass}`.trim()}
                style={{ backgroundImage: `url(${MAP_BG})` }}
                aria-hidden="true"
              />
              <span className="moata-app-overview-demo__pin moata-app-overview-demo__pin--a">SP</span>
              <span className="moata-app-overview-demo__pin moata-app-overview-demo__pin--b">TS</span>

              <div className="moata-app-overview-demo__float-right" aria-hidden="true">
                <span className="moata-app-overview-demo__float-right-chip">
                  <Sym name="side_navigation" color={ICON} fill={1} />
                </span>
              </div>

              <div className="moata-app-overview-demo__map-bar" aria-hidden="true">
                <div className="moata-app-overview-demo__toolbar">
                  {MAP_TOOLS.map((icon, index) => (
                    <span
                      key={icon}
                      className={`moata-app-overview-demo__tool ${index === 0 ? 'is-active' : ''}`.trim()}
                    >
                      <Sym name={icon} color={index === 0 ? '#111827' : ICON} fill={index === 5 ? 0 : 1} />
                    </span>
                  ))}
                </div>
                <div className="moata-app-overview-demo__map-controls">
                  {MAP_CONTROLS_COLLAPSED.map((sym) => (
                    <span key={sym} className="moata-app-overview-demo__map-control-btn">
                      <Sym name={sym} color={ICON} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoataAppOverviewDemo;

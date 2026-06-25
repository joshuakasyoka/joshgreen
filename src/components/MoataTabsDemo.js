import React, { useEffect, useRef, useState } from 'react';
import './MoataTabsDemo.css';

const TABS = [
  { id: 'layers', label: 'Layers', icon: 'layers' },
  { id: 'tools', label: 'Tools', icon: 'home_repair_service' },
  { id: 'comments', label: 'Comments', icon: 'forum' },
];

const STEPS = [
  { activeTab: 'layers', target: 'tab-tools', duration: 1600 },
  { activeTab: 'tools', target: 'tab-tools', duration: 1400 },
  { activeTab: 'tools', target: 'tab-comments', duration: 1600 },
  { activeTab: 'comments', target: 'tab-comments', duration: 1800 },
  { activeTab: 'comments', target: 'add-tab', addMenu: true, duration: 1400 },
  { activeTab: 'layers', target: 'tab-layers', duration: 1200 },
  { phase: 'idle', duration: 1000 },
];

const MUTED_ICON = 'rgba(0, 0, 0, 0.54)';

const Sym = ({ name, size = 16, fill = 1, color }) => (
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

const MoataTabsDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';
  const activeTab = step.activeTab || 'layers';

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
    <div className={`moata-tabs-demo ${className}`.trim()} style={style}>
      <div className="moata-tabs-demo__stage" ref={containerRef}>
        <div className="moata-tabs-demo__panel">
          <div className="moata-tabs-demo__tabs">
            <span className="moata-tabs-demo__collapse">
              <Sym name="keyboard_double_arrow_right" size={16} color="#6b7280" />
            </span>

            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                ref={setTargetRef(`tab-${tab.id}`)}
                className={`moata-tabs-demo__tab ${
                  activeTab === tab.id ? 'is-active' : ''
                } ${step.target === `tab-${tab.id}` ? 'is-targeted' : ''}`}
              >
                <Sym name={tab.icon} size={14} color={activeTab === tab.id ? '#111827' : '#9ca3af'} />
                {tab.label}
                {activeTab === tab.id && (
                  <Sym name="close" size={11} color="#9ca3af" />
                )}
              </button>
            ))}

            <button
              type="button"
              ref={setTargetRef('add-tab')}
              className={`moata-tabs-demo__add ${step.target === 'add-tab' ? 'is-targeted' : ''}`}
              aria-label="Add tab"
            >
              <Sym name="add" size={15} color="#6b7280" />
            </button>
          </div>

          {step.addMenu && (
            <div className="moata-tabs-demo__menu">
              {['Asset', 'Shape', 'Reports'].map((label) => (
                <div key={label} className="moata-tabs-demo__menu-item">
                  <Sym name="bar_chart" size={14} color={MUTED_ICON} />
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>

        <svg
          className={`moata-tabs-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default MoataTabsDemo;

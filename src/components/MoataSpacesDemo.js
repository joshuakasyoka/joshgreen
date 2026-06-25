import React, { useEffect, useRef, useState } from 'react';
import './MoataSpacesDemo.css';

const PURPLE = '#7939F7';
const MUTED = 'rgba(0, 0, 0, 0.54)';

const SPACES = [
  {
    id: 'sample',
    name: 'Sample',
    subtitle: 'Project Space',
    icon: 'security',
    layers: [
      { name: 'Mott MacDonald Offices', checked: true },
      { name: 'Editable Data', checked: false },
      { name: 'Primary Structure Group', checked: true },
      { name: 'Example 3D Models', checked: true },
    ],
  },
  {
    id: 'battersea',
    name: 'Battersea Power Station',
    subtitle: 'Infrastructure Review',
    icon: 'apartment',
    layers: [
      { name: 'Site Boundary', checked: true },
      { name: 'Utilities Network', checked: true },
      { name: 'Flood Risk Zones', checked: false },
      { name: 'Transport Links', checked: true },
    ],
  },
  {
    id: 'crossrail',
    name: 'Crossrail Package',
    subtitle: 'Shared Workspace',
    icon: 'groups',
    layers: [
      { name: 'Alignment Corridor', checked: true },
      { name: 'Ground Movement', checked: true },
      { name: 'Station Assets', checked: false },
    ],
  },
];

const STEPS = [
  { spaceId: 'sample', menuOpen: false, target: 'space-trigger', duration: 1600 },
  { spaceId: 'sample', menuOpen: true, target: 'space-trigger', duration: 1400 },
  { spaceId: 'sample', menuOpen: true, target: 'space-battersea', hoverId: 'battersea', duration: 1600 },
  { spaceId: 'battersea', menuOpen: false, target: 'space-battersea', duration: 1800 },
  { phase: 'idle', spaceId: 'battersea', menuOpen: false, duration: 1200 },
];

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

const LayerCheckbox = ({ checked }) => (
  <span className={`moata-spaces-demo__checkbox ${checked ? 'is-checked' : ''}`.trim()} aria-hidden="true">
    {checked && <Sym name="check" size={12} color="#fff" />}
  </span>
);

const MoataSpacesDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';
  const space = SPACES.find((item) => item.id === step.spaceId) || SPACES[0];
  const menuOpen = Boolean(step.menuOpen);

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
    const layoutTimer = window.setTimeout(updateCursor, menuOpen ? 120 : 0);
    window.addEventListener('resize', updateCursor);
    return () => {
      window.clearTimeout(layoutTimer);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running, isIdle, menuOpen, space.id]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-spaces-demo ${className}`.trim()} style={style}>
      <div className="moata-spaces-demo__stage" ref={containerRef}>
        <aside className="moata-spaces-demo__panel" aria-hidden="true">
          <div className="moata-spaces-demo__project-wrap">
            <button
              type="button"
              ref={setTargetRef('space-trigger')}
              className={[
                'moata-spaces-demo__project-head',
                step.target === 'space-trigger' ? 'is-hovered' : '',
                menuOpen ? 'is-open' : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="moata-spaces-demo__project-avatar">
                <Sym name={space.icon} size={16} color="#6b7280" />
              </span>
              <span className="moata-spaces-demo__project-meta">
                <strong>{space.name}</strong>
                <span>{space.subtitle}</span>
              </span>
              <Sym
                name={menuOpen ? 'expand_less' : 'expand_more'}
                size={16}
                color={MUTED}
              />
              <Sym name="more_vert" size={16} color={MUTED} />
            </button>

            {menuOpen && (
              <div className="moata-spaces-demo__menu">
                {SPACES.map((item) => {
                  const isActive = item.id === step.spaceId && !step.hoverId;
                  const isHovered = step.hoverId === item.id || step.target === `space-${item.id}`;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      ref={setTargetRef(`space-${item.id}`)}
                      className={[
                        'moata-spaces-demo__menu-item',
                        isActive ? 'is-active' : '',
                        isHovered ? 'is-hovered' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      <span className="moata-spaces-demo__menu-avatar">
                        <Sym name={item.icon} size={16} color="#6b7280" />
                      </span>
                      <span className="moata-spaces-demo__menu-copy">
                        <strong>{item.name}</strong>
                        <span>{item.subtitle}</span>
                      </span>
                      {item.id === step.spaceId && (
                        <Sym name="check" size={16} color={PURPLE} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="moata-spaces-demo__tabs">
            <span className="moata-spaces-demo__tab is-active">Layers</span>
            <span className="moata-spaces-demo__tab">Graphics</span>
          </div>

          <div className="moata-spaces-demo__search">
            <span className="moata-spaces-demo__search-icon">
              <Sym name="search" size={15} color="#9ca3af" />
            </span>
            <span className="moata-spaces-demo__search-placeholder">Search layers...</span>
            <span className="moata-spaces-demo__search-add">
              <Sym name="add" size={16} color={MUTED} />
            </span>
          </div>

          <div className="moata-spaces-demo__layer-list" key={space.id}>
            {space.layers.map((layer) => (
              <div key={layer.name} className="moata-spaces-demo__layer-row">
                <Sym name="folder" size={15} color={MUTED} />
                <span className="moata-spaces-demo__layer-name">{layer.name}</span>
                <LayerCheckbox checked={layer.checked} />
              </div>
            ))}
          </div>

          <div className="moata-spaces-demo__footer">
            <label className="moata-spaces-demo__toggle">
              <span className="moata-spaces-demo__toggle-track">
                <span className="moata-spaces-demo__toggle-thumb" />
              </span>
              <span>Visible Layers Only</span>
            </label>
          </div>
        </aside>

        <svg
          className={`moata-spaces-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default MoataSpacesDemo;

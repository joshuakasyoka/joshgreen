import React, { useEffect, useRef, useState } from 'react';
import {
  MUTED_ICON,
  ModelViewport,
  Sym,
} from './moata3dPanelShared';
import './Moata3dAssetSelectDemo.css';

const STEPS = [
  { panel: null, target: 'layer-column', duration: 1400 },
  { panel: null, target: 'layer-column', hoverColumn: true, duration: 1200 },
  { panel: 'column', show3D: false, target: 'ar-btn', duration: 1600 },
  { panel: 'column', show3D: true, target: 'ar-btn', duration: 1200 },
  { panel: 'column', show3D: true, target: 'viewport', rotate: true, duration: 2200 },
  { phase: 'idle', panel: 'column', show3D: true, duration: 1200 },
];

const LayerCheckbox = ({ checked }) => (
  <span className={`moata-3d-asset-select-demo__checkbox ${checked ? 'is-checked' : ''}`.trim()} aria-hidden="true">
    {checked && <Sym name="check" size={12} color="#fff" />}
  </span>
);

const Moata3dAssetSelectDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';
  const isColumn = step.panel === 'column';
  const panelOpen = Boolean(step.panel);
  const show3D = step.show3D === true;

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
    const panelTimer = window.setTimeout(updateCursor, panelOpen ? 620 : 0);
    window.addEventListener('resize', updateCursor);
    return () => {
      window.clearTimeout(layoutTimer);
      window.clearTimeout(panelTimer);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running, isIdle, panelOpen]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-3d-asset-select-demo ${className}`.trim()} style={style}>
      <div className="moata-3d-asset-select-demo__stage" ref={containerRef}>
        <div className={`moata-3d-asset-select-demo__layout ${panelOpen ? 'has-panel' : ''}`.trim()}>
          <div className="moata-3d-asset-select-demo__layers">
            <div className="moata-3d-asset-select-demo__project-head">
              <span className="moata-3d-asset-select-demo__project-avatar">
                <Sym name="security" size={16} color="#6b7280" />
              </span>
              <span className="moata-3d-asset-select-demo__project-meta">
                <strong>Sample</strong>
                <span>Project Space</span>
              </span>
              <Sym name="expand_more" size={16} color={MUTED_ICON} />
              <Sym name="more_vert" size={16} color={MUTED_ICON} />
            </div>

            <div className="moata-3d-asset-select-demo__side-tabs">
              <span className="moata-3d-asset-select-demo__side-tab is-active">Layers</span>
              <span className="moata-3d-asset-select-demo__side-tab">Graphics</span>
            </div>

            <div className="moata-3d-asset-select-demo__search">
              <Sym name="search" size={16} color="#9ca3af" />
              <span>Search layers...</span>
            </div>

            <div className="moata-3d-asset-select-demo__layer-list">
              <div className="moata-3d-asset-select-demo__layer-row">
                <Sym name="expand_more" size={16} color={MUTED_ICON} />
                <Sym name="folder" size={15} color={MUTED_ICON} />
                <span className="moata-3d-asset-select-demo__layer-name">Primary Structure Group</span>
                <LayerCheckbox checked />
                <Sym name="more_vert" size={15} color={MUTED_ICON} />
              </div>

              <div
                ref={setTargetRef('layer-column')}
                className={[
                  'moata-3d-asset-select-demo__layer-row',
                  'is-child',
                  step.hoverColumn || isColumn ? 'is-hovered' : '',
                  isColumn ? 'is-selected' : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="moata-3d-asset-select-demo__layer-spacer" />
                <Sym name="layers" size={15} color={isColumn ? '#111827' : MUTED_ICON} />
                <span className="moata-3d-asset-select-demo__layer-name">Circular RC Column</span>
                <LayerCheckbox checked />
                <Sym name="more_vert" size={15} color={MUTED_ICON} />
              </div>

              <div className="moata-3d-asset-select-demo__layer-row is-child is-muted">
                <span className="moata-3d-asset-select-demo__layer-spacer" />
                <Sym name="grid_on" size={15} color={MUTED_ICON} />
                <span className="moata-3d-asset-select-demo__layer-name">Example 3D Models</span>
                <LayerCheckbox checked />
                <Sym name="more_vert" size={15} color={MUTED_ICON} />
              </div>
            </div>

            <div className="moata-3d-asset-select-demo__layers-foot">
              <span>Visible Layers Only</span>
              <span className="moata-3d-asset-select-demo__toggle is-on" />
            </div>
          </div>

          <div className={`moata-3d-asset-select-demo__panel ${panelOpen ? 'is-visible' : ''}`.trim()}>
            <div className="moata-3d-asset-select-demo__panel-tabs">
              <span className="moata-3d-asset-select-demo__panel-tab-collapse">
                <Sym name="keyboard_double_arrow_right" size={16} color="#6b7280" />
              </span>
              <span className="moata-3d-asset-select-demo__panel-tab is-active">
                <Sym name="layers" size={16} color="#111827" />
                Layers
              </span>
              <span className="moata-3d-asset-select-demo__panel-tab-add">
                <Sym name="add" size={15} color="#6b7280" />
              </span>
            </div>

            <div className="moata-3d-asset-select-demo__panel-body">
              <div className="moata-3d-asset-select-demo__panel-header">
                <h4>Circular RC Column</h4>
                <p>Primary Structure Group</p>
                <div className="moata-3d-asset-select-demo__toolbar">
                  <span className="moata-3d-asset-select-demo__icon-btn"><Sym name="visibility" size={18} color={MUTED_ICON} /></span>
                  <span className="moata-3d-asset-select-demo__icon-btn"><Sym name="table_chart" size={18} color={MUTED_ICON} /></span>
                  <span className="moata-3d-asset-select-demo__icon-btn"><Sym name="my_location" size={18} color={MUTED_ICON} /></span>
                  <span className="moata-3d-asset-select-demo__icon-btn"><Sym name="content_copy" size={18} color={MUTED_ICON} /></span>
                  <span
                    ref={setTargetRef('ar-btn')}
                    className={[
                      'moata-3d-asset-select-demo__icon-btn',
                      show3D ? 'is-active' : '',
                      step.target === 'ar-btn' ? 'is-hovered' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <Sym name="view_in_ar" size={18} />
                  </span>
                </div>
              </div>

              {show3D && isColumn && (
                <div className="moata-3d-asset-select-demo__viewer-section">
                  <div className="moata-3d-asset-select-demo__viewer-head">
                    ACC Model Viewer
                    <Sym name="expand_more" size={18} color={MUTED_ICON} />
                  </div>
                  <div className="moata-3d-asset-select-demo__viewer-body">
                    <ModelViewport
                      visible={['v1', 'v2', 'v3']}
                      rotating={Boolean(step.rotate)}
                      setTargetRef={setTargetRef}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <svg
          className={`moata-3d-asset-select-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
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

export default Moata3dAssetSelectDemo;

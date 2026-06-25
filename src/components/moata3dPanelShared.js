import React, { useEffect, useRef, useState } from 'react';
import AccModelViewport from './AccModelViewport';
import './Moata3dPanelShared.css';

export const PURPLE = '#7939F7';
export const MUTED_ICON = 'rgba(0, 0, 0, 0.54)';

export const MODELS = [
  { id: 'v1', name: 'RC-COL-001', date: '12.08.2016', color: '#f44336', cutoff: 42 },
  { id: 'v2', name: 'RC-COL-002', date: '15.03.2018', color: '#4caf50', cutoff: 58 },
  { id: 'v3', name: 'RC-COL-003', date: '22.11.2020', color: '#ce93d8', cutoff: 82 },
];

export const PROPERTIES = [
  { label: 'Section Diameter', values: ['500mm', '600mm', '500mm'], diff: [1] },
  { label: 'Column Height', values: ['4.2m', '4.8m', '4.2m'], diff: [1] },
  { label: 'Concrete Grade', values: ['C30/37', 'C35/45', 'C35/45'], diff: [1, 2] },
  { label: 'Fire Rating', values: ['R60', 'R90', 'R90'], diff: [1, 2] },
];

export const sliderDate = (pct) => {
  if (pct >= 100) return '01.06.2022';
  if (pct >= 78) return '22.11.2020';
  if (pct >= 52) return '15.03.2018';
  return '12.08.2016';
};

export const Sym = ({ name, size = 18, fill = 1, color }) => (
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

export const ModelViewport = AccModelViewport;

export const TimelineSlider = ({ slider, setTargetRef }) => (
  <div className="moata-3d-panel__slider-wrap">
    <div ref={setTargetRef('slider')} className="moata-3d-panel__slider-track">
      <div className="moata-3d-panel__slider-fill" style={{ width: `${slider}%` }} />
      <div className="moata-3d-panel__slider-thumb" style={{ left: `${slider}%` }} />
    </div>
    <div className="moata-3d-panel__slider-labels">
      <span>01.01.2015</span>
      <strong>{sliderDate(slider)}</strong>
      <span>01.06.2022</span>
    </div>
  </div>
);

export const TimelineSliderRich = ({
  slider,
  visible,
  setTargetRef,
  scrubbing,
}) => (
  <div className="moata-3d-panel__timeline-rich">
    <div className="moata-3d-panel__timeline-pill">{sliderDate(slider)}</div>

    <div ref={setTargetRef('slider')} className="moata-3d-panel__timeline-track-wrap">
      <div className="moata-3d-panel__timeline-rail" />
      <div className="moata-3d-panel__timeline-fill" style={{ width: `${slider}%` }} />
      {MODELS.map((model) => (
        <span
          key={model.id}
          className={[
            'moata-3d-panel__timeline-milestone',
            visible.includes(model.id) ? 'is-active' : '',
            slider >= model.cutoff - 4 && slider <= model.cutoff + 4 ? 'is-near' : '',
          ].filter(Boolean).join(' ')}
          style={{ left: `${model.cutoff}%`, '--milestone-color': model.color }}
          aria-hidden="true"
        />
      ))}
      <div
        className={`moata-3d-panel__timeline-playhead ${scrubbing ? 'is-scrubbing' : ''}`.trim()}
        style={{ left: `${slider}%` }}
        aria-hidden="true"
      />
      <div
        className={`moata-3d-panel__timeline-thumb ${scrubbing ? 'is-scrubbing' : ''}`.trim()}
        style={{ left: `${slider}%` }}
        aria-hidden="true"
      />
    </div>

    <div className="moata-3d-panel__timeline-labels">
      <span>01.01.2015</span>
      <span>01.06.2022</span>
    </div>

    <div className="moata-3d-panel__timeline-versions">
      {MODELS.map((model) => (
        <span
          key={model.id}
          className={`moata-3d-panel__timeline-version ${visible.includes(model.id) ? 'is-visible' : ''}`.trim()}
          style={{ '--version-color': model.color }}
        >
          <span className="moata-3d-panel__timeline-version-dot" aria-hidden="true" />
          {model.name}
        </span>
      ))}
    </div>
  </div>
);

export const PropertiesTable = ({ visible, setTargetRef }) => {
  const visibleModels = MODELS.filter((model) => visible.includes(model.id));

  return (
    <div
      ref={setTargetRef('props-table')}
      className="moata-3d-panel__section-body moata-3d-panel__props"
    >
      {PROPERTIES.map((row) => (
        <div key={row.label} className="moata-3d-panel__prop-row">
          <span className="moata-3d-panel__prop-label">{row.label}:</span>
          {visibleModels.map((model) => {
            const modelIndex = MODELS.findIndex((item) => item.id === model.id);
            const value = row.values[modelIndex];
            const isDiff = row.diff.includes(modelIndex)
              && visibleModels.length > 1
              && visibleModels.some((other) => {
                const otherIndex = MODELS.findIndex((item) => item.id === other.id);
                return row.values[otherIndex] !== value;
              });
            return (
              <React.Fragment key={model.id}>
                <span className="moata-3d-panel__prop-pipe" style={{ background: model.color }} />
                <span className="moata-3d-panel__prop-val">
                  {isDiff ? (
                    <span
                      className="moata-3d-panel__prop-chip"
                      style={{ borderColor: model.color, color: model.color }}
                    >
                      {value}
                    </span>
                  ) : (
                    value
                  )}
                </span>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const IsolatedCard = ({ title, children, wide }) => (
  <div className={`moata-3d-panel__isolated ${wide ? 'is-wide' : ''}`.trim()}>
    {title && (
      <div className="moata-3d-panel__isolated-head">
        <span>{title}</span>
        <Sym name="expand_more" size={18} color={MUTED_ICON} />
      </div>
    )}
    <div className="moata-3d-panel__isolated-body">{children}</div>
  </div>
);

export const ViewerBlock = ({
  visible,
  slider = 100,
  rotating,
  hoverColumn,
  activeRing,
  focusId,
  viewMode = 'combined',
  setTargetRef,
  richTimeline,
  scrubbing,
  hideTimeline,
}) => (
  <IsolatedCard title="ACC Model Viewer">
    <ModelViewport
      visible={visible}
      hoverColumn={hoverColumn}
      activeRing={activeRing}
      focusId={focusId}
      viewMode={viewMode}
      rotating={rotating}
      setTargetRef={setTargetRef}
    />
    {!hideTimeline && (richTimeline ? (
      <TimelineSliderRich
        slider={slider}
        visible={visible}
        setTargetRef={setTargetRef}
        scrubbing={scrubbing}
      />
    ) : (
      <TimelineSlider slider={slider} setTargetRef={setTargetRef} />
    ))}
  </IsolatedCard>
);

export const VersionSelect = ({
  visible,
  versionOpen,
  hoveredVersion,
  setTargetRef,
}) => (
  <div
    ref={setTargetRef('version-select')}
    className={`moata-3d-panel__select ${versionOpen ? 'is-open' : ''}`.trim()}
  >
    <span className="moata-3d-panel__select-label">Selected</span>
    <div className="moata-3d-panel__select-value">
      <span className="moata-3d-panel__select-value-text">
        {visible.length === MODELS.length ? 'All Models' : `${visible.length} Selected`}
      </span>
      <span className="moata-3d-panel__select-chevron">
        <Sym name="keyboard_arrow_down" size={18} color={MUTED_ICON} />
      </span>
    </div>
    {versionOpen && (
      <div className="moata-3d-panel__select-menu">
        {MODELS.map((model) => (
          <div
            key={model.id}
            className={[
              'moata-3d-panel__select-item',
              hoveredVersion === model.id ? 'is-hovered' : '',
            ].filter(Boolean).join(' ')}
          >
            <div className="moata-3d-panel__select-item-meta">
              <strong>{model.name}</strong>
              <span>{model.date}</span>
            </div>
            <span
              className={`moata-3d-panel__checkbox ${visible.includes(model.id) ? 'is-checked' : ''}`.trim()}
            />
          </div>
        ))}
      </div>
    )}
  </div>
);

export const VersionControlBlock = ({
  visible,
  versionOpen,
  hoveredVersion,
  setTargetRef,
}) => (
  <IsolatedCard title="Version Control">
    <VersionSelect
      visible={visible}
      versionOpen={versionOpen}
      hoveredVersion={hoveredVersion}
      setTargetRef={setTargetRef}
    />
  </IsolatedCard>
);

export const PropertiesBlock = ({ visible, setTargetRef }) => (
  <IsolatedCard title="Properties" wide>
    <PropertiesTable visible={visible} setTargetRef={setTargetRef} />
  </IsolatedCard>
);

export const VersionPropertiesBlock = ({
  visible,
  versionOpen,
  hoveredVersion,
  setTargetRef,
}) => (
  <div className="moata-3d-panel__isolated moata-3d-panel__isolated-stack">
    <div className="moata-3d-panel__isolated-section">
      <div className="moata-3d-panel__isolated-head">
        <span>Version Control</span>
        <Sym name="expand_more" size={18} color={MUTED_ICON} />
      </div>
      <div className="moata-3d-panel__isolated-body">
        <VersionSelect
          visible={visible}
          versionOpen={versionOpen}
          hoveredVersion={hoveredVersion}
          setTargetRef={setTargetRef}
        />
      </div>
    </div>
    <div className="moata-3d-panel__isolated-section is-grow">
      <div className="moata-3d-panel__isolated-head">
        <span>Properties</span>
        <Sym name="expand_more" size={18} color={MUTED_ICON} />
      </div>
      <div className="moata-3d-panel__isolated-body">
        <PropertiesTable visible={visible} setTargetRef={setTargetRef} />
      </div>
    </div>
  </div>
);

export function useMoata3dDemo(steps) {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = steps[stepIndex];
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
    window.addEventListener('resize', updateCursor);
    return () => {
      window.clearTimeout(layoutTimer);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running, isIdle]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % steps.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration, steps.length]);

  return {
    containerRef,
    setTargetRef,
    step,
    cursor,
    isIdle,
  };
}

export const DemoCursor = ({ cursor }) => (
  <svg
    className={`moata-3d-panel__cursor ${cursor.visible ? 'is-visible' : ''}`}
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
);

export const DemoStage = ({ className = '', style, containerRef, children, cursor }) => (
  <div className={`moata-3d-panel ${className}`.trim()} style={style}>
    <div className="moata-3d-panel__stage" ref={containerRef}>
      <div className="moata-3d-panel__isolated-slot">{children}</div>
      <DemoCursor cursor={cursor} />
    </div>
  </div>
);

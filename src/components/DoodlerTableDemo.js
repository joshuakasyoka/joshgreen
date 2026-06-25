import React, { useEffect, useRef, useState } from 'react';
import './DoodlerTableDemo.css';

const COLUMNS = ['Krachten', 'Klachten', 'Inzichten', 'Aanpak'];

const ROWS = [
  { name: 'Intake', cells: ['added', 'added', 'empty', 'empty'], active: true },
  { name: 'Adviesgesprek', cells: ['empty', 'empty', 'empty', 'empty'], active: false },
  { name: 'Behandelplan', cells: ['empty', 'empty', 'empty', 'empty'], active: false },
  { name: 'Psycho-educatie', cells: ['empty', 'empty', 'empty', 'empty'], active: false },
  { name: 'Gespreksverslag', cells: ['empty', 'empty', 'empty', 'empty'], active: false },
];

const STEPS = [
  { kind: 'row', row: 0, duration: 1800 },
  { kind: 'cell', row: 0, col: 0, duration: 1400 },
  { kind: 'cell', row: 0, col: 2, duration: 1400 },
  { kind: 'row', row: 1, duration: 1600 },
  { kind: 'idle', duration: 1000 },
];

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CellIcon = ({ state, hovered }) => {
  if (!state || state === 'inactive') {
    return <span className="doodler-table-demo__inactive-dot" aria-hidden="true" />;
  }

  if (state === 'empty') {
    return (
      <span className={`doodler-table-demo__cell-btn doodler-table-demo__cell-btn--empty ${hovered ? 'is-hovered' : ''}`}>
        <PlusIcon />
      </span>
    );
  }

  return (
    <span className={`doodler-table-demo__cell-btn doodler-table-demo__cell-btn--checked ${hovered ? 'is-hovered' : ''}`}>
      <CheckIcon />
    </span>
  );
};

const DoodlerTableDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const hoveredRow = step.kind === 'row' ? step.row : step.kind === 'cell' ? step.row : null;
  const hoveredCell = step.kind === 'cell' ? { row: step.row, col: step.col } : null;

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
      if (!container) return;

      let key = 'title';
      if (step.kind === 'row') key = `row-${step.row}`;
      if (step.kind === 'cell') key = `cell-${step.row}-${step.col}`;

      const target = targetRefs.current[key];
      if (!target) {
        setCursor((prev) => ({ ...prev, visible: step.kind !== 'idle' }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setCursor({
        x: targetRect.left - containerRect.left + targetRect.width * 0.55,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: step.kind !== 'idle',
      });
    };

    updateCursor();
    window.addEventListener('resize', updateCursor);
    return () => window.removeEventListener('resize', updateCursor);
  }, [step, running]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`doodler-table-demo ${className}`.trim()} style={style}>
      <div className="doodler-table-demo__window" ref={containerRef}>
        <div className="doodler-table-demo__browser-bar">
          <span className="doodler-table-demo__dot doodler-table-demo__dot--red" />
          <span className="doodler-table-demo__dot doodler-table-demo__dot--yellow" />
          <span className="doodler-table-demo__dot doodler-table-demo__dot--green" />
          <span className="doodler-table-demo__url">doodler.app/cliëntoverzicht</span>
        </div>

        <div className="doodler-table-demo__content">
          <div className="doodler-table-demo__header">
            <span className="doodler-table-demo__logo">doodler</span>
            <span className="doodler-table-demo__cta">+ Nieuwe doodle</span>
          </div>

          <div className="doodler-table-demo__title-block" ref={setTargetRef('title')}>
            <h3 className="doodler-table-demo__title">Cliëntoverzicht</h3>
            <p className="doodler-table-demo__subtitle">
              Een overzicht van de doodles die jij en je cliënt samen hebben gemaakt tijdens het zorgtraject.
            </p>
          </div>

          <div className="doodler-table-demo__table-wrap">
            <table className="doodler-table-demo__table">
              <thead>
                <tr>
                  <th>Activiteit</th>
                  {COLUMNS.map((label) => (
                    <th key={label}>
                      <span className="doodler-table-demo__chip">{label}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, rowIndex) => {
                  const isRowHovered = hoveredRow === rowIndex;
                  const isInactive = !row.active;

                  return (
                    <tr
                      key={row.name}
                      ref={setTargetRef(`row-${rowIndex}`)}
                      className={[
                        'doodler-table-demo__row',
                        isInactive ? 'doodler-table-demo__row--inactive' : '',
                        isRowHovered ? 'is-hovered' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      <td className="doodler-table-demo__activity-cell">
                        <div className="doodler-table-demo__activity-inner">
                          {isInactive && (
                            <span className="doodler-table-demo__inactive-plus" aria-hidden="true">
                              <PlusIcon />
                            </span>
                          )}
                          <span className={isInactive ? 'doodler-table-demo__activity-name--muted' : ''}>
                            {row.name}
                          </span>
                          {isRowHovered && row.active && (
                            <span className="doodler-table-demo__open-btn">Open</span>
                          )}
                        </div>
                      </td>
                      {row.cells.map((cellState, colIndex) => {
                        const cellHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
                        return (
                          <td
                            key={`${row.name}-${COLUMNS[colIndex]}`}
                            ref={setTargetRef(`cell-${rowIndex}-${colIndex}`)}
                            className={cellHovered ? 'is-hovered' : ''}
                          >
                            <CellIcon
                              state={isInactive ? 'inactive' : cellState}
                              hovered={cellHovered}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div
            className={`doodler-table-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
            style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
            aria-hidden="true"
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path
                d="M1 1l4.2 16.2L7.5 11 14 9.5 1 1z"
                fill="#111"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoodlerTableDemo;

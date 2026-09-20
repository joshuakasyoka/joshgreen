import React, { useRef } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Equal,
  FolderOpen,
  Info,
  PanelLeft,
  Plus,
  TriangleRight,
  Zap,
} from 'lucide-react';
import { DemoCursor, useDemoAnimation } from './EmmaGisDemoShared';
import './MprAppDemos.css';

// Recreations of the Monthly Project Review app ("Project Excelsior" is the
// demo project). Three loops, one per configuration from the research:
// prompt the conversation, pre-fill and verify, capture and follow through.
// All figures and actions are illustrative.

const AGENDA = [
  ['last', "Last month's actions"],
  ['safety', 'Safety & wellbeing'],
  ['client', 'Client'],
  ['scope', 'Scope'],
  ['deliverables', 'Deliverables'],
  ['controls', 'Project controls'],
  ['actions', 'Actions arising'],
  ['lessons', 'Lessons learnt'],
  ['meeting', 'Meeting details'],
];

// ── Shell ──────────────────────────────────────────────────────────────

const MprWindow = ({ containerRef, cursor, tabs, sideTab = 'agenda', sidebar, children, toast, sourcesRef }) => (
  <div className="mpr-app">
    <div ref={containerRef} className="mpr-app__window">
      <div className="mpr-app__top">
        <PanelLeft size={17} strokeWidth={1.7} />
        <strong>Project Excelsior</strong>
        <Info size={17} strokeWidth={1.7} className="mpr-app__info" />
      </div>
      <div className="mpr-app__frame">
        <div className="mpr-app__tabs">
          <FolderOpen size={16} strokeWidth={1.7} className="mpr-app__folder" />
          {tabs}
        </div>
        <div className="mpr-app__body">
          <aside className="mpr-app__side">
            <div className="mpr-app__segment">
              <span className={sideTab === 'agenda' ? 'is-active' : ''}>Agenda</span>
              <span ref={sourcesRef} className={sideTab === 'sources' ? 'is-active' : ''}>Sources</span>
            </div>
            {sidebar}
          </aside>
          <main className="mpr-app__main">{children}</main>
        </div>
      </div>
      {toast}
      <DemoCursor x={cursor.x} y={cursor.y} visible={cursor.visible} motion="gsap" />
    </div>
  </div>
);

const MonthTabs = ({ months, liveRef }) => (
  <>
    {months.map((month) => (
      <span key={month} className="mpr-app__tab">
        {month}
      </span>
    ))}
    <span ref={liveRef} className="mpr-app__tab is-live">
      LIVE <Zap size={14} strokeWidth={1.8} />
    </span>
  </>
);

const AgendaList = ({ active, discussed = {}, flagged = [], setTargetRef }) => (
  <nav className="mpr-app__agenda">
    {AGENDA.map(([key, label]) => (
      <div
        key={key}
        ref={setTargetRef?.(`agenda-${key}`)}
        className={[
          'mpr-app__item',
          active === key ? 'is-active' : '',
          discussed[key] ? 'is-discussed' : '',
          flagged.includes(key) ? 'is-flagged' : '',
        ].filter(Boolean).join(' ')}
      >
        {key === 'controls' && <TriangleRight size={9} className="mpr-app__caret" />}
        <span>{label}</span>
        {discussed[key] ? <Check size={14} strokeWidth={2.4} className="mpr-app__tick" /> : key !== 'scope' && key !== 'last' && <Equal size={15} strokeWidth={1.8} />}
      </div>
    ))}
  </nav>
);

// ── 1 · Prompt the conversation ───────────────────────────────────────

const PROMPTS = {
  safety: ['Any incidents or near misses since the last review?', 'Are site risk assessments current for work starting this month?', 'Is anyone in the team carrying too much?'],
  client: ['How has the relationship moved since last month?', 'Are any change requests waiting on a decision?'],
  scope: ['Has anything been asked for that is not in the contract?', 'Is any scope at risk of slipping to next month?'],
};

const TITLES = Object.fromEntries(AGENDA);

// Work down the agenda: each section's prompts, marked discussed, then the
// next - and a closing nudge for the sections not yet covered.
const AGENDA_STEPS = (() => {
  const steps = [];
  const discussed = {};
  let active = 'safety';
  ['safety', 'client', 'scope'].forEach((key, idx) => {
    if (idx > 0) steps.push({ active, discussed: { ...discussed }, target: `agenda-${key}`, duration: 900 });
    active = key;
    steps.push({ active, discussed: { ...discussed }, target: null, duration: idx === 0 ? 1400 : 1100 });
    steps.push({ active, discussed: { ...discussed }, target: 'discussed', duration: 900 });
    discussed[key] = true;
    steps.push({ active, discussed: { ...discussed }, target: 'discussed', duration: 800 });
  });
  steps.push({ active, discussed: { ...discussed }, nudge: true, target: null, duration: 4200 });
  return steps;
})();

export const MprAgendaDemo = ({ className = '' }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(AGENDA_STEPS, containerRef);
  const done = Boolean(step.discussed[step.active]);

  return (
    <div className={className}>
      <MprWindow
        containerRef={containerRef}
        cursor={cursor}
        tabs={<MonthTabs months={['September 25']} />}
        sidebar={
          <AgendaList
            active={step.active}
            discussed={step.discussed}
            flagged={step.nudge ? ['deliverables', 'lessons'] : []}
            setTargetRef={setTargetRef}
          />
        }
      >
        {step.nudge && (
          <div className="mpr-app__nudge">
            <strong>Before you close</strong>
            <span>Deliverables and Lessons learnt have not been discussed yet.</span>
          </div>
        )}
        <h3 className="mpr-app__h" key={step.active}>{TITLES[step.active]}</h3>
        <div className="mpr-app__label">Discussion points</div>
        <ul className="mpr-app__points" key={`p-${step.active}`}>
          {PROMPTS[step.active].map((point, idx) => (
            <li key={point} style={{ '--i': idx }}>{point}</li>
          ))}
        </ul>
        <span ref={setTargetRef('discussed')} className={`mpr-app__btn ${done ? 'is-done' : ''}`}>
          {done ? (
            <>
              <Check size={14} strokeWidth={2.4} /> Discussed
            </>
          ) : (
            'Mark as discussed'
          )}
        </span>
        <div className="mpr-app__label mpr-app__label--notes">Notes</div>
        <div className="mpr-app__notes">Enter notes here...</div>
      </MprWindow>
    </div>
  );
};

// ── 2 · Pre-fill and verify ───────────────────────────────────────────

const ROWS = [
  ['debt', 'Debt', '£48,200', '£55,489', '+£7,289', 'up'],
  ['aged-debt', 'Aged Debt', '£6,100', '£4,850', '−£1,250', 'down'],
  ['wip', 'WIP', '£31,750', '£28,400', '−£3,350', 'down'],
  ['aged-wip', 'Aged WIP', '£4,200', '£4,200', '0', 'flat'],
  ['uncontracted', 'Uncontracted Work', '£12,000', null, null, null],
  ['profit', 'Profitability % vs CAAP', '14.2%', '13.6%', '−0.6 pts', 'down'],
];

const SOURCES = [
  ['Debt', 'Finance system'],
  ['Aged Debt', 'Finance system'],
  ['WIP', 'Timesheets'],
  ['Aged WIP', 'Timesheets'],
  ['Uncontracted Work', 'Entered in review'],
  ['Profitability', 'Finance system'],
];

const MANUAL = '£9,500';

const DATA_STEPS = (() => {
  const steps = [{ filled: 0, target: null, duration: 1300 }];
  for (let i = 1; i <= ROWS.length; i += 1) steps.push({ filled: i, target: null, duration: 320 });
  steps.push({ filled: ROWS.length, target: null, duration: 1100 });
  steps.push({ filled: ROWS.length, target: 'cell-uncontracted', duration: 900 });
  MANUAL.split('').forEach((_, i) => {
    steps.push({ filled: ROWS.length, typing: MANUAL.slice(0, i + 1), target: 'cell-uncontracted', duration: i === 0 ? 300 : 110 });
  });
  steps.push({ filled: ROWS.length, manual: true, target: 'cell-uncontracted', duration: 1100 });
  steps.push({ filled: ROWS.length, manual: true, target: 'tab-sources', duration: 900 });
  steps.push({ filled: ROWS.length, manual: true, sources: true, target: null, duration: 4200 });
  return steps;
})();

const Trend = ({ dir, children }) => {
  const Icon = dir === 'up' ? ArrowUpRight : dir === 'down' ? ArrowDownRight : ArrowRight;
  return (
    <span className="mpr-app__trend">
      {children}
      <Icon size={13} strokeWidth={2.2} />
    </span>
  );
};

export const MprDataDemo = ({ className = '' }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(DATA_STEPS, containerRef);

  return (
    <div className={className}>
      <MprWindow
        containerRef={containerRef}
        cursor={cursor}
        tabs={<MonthTabs months={['September 25']} />}
        sideTab={step.sources ? 'sources' : 'agenda'}
        sourcesRef={setTargetRef('tab-sources')}
        sidebar={
          step.sources ? (
            <div className="mpr-app__sources">
              {SOURCES.map(([label, source], idx) => (
                <div key={label} className="mpr-app__source" style={{ '--i': idx }}>
                  <span>{label}</span>
                  <small className={source === 'Entered in review' ? 'is-manual' : ''}>{source}</small>
                </div>
              ))}
            </div>
          ) : (
            <AgendaList active="controls" />
          )
        }
      >
        <h3 className="mpr-app__h">Project controls</h3>
        <div className="mpr-app__data-head">
          <span>Data</span>
          <span>Last month</span>
          <span>This month</span>
        </div>
        <div className="mpr-app__table">
          {ROWS.map(([key, label, last, now, delta, dir], idx) => {
            const filled = step.filled > idx;
            const manual = key === 'uncontracted';
            return (
              <div key={key} className="mpr-app__row">
                <span className="mpr-app__cell mpr-app__cell--label">{label}</span>
                <span className="mpr-app__cell mpr-app__cell--num">{last}</span>
                <span
                  ref={manual ? setTargetRef('cell-uncontracted') : undefined}
                  className={`mpr-app__cell mpr-app__cell--now ${!filled ? 'is-syncing' : ''} ${manual && filled && !step.manual ? 'is-flag' : ''}`.trim()}
                >
                  {!filled && <span className="mpr-app__shimmer" />}
                  {filled && !manual && (
                    <>
                      <strong>{now}</strong>
                      <Trend dir={dir}>{delta}</Trend>
                    </>
                  )}
                  {filled && manual && !step.manual && !step.typing && (
                    <span className="mpr-app__placeholder">
                      Enter value... <em>Not in any source</em>
                    </span>
                  )}
                  {filled && manual && step.typing && !step.manual && <strong className="mpr-app__typing">{step.typing}</strong>}
                  {filled && manual && step.manual && (
                    <>
                      <strong>{MANUAL}</strong>
                      <Trend dir="down">−£2,500</Trend>
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </MprWindow>
    </div>
  );
};

// ── 3 · Capture and follow through ────────────────────────────────────

const ACTION = 'Chase Stage 3 design sign-off';

const ACTION_STEPS = (() => {
  const base = { month: 'oct', active: 'actions', adding: false, typed: '', owner: false, saved: false };
  const steps = [
    { ...base, target: null, duration: 1300 },
    { ...base, target: 'add-action', duration: 900 },
    { ...base, adding: true, target: 'action-input', duration: 500 },
  ];
  ACTION.split('').forEach((_, i) => {
    steps.push({ ...base, adding: true, typed: ACTION.slice(0, i + 1), target: 'action-input', duration: i === 0 ? 250 : 34 });
  });
  const typed = { ...base, adding: true, typed: ACTION };
  steps.push(
    { ...typed, target: 'owner', duration: 900 },
    { ...typed, owner: true, target: 'owner', duration: 700 },
    { ...typed, owner: true, target: 'save', duration: 800 },
    { ...base, saved: true, target: null, duration: 1800 },
    // A month later: the review opens on last month's actions.
    { ...base, saved: true, month: 'nov', active: 'last', toast: true, target: null, duration: 1800 },
    { ...base, saved: true, month: 'nov', active: 'last', target: 'status-done', duration: 1000 },
    { ...base, saved: true, month: 'nov', active: 'last', status: 'done', target: 'status-done', duration: 3600 }
  );
  return steps;
})();

export const MprActionsDemo = ({ className = '' }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(ACTION_STEPS, containerRef);
  const nextMonth = step.month === 'nov';

  return (
    <div className={className}>
      <MprWindow
        containerRef={containerRef}
        cursor={cursor}
        tabs={<MonthTabs months={nextMonth ? ['September 25', 'October 25'] : ['September 25']} />}
        sidebar={<AgendaList active={step.active} />}
        toast={
          step.toast && (
            <div className="mpr-app__toast">
              <strong>November review opened</strong>
              <span>1 action carried forward from October</span>
            </div>
          )
        }
      >
        {step.active === 'actions' ? (
          <>
            <h3 className="mpr-app__h">Actions arising</h3>
            <div className="mpr-app__actions">
              <div className="mpr-app__action is-existing">
                <span className="mpr-app__action-text">Update the risk register after the site visit</span>
                <span className="mpr-app__owner">Commercial manager</span>
              </div>
              {step.saved && (
                <div className="mpr-app__action is-new">
                  <span className="mpr-app__action-text">{ACTION}</span>
                  <span className="mpr-app__owner">Project manager</span>
                  <span className="mpr-app__sent">Sent to owner</span>
                </div>
              )}
              {step.adding && (
                <div className="mpr-app__action is-editing">
                  <span ref={setTargetRef('action-input')} className="mpr-app__action-text">
                    {step.typed || <span className="mpr-app__placeholder">Describe the action...</span>}
                    <span className="mpr-app__caret-line" />
                  </span>
                  <span ref={setTargetRef('owner')} className={`mpr-app__owner ${step.owner ? '' : 'is-empty'}`}>
                    {step.owner ? 'Project manager' : 'Assign owner'}
                  </span>
                  <span className="mpr-app__due">Due next review</span>
                  <span ref={setTargetRef('save')} className="mpr-app__save">Add</span>
                </div>
              )}
              {!step.adding && !step.saved && (
                <span ref={setTargetRef('add-action')} className="mpr-app__add">
                  <Plus size={14} strokeWidth={2} /> Add action
                </span>
              )}
              {!step.adding && step.saved && <span className="mpr-app__add"><Plus size={14} strokeWidth={2} /> Add action</span>}
              {step.adding && <span ref={setTargetRef('add-action')} className="mpr-app__add is-hidden" />}
            </div>
          </>
        ) : (
          <>
            <h3 className="mpr-app__h">Last month&apos;s actions</h3>
            <div className="mpr-app__label">Carried forward from October 25</div>
            <div className={`mpr-app__carried ${step.status === 'done' ? 'is-done' : ''}`}>
              <div>
                <span className="mpr-app__action-text">{ACTION}</span>
                <small>Project manager · agreed 14 Oct</small>
              </div>
              <div className="mpr-app__status">
                <span ref={setTargetRef('status-done')} className={step.status === 'done' ? 'is-on' : ''}>
                  {step.status === 'done' && <Check size={12} strokeWidth={2.6} />} Done
                </span>
                <span>In progress</span>
                <span>Not done</span>
              </div>
            </div>
          </>
        )}
      </MprWindow>
    </div>
  );
};

export const MPR_APP_DEMOS = {
  'mpr-agenda': MprAgendaDemo,
  'mpr-data': MprDataDemo,
  'mpr-actions': MprActionsDemo,
};

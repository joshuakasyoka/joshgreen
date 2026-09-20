import React from 'react';
import { Check } from 'lucide-react';
import { Block, Connector, useDiagramSteps } from './EmmaStakeholderDiagrams';
import { Frame, Pill, useSequence } from './WinRoomDiagrams';
import './WinRoomDiagrams.css';
import './EmmaStakeholderDiagrams.css';

// Short animated diagrams for presentation slides that would otherwise be
// text only. Same visual language as the EMMA Artefact Framework diagrams.

const Verdict = ({ visible, done, pending, children }) => (
  <span className={`emma-diagram__verdict ${visible ? 'is-visible' : ''} ${done ? 'is-yes' : ''}`.trim()}>
    {done && <Check size={12} strokeWidth={2.5} aria-hidden="true" />}
    {done ? children : pending}
  </span>
);

// ── Moata Geospatial · Task: bring project communication back to the map.

const MOATA_TASK_STEPS = [
  { before: false, bridge: false, after: false, done: false, duration: 600 },
  { before: true, bridge: false, after: false, done: false, duration: 1200 },
  { before: true, bridge: true, after: false, done: false, duration: 1000 },
  { before: true, bridge: true, after: true, done: false, duration: 1300 },
  { before: true, bridge: true, after: true, done: true, duration: 4400 },
];

export const MoataTaskDiagram = ({ className = '' }) => {
  const { containerRef, step, running } = useDiagramSteps(MOATA_TASK_STEPS);

  return (
    <div className={`emma-diagram ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className={`emma-diagram__canvas ${running ? 'is-running' : ''}`}>
        <div className="emma-diagram__row emma-diagram__row--pair emma-diagram__row--flush">
          <div className={`emma-diagram__faded ${step.bridge ? 'is-faded' : ''}`.trim()}>
            <Block
              block={{ id: 'before', kicker: 'Where comments lived', title: 'Off the map', items: ['Email', 'External tools', 'PowerPoint'] }}
              visible={step.before}
            />
          </div>
          <div className="emma-diagram__bridge-link">
            <Connector dashed={!step.done} visible={step.bridge} />
            <Verdict visible={step.bridge} done={step.done} pending="Bring it to the map">
              On the map
            </Verdict>
            <Connector dashed={!step.done} visible={step.bridge} />
          </div>
          <Block
            block={{ id: 'after', kicker: 'The task', title: 'Map-native comments', items: ['2D & 3D', 'Team confidence'] }}
            visible={step.after}
          />
        </div>
      </div>
    </div>
  );
};

// ── Moata Geospatial · Reflection: behaviour first, then the build, and the
// result - multidisciplinary communication back on the map.

const MOATA_REFLECTION_STEPS = [
  { a: false, ab: false, b: false, bc: false, c: false, done: false, duration: 600 },
  { a: true, ab: false, b: false, bc: false, c: false, duration: 1100 },
  { a: true, ab: true, b: false, bc: false, c: false, duration: 600 },
  { a: true, ab: true, b: true, bc: false, c: false, duration: 1100 },
  { a: true, ab: true, b: true, bc: true, c: false, duration: 600 },
  { a: true, ab: true, b: true, bc: true, c: true, done: false, duration: 1200 },
  { a: true, ab: true, b: true, bc: true, c: true, done: true, duration: 4200 },
];

export const MoataReflectionDiagram = ({ className = '' }) => {
  const { containerRef, step, running } = useDiagramSteps(MOATA_REFLECTION_STEPS);

  return (
    <div className={`emma-diagram ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className={`emma-diagram__canvas ${running ? 'is-running' : ''}`}>
        <div className="emma-diagram__row emma-diagram__row--pair emma-diagram__row--flush">
          <Block
            block={{ id: 'why', kicker: 'First', title: 'Behavioural problem', items: ['Low adoption'] }}
            visible={step.a}
          />
          <Connector visible={step.ab} />
          <Block
            block={{ id: 'what', kicker: 'Then', title: 'Technical solution', items: ['What to build'] }}
            visible={step.b}
          />
          <Connector visible={step.bc} />
          <Block
            block={{ id: 'result', kicker: 'Result', title: 'Back on the map', items: ['Ecology', 'Archaeology', 'Engineering'] }}
            visible={step.c}
          />
        </div>
        <div className="emma-diagram__row emma-diagram__row--end">
          <Verdict visible={step.c} done={step.done} pending="Multidisciplinary?">
            Multidisciplinary
          </Verdict>
        </div>
      </div>
    </div>
  );
};

// ── EMMA · Reflection: two speeds - specialists and everyone else - held in
// one assistant, with trust and governance shaping the design.

const EMMA_REFLECTION_STEPS = [
  { specialists: false, admins: false, links: false, emma: false, done: false, duration: 600 },
  { specialists: true, admins: false, links: false, emma: false, done: false, duration: 1000 },
  { specialists: true, admins: true, links: false, emma: false, done: false, duration: 1100 },
  { specialists: true, admins: true, links: true, emma: false, done: false, duration: 800 },
  { specialists: true, admins: true, links: true, emma: true, done: false, duration: 1300 },
  { specialists: true, admins: true, links: true, emma: true, done: true, duration: 4400 },
];

export const EmmaReflectionTwoSpeedsDiagram = ({ className = '' }) => {
  const { containerRef, step, running } = useDiagramSteps(EMMA_REFLECTION_STEPS);

  return (
    <div className={`emma-diagram ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className={`emma-diagram__canvas ${running ? 'is-running' : ''}`}>
        <div className="emma-diagram__row">
          <Block
            block={{ id: 'specialists', kicker: 'Speed one', title: 'Specialists', items: ['SQL depth', 'Spatial tools'] }}
            visible={step.specialists}
          />
          <span className="emma-diagram__spacer" />
          <Block
            block={{ id: 'admins', kicker: 'Speed two', title: 'Project admins', items: ['Natural language', 'Right layers'] }}
            visible={step.admins}
          />
        </div>

        <div className="emma-diagram__row emma-diagram__row--links">
          <Connector vertical visible={step.links} />
          <Connector vertical visible={step.links} />
        </div>

        <div className={`emma-diagram__outcome emma-diagram__outcome--split ${step.emma ? 'is-visible' : ''}`.trim()}>
          <span>
            <div className="emma-diagram__kicker">One assistant</div>
            <div className="emma-diagram__outcome-text">EMMA - permission cards and audit traces for both</div>
          </span>
          <Verdict visible={step.emma} done={step.done} pending="Trust?">
            Trust shaped the design
          </Verdict>
        </div>
      </div>
    </div>
  );
};

// ── EMMA · Results: the shared AI strategy library sitting over GIS, land
// and carbon - one playbook instead of three one-off chatbots.

const LIBRARY_PRODUCTS = [
  { id: 'gis', kicker: 'Moata product', title: 'GIS', items: ['Spatial tools', 'Map layers'] },
  { id: 'land', kicker: 'Moata product', title: 'Land', items: ['Parcels', 'Constraints'] },
  { id: 'carbon', kicker: 'Moata product', title: 'Carbon', items: ['Totals', 'Scenarios'] },
];

const LIBRARY_STEPS = [
  { products: false, library: false, links: false, done: false, duration: 600 },
  { products: true, library: false, links: false, done: false, duration: 1400 },
  { products: true, library: true, links: false, done: false, duration: 1400 },
  { products: true, library: true, links: true, done: false, duration: 1000 },
  { products: true, library: true, links: true, done: true, duration: 4800 },
];

export const EmmaLibraryDiagram = ({ className = '' }) => {
  const { containerRef, step, running } = useDiagramSteps(LIBRARY_STEPS);

  return (
    <div className={`emma-diagram ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className={`emma-diagram__canvas ${running ? 'is-running' : ''}`}>
        <div className={`emma-diagram__library ${step.library ? 'is-visible' : ''}`.trim()}>
          <div className="emma-diagram__kicker">Moata Product Suite AI Strategy</div>
          <div className="emma-diagram__title">Shared library</div>
          <div className="emma-diagram__chips">
            {['Guidelines', 'Tone of voice', 'Dialogue patterns'].map((item, idx) => (
              <span key={item} className="emma-diagram__chip" style={{ '--chip-delay': `${idx * 120}ms` }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="emma-diagram__row emma-diagram__row--links emma-diagram__row--triple">
          {LIBRARY_PRODUCTS.map((product) => (
            <Connector key={product.id} vertical visible={step.links} />
          ))}
        </div>

        <div className="emma-diagram__row emma-diagram__row--triple">
          {LIBRARY_PRODUCTS.map((product) => (
            <Block key={product.id} block={product} visible={step.products} />
          ))}
        </div>

        <div className="emma-diagram__row emma-diagram__row--end">
          <Verdict visible={step.links} done={step.done} pending="One surface?">
            EMMA - one surface over three products
          </Verdict>
        </div>
      </div>
    </div>
  );
};

// ── EMMA Artefact Framework · Research findings: the GIS use cases people wanted from
// EMMA, ranked by how many interviewees raised them, and the one taken
// forward first. Illustrative findings.

const GIS_USE_CASES = [
  ['Query map data in plain language', 16],
  ['Find and add the right layers', 15],
  ['Sketch a site boundary or diagram', 13],
  ['Check proximity and buffers', 12],
  ['Summarise constraints on a site', 11],
  ['Compare design versions over time', 9],
  ['Export maps for reports and bids', 8],
  ['Measure distances and areas', 7],
  ['Turn survey data into features', 6],
  ['Draft a site report from the map', 5],
];

const USE_CASE_TOTAL = 20;

export const ArtefactsUseCasesDiagram = ({ className = '' }) => {
  const { ref, shown, done } = useSequence(GIS_USE_CASES.length + 2, { step: 260 });
  const prioritised = shown > GIS_USE_CASES.length;

  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-chart-head">
        <span className="wr-kicker">GIS use cases raised · interviewees out of {USE_CASE_TOTAL}</span>
      </div>
      <div className="wr-usecases">
        {GIS_USE_CASES.map(([label, count], idx) => (
          <div
            key={label}
            className={`wr-usecase ${shown > idx ? 'is-on' : ''} ${idx === 0 && prioritised ? 'is-picked' : ''} ${idx > 0 && prioritised ? 'is-muted' : ''}`.trim()}
          >
            <span className="wr-usecase__rank">{idx + 1}</span>
            <span className="wr-usecase__label">{label}</span>
            <span className="wr-usecase__track">
              <span className="wr-usecase__fill" style={{ width: shown > idx ? `${(count / USE_CASE_TOTAL) * 100}%` : 0 }} />
            </span>
            <span className="wr-usecase__count">{count}</span>
          </div>
        ))}
      </div>
      <div className="wr-row wr-row--stats">
        <div className={`wr-chips wr-reasons ${prioritised ? 'is-on' : ''}`}>
          <span className="wr-chip">Most requested</span>
          <span className="wr-chip">Underpins layers, buffers and constraints</span>
          <span className="wr-chip">Feasible with existing map APIs</span>
        </div>
        <Pill visible={prioritised} done={done}>
          Prioritised: querying map data
        </Pill>
      </div>
    </Frame>
  );
};

// ── EMMA Artefact Framework · The loop: querying map data as a small loop around the
// user's goal - ask, see it on the map, refine it there, carry the context
// back - with the two transitions that matter labelled.

// Points on an ellipse (centre 360,200; radii 260 x 160), angle in degrees.
const onLoop = (deg) => {
  const r = (deg * Math.PI) / 180;
  return [360 + 260 * Math.cos(r), 200 + 160 * Math.sin(r)];
};
const loopArc = (from, to) => {
  const [x1, y1] = onLoop(from);
  const [x2, y2] = onLoop(to);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A 260 160 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

const LOOP_NODES = [
  { deg: -90, kicker: 'In chat', title: 'Ask', sub: 'Which assets sit in flood zone 3?' },
  { deg: 0, kicker: 'Artefact opens', title: 'See it on the map', sub: 'Layers and results, in place' },
  { deg: 90, kicker: 'On the map', title: 'Refine it', sub: 'Filter, select, sketch' },
  { deg: 180, kicker: 'Back in chat', title: 'Carry the context', sub: 'The selection travels as a chip' },
];

// Arcs between neighbouring nodes, leaving room for the cards.
const LOOP_ARCS = [
  { d: loopArc(-62, -22), label: 'Chat → Map', at: onLoop(-42), key: true },
  { d: loopArc(22, 62) },
  { d: loopArc(118, 158), label: 'Map → Chat', at: onLoop(138), key: true },
  { d: loopArc(202, 242) },
];

export const ArtefactsLoopDiagram = ({ className = '' }) => {
  const { ref, shown, done } = useSequence(9, { step: 450, hold: 5200 });
  const nodeOn = (idx) => shown > idx * 2;
  const arcOn = (idx) => shown > idx * 2 + 1;

  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-loop">
        <svg className="wr-loop__svg" viewBox="0 0 720 400" aria-hidden="true">
          <defs>
            <marker id="wr-loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#b9b8b0" />
            </marker>
            <marker id="wr-loop-arrow-key" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#9fdc4e" />
            </marker>
          </defs>
          {LOOP_ARCS.map((arc, idx) => (
            <path
              key={arc.d}
              d={arc.d}
              pathLength="1"
              markerEnd={arc.key ? 'url(#wr-loop-arrow-key)' : 'url(#wr-loop-arrow)'}
              className={`wr-loop__arc ${arc.key ? 'is-key' : ''} ${arcOn(idx) ? 'is-on' : ''}`.trim()}
            />
          ))}
          {done && (
            <circle r="5" className="wr-loop__dot">
              <animateMotion dur="7s" repeatCount="indefinite" path="M 100 200 A 260 160 0 1 1 620 200 A 260 160 0 1 1 100 200" />
            </circle>
          )}
        </svg>

        {LOOP_ARCS.filter((arc) => arc.label).map((arc) => {
          const idx = LOOP_ARCS.indexOf(arc);
          return (
            <span
              key={arc.label}
              className={`wr-loop__transition ${arcOn(idx) ? 'is-on' : ''}`}
              style={{ left: `${(arc.at[0] / 720) * 100}%`, top: `${(arc.at[1] / 400) * 100}%` }}
            >
              {arc.label}
            </span>
          );
        })}

        {LOOP_NODES.map((node, idx) => {
          const [x, y] = onLoop(node.deg);
          return (
            <div
              key={node.title}
              className={`wr-card wr-loop__node ${nodeOn(idx) ? 'is-on' : ''}`}
              style={{ left: `${(x / 720) * 100}%`, top: `${(y / 400) * 100}%` }}
            >
              <div className="wr-kicker">{node.kicker}</div>
              <div className="wr-title">{node.title}</div>
              <div className="wr-loop__sub">{node.sub}</div>
            </div>
          );
        })}

        <div className={`wr-loop__goal ${shown >= 8 ? 'is-on' : ''}`}>
          <div className="wr-kicker">The user&apos;s goal</div>
          <div className="wr-title">An answer they can act on</div>
        </div>
      </div>
      <div className="wr-row wr-row--end">
        <Pill visible={shown >= 8} done={done}>
          Goal reached - share the artefact
        </Pill>
      </div>
    </Frame>
  );
};

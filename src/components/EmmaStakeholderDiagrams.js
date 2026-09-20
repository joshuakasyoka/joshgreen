import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import './EmmaStakeholderDiagrams.css';

// Situation and Task diagrams for the Artefacts case study, in the same
// language as the Bug Club stack diagram: white canvas, bordered blocks,
// chips, and connectors that grow in step by step.

const EMMA = {
  id: 'emma',
  kicker: 'New initiative',
  title: 'EMMA',
  items: ['Agent', 'Group AI', 'Well funded'],
};

const MOATA = {
  id: 'moata',
  kicker: 'Established product',
  title: 'Moata Geospatial',
  items: ['GIS Software', 'Product Team', 'Limited Budget'],
};

// Steps loop while the diagram is on screen; each holds the full visible state.
export const useDiagramSteps = (steps) => {
  const containerRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const step = steps[stepIndex];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setTimeout(() => setStepIndex((current) => (current + 1) % steps.length), step.duration);
    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration, steps.length]);

  useEffect(() => {
    if (!running) setStepIndex(0);
  }, [running]);

  return { containerRef, step, running };
};

export const Block = ({ block, visible, variant }) => (
  <div className={`emma-diagram__block emma-diagram__block--${block.id} ${variant ? `is-${variant}` : ''} ${visible ? 'is-visible' : ''}`.trim()}>
    <div className="emma-diagram__kicker">{block.kicker}</div>
    <div className="emma-diagram__title">{block.title}</div>
    <div className="emma-diagram__chips">
      {block.items.map((item, idx) => (
        <span key={item} className="emma-diagram__chip" style={{ '--chip-delay': `${idx * 120}ms` }}>
          {item}
        </span>
      ))}
    </div>
  </div>
);

export const Connector = ({ visible, vertical, dashed }) => (
  <span
    className={[
      'emma-diagram__connector',
      vertical ? 'emma-diagram__connector--v' : 'emma-diagram__connector--h',
      dashed ? 'is-dashed' : '',
      visible ? 'is-visible' : '',
    ].filter(Boolean).join(' ')}
    aria-hidden="true"
  />
);

// ── Situation: a well-funded new initiative beside an established product,
// and the opportunity between them.

const SITUATION_STEPS = [
  { emma: false, moata: false, links: false, opportunity: false, duration: 600 },
  { emma: true, moata: false, links: false, opportunity: false, duration: 1200 },
  { emma: true, moata: true, links: false, opportunity: false, duration: 1200 },
  { emma: true, moata: true, links: true, opportunity: false, duration: 800 },
  { emma: true, moata: true, links: true, opportunity: true, duration: 4600 },
];

export const EmmaSituationDiagram = ({ className = '' }) => {
  const { containerRef, step, running } = useDiagramSteps(SITUATION_STEPS);

  return (
    <div className={`emma-diagram ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className={`emma-diagram__canvas ${running ? 'is-running' : ''}`}>
        <div className="emma-diagram__row">
          <Block block={EMMA} visible={step.emma} variant="funded" />
          <span className="emma-diagram__spacer" />
          <Block block={MOATA} visible={step.moata} />
        </div>

        <div className="emma-diagram__row emma-diagram__row--links">
          <Connector vertical visible={step.links} />
          <Connector vertical visible={step.links} />
        </div>

        <div className={`emma-diagram__outcome ${step.opportunity ? 'is-visible' : ''}`}>
          <div className="emma-diagram__kicker">Opportunity</div>
          <div className="emma-diagram__outcome-text">Use a well-funded new initiative to bolster support for older products</div>
        </div>
      </div>
    </div>
  );
};

// ── Task: convince senior teams the two products are compatible.

const TASK_STEPS = [
  { teams: false, products: false, question: false, ask: false, compatible: false, duration: 600 },
  { teams: true, products: false, question: false, ask: false, compatible: false, duration: 1100 },
  { teams: true, products: true, question: false, ask: false, compatible: false, duration: 1200 },
  { teams: true, products: true, question: true, ask: false, compatible: false, duration: 900 },
  { teams: true, products: true, question: true, ask: true, compatible: false, duration: 1600 },
  { teams: true, products: true, question: true, ask: true, compatible: true, duration: 4400 },
];

const TEAMS = {
  id: 'teams',
  kicker: 'Audience',
  title: 'Senior teams',
  items: ['Group AI team', 'Senior stakeholders'],
};

export const EmmaTaskDiagram = ({ className = '' }) => {
  const { containerRef, step, running } = useDiagramSteps(TASK_STEPS);

  return (
    <div className={`emma-diagram ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className={`emma-diagram__canvas ${running ? 'is-running' : ''}`}>
        <div className="emma-diagram__row emma-diagram__row--center">
          <Block block={TEAMS} visible={step.teams} variant="audience" />
        </div>

        {/* The ask drops from the audience straight into the verdict; its
            space is reserved so nothing shifts while the lines draw in. */}
        <div className="emma-diagram__row emma-diagram__row--pair">
          <Block block={{ ...EMMA, kicker: 'Chat-first' }} visible={step.products} />
          <div className="emma-diagram__bridge">
            <div className="emma-diagram__bridge-ask">
              <Connector vertical dashed={!step.compatible} visible={step.ask} />
            </div>
            <div className="emma-diagram__bridge-link">
              <Connector dashed={!step.compatible} visible={step.question} />
              <span className={`emma-diagram__verdict ${step.question ? 'is-visible' : ''} ${step.compatible ? 'is-yes' : ''}`.trim()}>
                {step.compatible ? (
                  <>
                    <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                    Compatible
                  </>
                ) : (
                  'Compatible?'
                )}
              </span>
              <Connector dashed={!step.compatible} visible={step.question} />
            </div>
            <div />
          </div>
          <Block block={{ ...MOATA, kicker: 'GIS-first' }} visible={step.products} />
        </div>
      </div>
    </div>
  );
};

// ── Reflection: what was learned GIS-first on Moata carries over to EMMA's
// chat-first context, and both meet in geospatial artefacts - related
// products rather than competing ones.

const REFLECTION_STEPS = [
  { moata: false, carry: false, emma: false, links: false, shared: false, verdict: false, duration: 600 },
  { moata: true, carry: false, emma: false, links: false, shared: false, verdict: false, duration: 1100 },
  { moata: true, carry: true, emma: false, links: false, shared: false, verdict: false, duration: 1000 },
  { moata: true, carry: true, emma: true, links: false, shared: false, verdict: false, duration: 1200 },
  { moata: true, carry: true, emma: true, links: true, shared: false, verdict: false, duration: 800 },
  { moata: true, carry: true, emma: true, links: true, shared: true, verdict: false, duration: 1200 },
  { moata: true, carry: true, emma: true, links: true, shared: true, verdict: true, duration: 4400 },
];

const MOATA_GIS_FIRST = {
  id: 'moata',
  kicker: 'GIS first, chat second',
  title: 'Moata Geospatial',
  items: ['2D & 3D GIS', 'AI in the map'],
};

const EMMA_CHAT_FIRST = {
  id: 'emma',
  kicker: 'Chat first, GIS second',
  title: 'EMMA',
  items: ['Natural language', 'Artefacts'],
};

export const EmmaReflectionDiagram = ({ className = '' }) => {
  const { containerRef, step, running } = useDiagramSteps(REFLECTION_STEPS);

  return (
    <div className={`emma-diagram ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className={`emma-diagram__canvas ${running ? 'is-running' : ''}`}>
        <div className="emma-diagram__row emma-diagram__row--pair emma-diagram__row--flush">
          <Block block={MOATA_GIS_FIRST} visible={step.moata} />
          <div className="emma-diagram__bridge-link">
            <Connector visible={step.carry} />
            <span className={`emma-diagram__verdict ${step.carry ? 'is-visible' : ''}`.trim()}>Carried over →</span>
            <Connector visible={step.carry} />
          </div>
          <Block block={EMMA_CHAT_FIRST} visible={step.emma} />
        </div>

        <div className="emma-diagram__row emma-diagram__row--links">
          <Connector vertical visible={step.links} />
          <Connector vertical visible={step.links} />
        </div>

        <div className={`emma-diagram__outcome emma-diagram__outcome--split ${step.shared ? 'is-visible' : ''}`.trim()}>
          <span>
            <div className="emma-diagram__kicker">Shared ground</div>
            <div className="emma-diagram__outcome-text">Geospatial artefacts - one framework, two ways in</div>
          </span>
          <span className={`emma-diagram__verdict ${step.verdict ? 'is-visible is-yes' : ''}`.trim()}>
            {step.verdict && <Check size={12} strokeWidth={2.5} aria-hidden="true" />}
            Relate, not compete
          </span>
        </div>
      </div>
    </div>
  );
};

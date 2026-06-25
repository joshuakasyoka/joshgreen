import React, { useEffect, useRef, useState } from 'react';
import UalArchiveDemoChrome from './UalArchiveDemoChrome';
import { DEMO_GLOSSARY, DEMO_GLOSSARY_DEFINITIONS } from './ualArchiveDemoData';
import './UalArchiveDemoShared.css';

const STEPS = [
  { target: 'term-participatory', selectedTerm: null, category: null, duration: 1400 },
  { target: 'term-participatory', selectedTerm: 'participatory', category: null, duration: 2000 },
  { target: 'cat-methods', selectedTerm: null, category: 'Methods', duration: 1400 },
  { target: 'term-audiorecording', selectedTerm: null, category: 'Methods', duration: 1400 },
  { target: 'term-audiorecording', selectedTerm: 'audiorecording', category: 'Methods', duration: 2000 },
  { target: 'idle', selectedTerm: 'audiorecording', category: 'Methods', duration: 1000 },
];

const UalArchiveGlossaryDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const panelOpen = Boolean(step.selectedTerm && DEMO_GLOSSARY_DEFINITIONS[step.selectedTerm]);
  const visibleCategories = step.category ? [step.category] : Object.keys(DEMO_GLOSSARY);

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
      if (!container || isIdle) {
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
    <UalArchiveDemoChrome
      containerRef={containerRef}
      cursor={cursor}
      activeSubnav="artefacts"
      url="gcdp-archive-2026.vercel.app/glossary"
      className={className}
      style={style}
    >
      <div className={`ual-archive-demo__glossary${panelOpen ? ' is-panel-open' : ''}`}>
        <div className="ual-archive-demo__glossary-main">
          <h1 className="ual-archive-demo__glossary-title">Glossary</h1>
          <p className="ual-archive-demo__glossary-intro">
            Terms drawn from across the archive, organised by how they appear in artefact tags.
          </p>

          <div className="ual-archive-demo__glossary-cats">
            <span
              className={`ual-archive-demo__glossary-cat${step.category === null ? ' is-active' : ''}`}
            >
              All
            </span>
            {Object.keys(DEMO_GLOSSARY).map((category) => (
              <span
                key={category}
                ref={category === 'Methods' ? setTargetRef('cat-methods') : undefined}
                className={[
                  'ual-archive-demo__glossary-cat',
                  step.category === category ? 'is-active' : '',
                  step.target === `cat-${category.toLowerCase()}` ? 'is-hovered' : '',
                ].filter(Boolean).join(' ')}
              >
                {category}
              </span>
            ))}
          </div>

          <div className="ual-archive-demo__glossary-groups">
          {visibleCategories.map((category) => (
            <div key={category} className="ual-archive-demo__glossary-group">
              <h2 className="ual-archive-demo__glossary-group-title">{category}</h2>
              <div className="ual-archive-demo__glossary-terms">
                {DEMO_GLOSSARY[category].map((term) => {
                  const hasDefinition = Boolean(DEMO_GLOSSARY_DEFINITIONS[term]);
                  return (
                    <span
                      key={term}
                      ref={
                        term === 'participatory'
                          ? setTargetRef('term-participatory')
                          : term === 'audiorecording'
                            ? setTargetRef('term-audiorecording')
                            : undefined
                      }
                      className={[
                        'ual-archive-demo__glossary-term',
                        hasDefinition ? 'is-defined' : '',
                        step.selectedTerm === term ? 'is-selected' : '',
                        step.target === `term-${term}` ? 'is-hovered' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {term}
                      {step.selectedTerm === term && <span aria-hidden="true">×</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
          </div>
        </div>

        {panelOpen && (
          <aside className="ual-archive-demo__glossary-panel">
            <h2 className="ual-archive-demo__glossary-panel-title">{step.selectedTerm}</h2>
            <p className="ual-archive-demo__glossary-panel-definition">
              {DEMO_GLOSSARY_DEFINITIONS[step.selectedTerm]}
            </p>
          </aside>
        )}
      </div>
    </UalArchiveDemoChrome>
  );
};

export default UalArchiveGlossaryDemo;

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RESEARCH_TRANSCRIPT } from './moataResearchDemoData';
import './MoataProcessDemoShared.css';
import './MoataResearchQuoteDemo.css';

const { lines } = RESEARCH_TRANSCRIPT;

const STEPS = [
  { focusId: 'intro', duration: 1000 },
  { focusId: 'shared-view', duration: 1200 },
  { focusId: 'josh-change', duration: 1000 },
  { focusId: 'conflict', duration: 2200 },
  { focusId: 'josh-state', duration: 1000 },
  { focusId: 'shared-state', duration: 1300 },
  { focusId: 'followup', duration: 1100 },
  { focusId: 'spaces', duration: 1400 },
  { focusId: 'josh-comments', duration: 1000 },
  { focusId: 'comments-close', duration: 1500 },
  { focusId: 'intro', duration: 700 },
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderLineText = (text, insights, showInsights) => {
  if (!showInsights || !insights?.length) return text;

  const pattern = new RegExp(`(${insights.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isInsight = insights.some(
      (phrase) => part.toLowerCase() === phrase.toLowerCase()
    );
    if (!isInsight) return part;
    return (
      <span key={`${part}-${index}`} className="moata-research-quote-demo__insight">
        {part}
      </span>
    );
  });
};

const MoataResearchQuoteDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const lineRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const step = STEPS[stepIndex];

  const registerLineRef = useCallback((id) => (node) => {
    if (node) lineRefs.current[id] = node;
    else delete lineRefs.current[id];
  }, []);

  const syncScroll = useCallback(() => {
    const viewport = viewportRef.current;
    const line = lineRefs.current[step.focusId];
    if (!viewport || !line) return;

    const viewportHeight = viewport.clientHeight;
    const lineTop = line.offsetTop;
    const lineHeight = line.offsetHeight;
    const nextScroll = lineTop - viewportHeight / 2 + lineHeight / 2;
    setScrollY(Math.max(0, nextScroll));
  }, [step.focusId]);

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

  useLayoutEffect(() => {
    syncScroll();
  }, [syncScroll, stepIndex]);

  useEffect(() => {
    window.addEventListener('resize', syncScroll);
    return () => window.removeEventListener('resize', syncScroll);
  }, [syncScroll]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-research-quote-demo moata-process-demo ${className}`.trim()} style={style}>
      <div className="moata-process-demo__card" ref={containerRef}>
        <div className="moata-process-demo__label">
          <span className="moata-process-demo__label-dot" />
          User Interviews
        </div>

        <div className="moata-process-demo__body moata-research-quote-demo__body">
          <div className="moata-research-quote-demo__viewport" ref={viewportRef}>
            <div
              className="moata-research-quote-demo__transcript"
              style={{ transform: `translateY(-${scrollY}px)` }}
            >
              {lines.map((line) => {
                const showInsights = step.focusId === line.id;

                return (
                  <article
                    key={line.id}
                    ref={registerLineRef(line.id)}
                    className="moata-research-quote-demo__line"
                  >
                    <span className="moata-research-quote-demo__speaker">{line.speaker}</span>
                    <p className="moata-research-quote-demo__text">
                      {renderLineText(line.text, line.insights, showInsights)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoataResearchQuoteDemo;

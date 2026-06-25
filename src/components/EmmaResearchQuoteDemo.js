import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { EMMA_RESEARCH_TRANSCRIPT } from './emmaResearchDemoData';
import './MoataProcessDemoShared.css';
import './EmmaResearchQuoteDemo.css';

const STEPS = EMMA_RESEARCH_TRANSCRIPT.map((_, index) => ({
  focusIndex: index,
  duration: 3200,
}));

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
      <span key={`${part}-${index}`} className="emma-research-quote-demo__insight">
        {part}
      </span>
    );
  });
};

const EmmaResearchQuoteDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const lineRefs = useRef([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  const step = STEPS[stepIndex];

  const syncScroll = useCallback(() => {
    const viewport = viewportRef.current;
    const line = lineRefs.current[step.focusIndex];
    if (!viewport || !line) return;

    const viewportHeight = viewport.clientHeight;
    const lineTop = line.offsetTop;
    const lineHeight = line.offsetHeight;
    const nextOffset = Math.max(0, lineTop - viewportHeight * 0.38 + lineHeight * 0.5);
    setScrollOffset(nextOffset);
  }, [step.focusIndex]);

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
    <div
      className={`moata-process-demo emma-research-quote-demo ${className}`.trim()}
      style={style}
    >
      <div className="moata-process-demo__card" ref={containerRef}>
        <div className="moata-process-demo__label">
          <span className="moata-process-demo__label-dot" aria-hidden="true" />
          Programme interviews
        </div>

        <div className="moata-process-demo__body emma-research-quote-demo__body">
          <div className="emma-research-quote-demo__viewport" ref={viewportRef}>
            <div
              className="emma-research-quote-demo__transcript"
              style={{ transform: `translateY(-${scrollOffset}px)` }}
            >
              {EMMA_RESEARCH_TRANSCRIPT.map((line, index) => {
                const isFocused = index === step.focusIndex;

                return (
                  <article
                    key={line.speaker + line.text.slice(0, 24)}
                    ref={(node) => {
                      lineRefs.current[index] = node;
                    }}
                    className="emma-research-quote-demo__line"
                  >
                    <span className="emma-research-quote-demo__speaker">{line.speaker}</span>
                    <p className="emma-research-quote-demo__text">
                      {renderLineText(line.text, line.insights, isFocused)}
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

export default EmmaResearchQuoteDemo;

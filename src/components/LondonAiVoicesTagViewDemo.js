import React, { useEffect, useMemo, useRef, useState } from 'react';
import LondonAiVoicesDemoChrome from './LondonAiVoicesDemoChrome';
import {
  FAIRNESS_BAR_INDEX,
  FAIRNESS_BAR_LABEL,
  TAG_ENTRIES,
  getMatchingBarIndices,
  getTagBarHeightPercent,
} from './londonAiVoicesDemoData';
import './LondonAiVoicesDemoShared.css';

const SEARCH_TEXT = 'Fairness';
const fairnessBarTarget = `bar-${FAIRNESS_BAR_INDEX}`;

const STEPS = [
  { target: 'search', query: '', highlightBar: null, showTooltip: false, duration: 1000 },
  { target: 'search', query: '', highlightBar: null, showTooltip: false, duration: 900 },
  { target: 'search', query: 'F', highlightBar: null, showTooltip: false, duration: 180 },
  { target: 'search', query: 'Fa', highlightBar: null, showTooltip: false, duration: 160 },
  { target: 'search', query: 'Fai', highlightBar: null, showTooltip: false, duration: 160 },
  { target: 'search', query: 'Fair', highlightBar: null, showTooltip: false, duration: 150 },
  { target: 'search', query: 'Fairn', highlightBar: null, showTooltip: false, duration: 150 },
  { target: 'search', query: 'Fairne', highlightBar: null, showTooltip: false, duration: 150 },
  { target: 'search', query: 'Fairnes', highlightBar: null, showTooltip: false, duration: 150 },
  { target: 'search', query: SEARCH_TEXT, highlightBar: null, showTooltip: false, duration: 1200 },
  { target: fairnessBarTarget, query: SEARCH_TEXT, highlightBar: FAIRNESS_BAR_INDEX, showTooltip: true, duration: 2000 },
  { target: 'idle', query: SEARCH_TEXT, highlightBar: FAIRNESS_BAR_INDEX, showTooltip: true, duration: 1000 },
];

const LondonAiVoicesTagViewDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const barsRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);
  const [highlightGeom, setHighlightGeom] = useState({ left: 0, height: 0, top: 0 });

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const matchingIndices = useMemo(() => getMatchingBarIndices(step.query), [step.query]);
  const hasSearch = matchingIndices != null;

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
    else delete targetRefs.current[key];
  };

  const maxBarHeight = useMemo(
    () => Math.max(...TAG_ENTRIES.map((entry) => entry.height)),
    []
  );

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
        x: targetRect.left - containerRect.left + targetRect.width * 0.5,
        y: targetRect.top - containerRect.top + targetRect.height * 0.75,
        visible: true,
      });
    };

    updateCursor();
    window.addEventListener('resize', updateCursor);
    return () => window.removeEventListener('resize', updateCursor);
  }, [step, running, isIdle]);

  useEffect(() => {
    if (!running || step.highlightBar == null) return undefined;

    const updateHighlight = () => {
      const bars = barsRef.current;
      const bar = bars?.children?.[step.highlightBar];
      const stage = bars?.parentElement;
      if (!bar || !stage) return;

      const stageRect = stage.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();
      setHighlightGeom({
        left: barRect.left - stageRect.left + barRect.width / 2,
        height: barRect.height,
        top: barRect.top - stageRect.top,
      });
    };

    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [step.highlightBar, running]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <LondonAiVoicesDemoChrome
      containerRef={containerRef}
      cursor={cursor}
      activeView="tag"
      searchQuery={step.query}
      searchRef={setTargetRef('search')}
      isSearchHovered={step.target === 'search'}
      tagRef={setTargetRef('tag-view')}
      networkRef={setTargetRef('network-view')}
      modeRef={setTargetRef('mode')}
      className={className}
      style={style}
    >
      <div className="laiv-demo__bars" ref={barsRef}>
        {TAG_ENTRIES.map((entry, index) => {
          const isMatch = hasSearch && matchingIndices.includes(index);
          const isDimmed = hasSearch && !isMatch;

          return (
            <div
              key={entry.label}
              ref={setTargetRef(`bar-${index}`)}
              className={[
                'laiv-demo__bar',
                isMatch ? 'is-matched' : '',
                isDimmed ? 'is-dimmed' : '',
              ].filter(Boolean).join(' ')}
              style={{ height: `${getTagBarHeightPercent(entry.height, maxBarHeight)}%` }}
            />
          );
        })}
      </div>

      <div
        className={[
          'laiv-demo__bar-highlight',
          step.highlightBar != null ? 'is-visible' : '',
        ].filter(Boolean).join(' ')}
        style={{
          left: `${highlightGeom.left}px`,
          height: `${highlightGeom.height}px`,
          transform: 'translateX(-50%)',
        }}
      />

      <div
        className={[
          'laiv-demo__bar-tooltip',
          step.showTooltip ? 'is-visible' : '',
        ].filter(Boolean).join(' ')}
        style={{ left: `${highlightGeom.left}px`, top: `${highlightGeom.top}px` }}
      >
        {step.highlightBar != null ? FAIRNESS_BAR_LABEL : ''}
      </div>
    </LondonAiVoicesDemoChrome>
  );
};

export default LondonAiVoicesTagViewDemo;

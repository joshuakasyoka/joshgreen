import React, { useEffect, useRef, useState } from 'react';
import LondonAiVoicesDemoChrome from './LondonAiVoicesDemoChrome';
import { FAIRNESS_BAR_INDEX, FAIRNESS_BAR_LABEL, TAG_ENTRIES, getMatchingBarIndices, getTagBarHeightPercent } from './londonAiVoicesDemoData';
import './LondonAiVoicesDemoShared.css';

const SEARCH_TEXT = 'Fairness';

const STEPS = [
  { target: 'search', query: SEARCH_TEXT, showCard: false, activeTag: null, hoveredTag: null, duration: 1000 },
  { target: `bar-${FAIRNESS_BAR_INDEX}`, query: SEARCH_TEXT, showCard: false, activeTag: null, hoveredTag: null, duration: 1400 },
  { target: `bar-${FAIRNESS_BAR_INDEX}`, query: SEARCH_TEXT, showCard: true, activeTag: null, hoveredTag: null, duration: 1600 },
  { target: 'card', query: SEARCH_TEXT, showCard: true, activeTag: null, hoveredTag: null, duration: 1400 },
  { target: 'tag-fairness', query: SEARCH_TEXT, showCard: true, activeTag: 'fairness', hoveredTag: 'fairness', duration: 1600 },
  { target: 'tag-justice', query: SEARCH_TEXT, showCard: true, activeTag: 'justice', hoveredTag: 'justice', duration: 1400 },
  { target: 'tag-inclusivity', query: SEARCH_TEXT, showCard: true, activeTag: 'inclusivity', hoveredTag: 'inclusivity', duration: 1400 },
  { target: 'idle', query: SEARCH_TEXT, showCard: true, activeTag: null, hoveredTag: null, duration: 1000 },
];

const LondonAiVoicesContributionDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const barsRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);
  const [highlightGeom, setHighlightGeom] = useState({ left: 0, top: 0 });

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const matchingIndices = getMatchingBarIndices(step.query);
  const hasSearch = matchingIndices != null;
  const maxBarHeight = Math.max(...TAG_ENTRIES.map((entry) => entry.height));
  const showBarLabel = step.showCard;

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
    else delete targetRefs.current[key];
  };

  const tagRefs = (tag) => setTargetRef(`tag-${tag}`);

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
    if (!running || !showBarLabel) return undefined;

    const updateHighlight = () => {
      const bars = barsRef.current;
      const bar = bars?.children?.[FAIRNESS_BAR_INDEX];
      const stage = bars?.parentElement;
      if (!bar || !stage) return;

      const stageRect = stage.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();
      setHighlightGeom({
        left: barRect.left - stageRect.left + barRect.width / 2,
        top: barRect.top - stageRect.top,
      });
    };

    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [showBarLabel, running]);

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
      showCard={step.showCard}
      cardActiveTag={step.activeTag}
      hoveredTag={step.hoveredTag}
      searchRef={setTargetRef('search')}
      cardRef={setTargetRef('card')}
      tagRefs={tagRefs}
      tagRef={setTargetRef('tag-view')}
      networkRef={setTargetRef('network-view')}
      modeRef={setTargetRef('mode')}
      className={className}
      style={style}
    >
      <div className="laiv-demo__bars" ref={barsRef} aria-hidden="true">
        {TAG_ENTRIES.map((entry, index) => {
          const isMatch = hasSearch && matchingIndices.includes(index);
          const isDimmed = hasSearch ? !isMatch : step.showCard;

          return (
            <div
              key={entry.label}
              ref={index === FAIRNESS_BAR_INDEX ? setTargetRef(`bar-${FAIRNESS_BAR_INDEX}`) : undefined}
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
          'laiv-demo__bar-tooltip',
          showBarLabel ? 'is-visible' : '',
        ].filter(Boolean).join(' ')}
        style={{ left: `${highlightGeom.left}px`, top: `${highlightGeom.top}px` }}
      >
        {FAIRNESS_BAR_LABEL}
      </div>
    </LondonAiVoicesDemoChrome>
  );
};

export default LondonAiVoicesContributionDemo;

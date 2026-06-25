import React, { useEffect, useRef, useState } from 'react';
import LondonAiVoicesDemoChrome, { ContributionCard } from './LondonAiVoicesDemoChrome';
import {
  ACCENT,
  NETWORK_CONTRIBUTION_NODE,
  NETWORK_HIGHLIGHT_NODES,
  NETWORK_LINKS,
  NETWORK_NODES,
} from './londonAiVoicesDemoData';
import './LondonAiVoicesDemoShared.css';

const STEPS = [
  { target: 'network-view', highlightNode: null, showCard: false, activeTag: null, hoveredTag: null, duration: 1200 },
  { target: `node-${NETWORK_CONTRIBUTION_NODE}`, highlightNode: NETWORK_CONTRIBUTION_NODE, showCard: false, activeTag: null, hoveredTag: null, duration: 1800 },
  { target: `node-${NETWORK_CONTRIBUTION_NODE}`, highlightNode: NETWORK_CONTRIBUTION_NODE, showCard: true, activeTag: 'fairness', hoveredTag: null, duration: 2000 },
  { target: 'tag-fairness', highlightNode: NETWORK_CONTRIBUTION_NODE, showCard: true, activeTag: 'fairness', hoveredTag: 'fairness', duration: 1800 },
  { target: 'idle', highlightNode: null, showCard: true, activeTag: null, hoveredTag: null, duration: 1000 },
];

const initSimNodes = () =>
  NETWORK_NODES.map((node, index) => ({
    x: node.x,
    y: node.y,
    vx: 0,
    vy: 0,
    ax: node.x,
    ay: node.y,
    phase: index * 0.83,
  }));

const LondonAiVoicesNetworkDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const graphRef = useRef(null);
  const targetRefs = useRef({});
  const frameRef = useRef(null);
  const simNodesRef = useRef(initSimNodes());
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);
  const [frame, setFrame] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);
  const [cardGeom, setCardGeom] = useState({ left: 0, top: 0 });

  const step = STEPS[stepIndex];
  const isIdle = step.target === 'idle';
  const showCard = selectedNode != null || step.showCard;
  const cardAnchorIndex = selectedNode ?? (
    step.showCard ? (step.highlightNode ?? NETWORK_CONTRIBUTION_NODE) : null
  );
  const cardActiveTag = selectedNode != null ? 'fairness' : step.activeTag;
  const hoveredTag = selectedNode != null ? null : step.hoveredTag;

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
    else delete targetRefs.current[key];
  };

  const tagRefs = (tag) => setTargetRef(`tag-${tag}`);

  const handleNodeClick = (index) => {
    setSelectedNode(index);
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;

    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) * 0.001;
      simNodesRef.current.forEach((node) => {
        const pullX = (node.ax - node.x) * 0.035;
        const pullY = (node.ay - node.y) * 0.035;
        const wanderX = Math.sin(t * 1.15 + node.phase) * 0.0024;
        const wanderY = Math.cos(t * 0.92 + node.phase * 1.2) * 0.002;
        node.vx = (node.vx + pullX + wanderX) * 0.9;
        node.vy = (node.vy + pullY + wanderY) * 0.9;
        node.x += node.vx;
        node.y += node.vy;
      });
      setFrame((current) => current + 1);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running]);

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
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: true,
      });
    };

    updateCursor();
    window.addEventListener('resize', updateCursor);
    return () => window.removeEventListener('resize', updateCursor);
  }, [step, running, isIdle, frame]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  const nodePosition = (node, index) => {
    const sim = simNodesRef.current[index];
    const x = sim?.x ?? node.x;
    const y = sim?.y ?? node.y;
    return {
      x: x * 100,
      y: y * 100,
      r: Math.max(1.1, node.r * 0.42),
    };
  };

  const getNodeScreenPosition = (index) => {
    const graph = graphRef.current;
    if (!graph || index == null) return null;

    const svg = graph.querySelector('svg');
    if (!svg) return null;

    const { x, y } = nodePosition(NETWORK_NODES[index], index);
    const stageRect = graph.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const scale = Math.min(svgRect.width / 100, svgRect.height / 100);
    const renderedW = 100 * scale;
    const renderedH = 100 * scale;
    const offsetX = (svgRect.width - renderedW) / 2;
    const offsetY = (svgRect.height - renderedH) / 2;

    return {
      left: svgRect.left - stageRect.left + offsetX + (x / 100) * renderedW,
      top: svgRect.top - stageRect.top + offsetY + (y / 100) * renderedH,
    };
  };

  useEffect(() => {
    if (!showCard || cardAnchorIndex == null) return undefined;

    const updateCardPosition = () => {
      const position = getNodeScreenPosition(cardAnchorIndex);
      if (position) setCardGeom(position);
    };

    updateCardPosition();
    window.addEventListener('resize', updateCardPosition);
    return () => window.removeEventListener('resize', updateCardPosition);
  }, [showCard, cardAnchorIndex, frame]);

  return (
    <LondonAiVoicesDemoChrome
      containerRef={containerRef}
      cursor={cursor}
      activeView="network"
      searchQuery=""
      cardPlacement="overlay"
      stageClassName="laiv-demo__stage--card-overlay"
      showCard={false}
      searchRef={setTargetRef('search')}
      networkRef={setTargetRef('network-view')}
      tagRef={setTargetRef('tag-view')}
      modeRef={setTargetRef('mode')}
      hoveredView={step.target === 'network-view' ? 'network' : null}
      className={className}
      style={style}
    >
      <div className="laiv-demo__graph laiv-demo__graph--force" ref={graphRef}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g className="laiv-demo__graph-links">
            {NETWORK_LINKS.map(([from, to]) => {
              const a = nodePosition(NETWORK_NODES[from], from);
              const b = nodePosition(NETWORK_NODES[to], to);
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="0.22"
                />
              );
            })}
          </g>
          <g className="laiv-demo__graph-nodes">
            {NETWORK_NODES.map((node, index) => {
              const { x, y, r } = nodePosition(node, index);
              const isHighlighted =
                step.highlightNode === index ||
                selectedNode === index;
              const refKey = NETWORK_HIGHLIGHT_NODES.includes(index) ? `node-${index}` : null;
              const hitR = Math.max(r * 2.4, 2.8);

              return (
                <g
                  key={node.id}
                  ref={refKey ? setTargetRef(refKey) : undefined}
                  className={['laiv-demo__node', isHighlighted ? 'is-highlighted' : ''].filter(Boolean).join(' ')}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={hitR}
                    fill="transparent"
                    className="laiv-demo__node-hit"
                    onClick={() => handleNodeClick(index)}
                  />
                  <circle cx={x} cy={y} r={r} fill={ACCENT} pointerEvents="none" />
                </g>
              );
            })}
          </g>
        </svg>

        <ContributionCard
          visible={showCard}
          activeTag={cardActiveTag}
          hoveredTag={hoveredTag}
          cardRef={setTargetRef('card')}
          tagRefs={tagRefs}
          className="laiv-demo__card--overlay"
          style={{ left: `${cardGeom.left}px`, top: `${cardGeom.top}px` }}
        />
      </div>
    </LondonAiVoicesDemoChrome>
  );
};

export default LondonAiVoicesNetworkDemo;

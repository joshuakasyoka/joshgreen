import React, { useEffect, useRef, useState } from 'react';
import {
  DemoCursor,
  EmmaActionCard,
  EmmaLayerCard,
} from './EmmaGisDemoShared';
import './EmmaGisDemoShared.css';

const ACTION_APIS = [
  'GET /api/v1/layers/world-heritage/features',
  'POST /api/v1/spatial/buffer — distance: 25000m',
  'POST /api/v1/spatial/intersects — target: /api/v1/layers/major-roads',
  'PUT /api/v1/tools/spatial-query/session — prefill applied',
];

const STEPS = [
  { card: 'layer', expanded: false, target: null, duration: 2200 },
  { card: 'layer', expanded: false, target: 'layer-card', duration: 1800 },
  { card: 'action', expanded: false, target: 'action-card', duration: 2000 },
  { card: 'action', expanded: false, target: 'action-toggle', duration: 1500 },
  { card: 'action', expanded: true, target: 'action-toggle', duration: 2800 },
  { card: 'action', expanded: true, target: null, duration: 1200 },
];

const EmmaActionCardDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });

  const step = STEPS[stepIndex];

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
      if (!container || !step.target) {
        setCursor((prev) => ({ ...prev, visible: Boolean(step.target) }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setCursor({
        x: targetRect.left - containerRect.left + targetRect.width * 0.55,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: true,
      });
    };

    const frame = requestAnimationFrame(updateCursor);
    window.addEventListener('resize', updateCursor);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`emma-isolated-demo ${className}`.trim()} style={style}>
      <div className="emma-isolated-demo__stage emma-isolated-demo__stage--centered" ref={containerRef}>
        <div className="emma-isolated-demo__card-anchor">
          {step.card === 'layer' ? (
            <span ref={setTargetRef('layer-card')}>
              <EmmaLayerCard
                visible
                title="Transport Network added to layer tree"
                body='2 layers added under "Transport Network". Toggle visibility in the Layers panel.'
              />
            </span>
          ) : (
            <span ref={setTargetRef('action-card')}>
              <EmmaActionCard
                visible
                title="Spatial Query tool opened"
                body="World Heritage Sites, 25 km buffer, Major Roads target"
                apis={ACTION_APIS}
                expanded={step.expanded}
                toggleRef={setTargetRef('action-toggle')}
              />
            </span>
          )}
        </div>

        <DemoCursor x={cursor.x} y={cursor.y} visible={cursor.visible} />
      </div>
    </div>
  );
};

export default EmmaActionCardDemo;

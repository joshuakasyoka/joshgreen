import React, { useEffect, useRef, useState } from 'react';
import { DemoCursor, EmmaPermissionCard } from './EmmaGisDemoShared';
import './EmmaGisDemoShared.css';

const PERMISSION = {
  title: 'Add Transport Network to layer tree',
  command: 'addLayerGroup("Transport Network")',
};

const STEPS = [
  { status: 'pending', allowHover: false, allowSelected: false, target: null, duration: 2200 },
  { status: 'pending', allowHover: false, allowSelected: false, target: 'permission-allow', duration: 1600 },
  { status: 'pending', allowHover: true, allowSelected: false, target: 'permission-allow', duration: 1200 },
  { status: 'pending', allowHover: false, allowSelected: true, target: 'permission-allow', duration: 800 },
  { status: 'approved', allowHover: false, allowSelected: false, target: null, duration: 2800 },
  { status: 'pending', allowHover: false, allowSelected: false, target: null, duration: 1200 },
];

const EmmaPermissionsDemo = ({ className = '', style }) => {
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
        x: targetRect.left - containerRect.left + targetRect.width * 0.5,
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
          <EmmaPermissionCard
            title={PERMISSION.title}
            command={PERMISSION.command}
            status={step.status}
            allowHover={step.allowHover}
            allowSelected={step.allowSelected}
            allowRef={setTargetRef('permission-allow')}
            denyRef={setTargetRef('permission-deny')}
          />
        </div>

        <DemoCursor x={cursor.x} y={cursor.y} visible={cursor.visible} />
      </div>
    </div>
  );
};

export default EmmaPermissionsDemo;

import React, { useEffect, useRef, useState } from 'react';
import './BugClubStackDiagram.css';

const PIPELINE = [
  {
    id: 'build',
    title: 'Design & release',
    items: ['Cursor', 'Xcode', 'TestFlight App'],
  },
  {
    id: 'client',
    title: 'SwiftUI · iPhone',
    items: ['Camera', 'Core Location', 'Core Image + Vision'],
  },
  {
    id: 'backend',
    title: 'Supabase',
    items: ['Auth & profiles', 'Feed & leaderboard', 'Edge Functions'],
  },
];

const SERVICES = [
  { id: 'fable', title: 'Claude Fable', subtitle: 'Fast iteration', detail: 'Flows · prompt tuning' },
  { id: 'opus', title: 'Claude Opus', subtitle: 'Vision + structured output', detail: 'Species ID · card stats' },
  { id: 'gemini', title: 'Gemini', subtitle: 'Nano Banana', detail: 'Field-guide illustrations' },
  { id: 'vercel', title: 'Vercel', subtitle: 'Hosting', detail: 'Privacy policy URL' },
];

const STEPS = [
  { showBuild: true, showClient: false, showBackend: false, showPipe1: false, showPipe2: false, showFable: false, showOpus: false, showGemini: false, showVercel: false, duration: 1100 },
  { showBuild: true, showClient: false, showBackend: false, showPipe1: true, showPipe2: false, showFable: false, showOpus: false, showGemini: false, showVercel: false, duration: 700 },
  { showBuild: true, showClient: true, showBackend: false, showPipe1: true, showPipe2: false, showFable: false, showOpus: false, showGemini: false, showVercel: false, duration: 1100 },
  { showBuild: true, showClient: true, showBackend: false, showPipe1: true, showPipe2: true, showFable: false, showOpus: false, showGemini: false, showVercel: false, duration: 700 },
  { showBuild: true, showClient: true, showBackend: true, showPipe1: true, showPipe2: true, showFable: false, showOpus: false, showGemini: false, showVercel: false, duration: 1100 },
  { showBuild: true, showClient: true, showBackend: true, showPipe1: true, showPipe2: true, showFable: true, showOpus: false, showGemini: false, showVercel: false, duration: 800 },
  { showBuild: true, showClient: true, showBackend: true, showPipe1: true, showPipe2: true, showFable: true, showOpus: true, showGemini: false, showVercel: false, duration: 800 },
  { showBuild: true, showClient: true, showBackend: true, showPipe1: true, showPipe2: true, showFable: true, showOpus: true, showGemini: true, showVercel: false, duration: 800 },
  { showBuild: true, showClient: true, showBackend: true, showPipe1: true, showPipe2: true, showFable: true, showOpus: true, showGemini: true, showVercel: true, duration: 1100 },
  { showBuild: true, showClient: true, showBackend: true, showPipe1: true, showPipe2: true, showFable: true, showOpus: true, showGemini: true, showVercel: true, duration: 4200 },
];

function StackBlock({ block, visible }) {
  return (
    <div className={`bugclub-stack__layer bugclub-stack__layer--${block.id} ${visible ? 'is-visible' : ''}`}>
      <div className="bugclub-stack__layer-title">{block.title}</div>
      <div className="bugclub-stack__layer-items">
        {block.items.map((item, itemIndex) => (
          <span
            key={item}
            className="bugclub-stack__chip is-visible"
            style={{ '--chip-delay': `${itemIndex * 120}ms` }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function PipeConnector({ visible, vertical = false }) {
  return (
    <span
      className={`bugclub-stack__connector ${vertical ? 'bugclub-stack__connector--v' : 'bugclub-stack__connector--h'} ${visible ? 'is-visible' : ''}`}
      aria-hidden="true"
    />
  );
}

export default function BugClubStackDiagram({ className = '' }) {
  const containerRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const pipelineVisible = {
    build: step.showBuild,
    client: step.showClient,
    backend: step.showBackend,
  };
  const serviceVisible = {
    fable: step.showFable,
    opus: step.showOpus,
    gemini: step.showGemini,
    vercel: step.showVercel,
  };
  const showServicesRow = step.showFable || step.showOpus || step.showGemini || step.showVercel;

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

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  useEffect(() => {
    if (!running) setStepIndex(0);
  }, [running]);

  return (
    <div className={`bugclub-stack ${className}`.trim()} aria-hidden="true">
      <div
        ref={containerRef}
        className={`bugclub-stack__canvas ${running ? 'is-running' : ''}`}
      >
        <div className="bugclub-stack__row bugclub-stack__row--pipeline">
          <StackBlock block={PIPELINE[0]} visible={pipelineVisible.build} />
          <PipeConnector visible={step.showPipe1} />
          <StackBlock block={PIPELINE[1]} visible={pipelineVisible.client} />
          <PipeConnector visible={step.showPipe2} />
          <StackBlock block={PIPELINE[2]} visible={pipelineVisible.backend} />
        </div>

        <PipeConnector visible={step.showBackend && showServicesRow} vertical />

        <div className={`bugclub-stack__row bugclub-stack__row--services ${showServicesRow ? 'is-active' : ''}`}>
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={[
                'bugclub-stack__service',
                `bugclub-stack__service--${service.id}`,
                serviceVisible[service.id] ? 'is-visible' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="bugclub-stack__service-title">{service.title}</div>
              <div className="bugclub-stack__service-sub">{service.subtitle}</div>
              <div className="bugclub-stack__service-detail">{service.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

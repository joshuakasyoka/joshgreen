import React, { useEffect, useRef, useState } from 'react';
import { DemoCursor, MgoBadge, Sym } from './EmmaGisDemoShared';
import './EmmaGisDemoShared.css';

const CHATS = [
  { id: 'corridor', title: 'Substation siting — northern corridor' },
  { id: 'spatial', title: 'Spatial query — corridor intersect' },
  { id: 'bundle', title: 'Ecologist working bundle' },
  { id: 'flood', title: 'Flood risk — Avonmouth expansion' },
  { id: 'ecology', title: 'Ecology constraints — eastern route' },
];

const STEPS = [
  { activeId: null, target: 'rail-expand', duration: 1800 },
  { activeId: 'corridor', target: 'chat-corridor', duration: 2000 },
  { activeId: 'spatial', target: 'chat-spatial', duration: 1800 },
  { activeId: 'bundle', target: 'chat-bundle', duration: 1800 },
  { activeId: 'flood', target: 'chat-flood', duration: 1600 },
  { activeId: 'ecology', target: 'chat-ecology', duration: 1600 },
  { activeId: null, target: null, duration: 1200 },
];

const EmmaChatThreadsDemo = ({ className = '', style }) => {
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
      <div className="emma-isolated-demo__stage emma-isolated-demo__stage--threads" ref={containerRef}>
        <aside className="emma-threads-demo__rail">
          <div className="emma-threads-demo__rail-top">
            <span ref={setTargetRef('rail-expand')} className="emma-threads-demo__icon-btn">
              <Sym name="dock_to_left" size={20} color="#33363F" />
            </span>
            <span className="emma-threads-demo__search">
              <Sym name="search" size={15} color="#9ca3af" />
              <span>Search</span>
            </span>
          </div>

          <button type="button" className="emma-threads-demo__new-chat">
            <Sym name="chat_add_on" size={20} color="#33363F" fill={0} />
            <span>New chat</span>
          </button>

          <p className="emma-threads-demo__section-label">Recent</p>
          <ul className="emma-threads-demo__list">
            {CHATS.map((chat) => (
              <li key={chat.id}>
                <span
                  ref={setTargetRef(`chat-${chat.id}`)}
                  className={[
                    'emma-threads-demo__chat',
                    step.activeId === chat.id ? 'is-active' : '',
                    step.target === `chat-${chat.id}` && step.activeId !== chat.id ? 'is-hover' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {chat.title}
                </span>
              </li>
            ))}
          </ul>

          <div className="emma-threads-demo__badge">
            <MgoBadge />
          </div>
        </aside>

        <DemoCursor x={cursor.x} y={cursor.y} visible={cursor.visible} />
      </div>
    </div>
  );
};

export default EmmaChatThreadsDemo;

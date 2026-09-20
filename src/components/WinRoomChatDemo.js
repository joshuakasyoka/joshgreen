import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUp, Check, FileText, Users } from 'lucide-react';
import { EmmaMark } from './EmmaArtefactsDemoShared';
import './WinRoomChatDemo.css';

// A mock exchange between a Win Room agent and someone leading their first
// pursuit. The agent acts out what the research found: work is won before
// the notice, relationships stay human, and every suggestion shows its
// source. Illustrative - no real clients or people.

const USER_1 = "I've been asked to lead my first pursuit. Where do I start?";
const AGENT_1 = 'Earlier than the tender. Most work is won before the notice lands - here is where you are.';
const AGENT_1_ASK = 'Who is the client, and who do you already know there?';
const USER_2 = "A regional water utility. I don't know anyone there yet.";
const AGENT_2 = 'Then relationships come first, and that part stays with you. Two colleagues have delivered for them recently:';
const USER_3 = "I'll reach out to both. What comes next?";
const AGENT_3 = 'Next is shaping the ask - getting in front of the client before the tender is written. I’m going to create you a draft capture plan to take into those conversations.';

const PROCESS = [
  ['Hear about it early', 'done'],
  ['Know the field', 'now'],
  ['Shape the ask', 'next'],
  ['Decision to pursue', 'next'],
];

const PEOPLE = [
  ['Delivery lead, water', '2 past projects with this client', 'Project records'],
  ['Client director', 'Runs the current framework', 'CRM'],
];


export const typing = (text, key) =>
  text.split('').map((_, i) => ({ key, input: text.slice(0, i + 1), duration: i === 0 ? 300 : 32 }));

// Each step carries everything already on screen, plus what changes.
const A1 = { u1: true, a1: true, a1card: true, a1ask: true };
const A2 = { ...A1, u2: true, a2: true, a2people: true };
const A3 = { ...A2, u3: true, a3: true };

const STEPS = [
  { duration: 700 },
  ...typing(USER_1, 'u1'),
  { input: USER_1, send: true, duration: 500 },
  { u1: true, thinking: 1, duration: 1100 },
  { u1: true, a1: true, duration: 2300 },
  { u1: true, a1: true, a1card: true, duration: 1800 },
  { ...A1, duration: 1800 },
  ...typing(USER_2, 'u2').map((st) => ({ ...A1, ...st })),
  { ...A1, input: USER_2, send: true, duration: 500 },
  { ...A1, u2: true, thinking: 2, duration: 1100 },
  { ...A1, u2: true, a2: true, duration: 2400 },
  { ...A2, duration: 2600 },
  ...typing(USER_3, 'u3').map((st) => ({ ...A2, ...st })),
  { ...A2, input: USER_3, send: true, duration: 500 },
  { ...A2, u3: true, thinking: 3, duration: 1100 },
  { ...A3, duration: 3400 },
  { ...A3, tile: 'creating', duration: 1600 },
  { ...A3, tile: 'created', duration: 5200 },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Agent text streams in word by word each time it appears.
export const Stream = ({ text, active }) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!active || !ref.current || prefersReducedMotion()) return undefined;
    const tween = gsap.fromTo(
      ref.current.querySelectorAll('.wr-chat__word'),
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power1.out', stagger: 0.05 }
    );
    return () => tween.kill();
  }, [active, text]);
  return (
    <p ref={ref}>
      {text.split(/(\s+)/).map((part, idx) =>
        /^\s+$/.test(part) ? part : (
          <span key={idx} className="wr-chat__word">
            {part}
          </span>
        )
      )}
    </p>
  );
};

// The EMMA mark; it spins while the agent is thinking.
export const Agent = ({ visible, thinking, children }) => (
  <div className={`wr-chat__agent ${visible ? 'is-visible' : ''}`}>
    <EmmaMark size={24} state={thinking ? 'thinking' : 'idle'} />
    <div className="wr-chat__agent-body">{children}</div>
  </div>
);

const WinRoomChatDemo = ({ className = '' }) => {
  const containerRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const step = STEPS[index];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) {
      setIndex(0);
      return undefined;
    }
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % STEPS.length), step.duration);
    return () => window.clearTimeout(timer);
  }, [running, index, step.duration]);

  const input = step.input || '';

  return (
    <div className={`wr-chat ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className="wr-chat__window">
        <div className="wr-chat__header">
          <EmmaMark size={24} />
          <span>
            <strong>Win Room</strong>
            <small>Pursuit assistant · concept</small>
          </span>
        </div>

        <div className="wr-chat__thread">
          <div className={`wr-chat__user ${step.u1 ? 'is-visible' : ''}`}>{USER_1}</div>

          {step.thinking === 1 && (
            <Agent visible thinking>
              <span className="wr-chat__dots"><i /><i /><i /></span>
            </Agent>
          )}

          <Agent visible={step.a1}>
            <Stream text={AGENT_1} active={step.a1} />
            <div className={`wr-chat__card ${step.a1card ? 'is-visible' : ''}`}>
              <div className="wr-chat__card-label">Where you are</div>
              {PROCESS.map(([label, state], idx) => (
                <div key={label} className={`wr-chat__step is-${state}`} style={{ '--i': idx }}>
                  <span className="wr-chat__step-dot">{state === 'done' && <Check size={10} strokeWidth={3} />}</span>
                  {label}
                  {state === 'now' && <em>You are here</em>}
                </div>
              ))}
            </div>
            {step.a1ask && <Stream text={AGENT_1_ASK} active={step.a1ask} />}
          </Agent>

          <div className={`wr-chat__user ${step.u2 ? 'is-visible' : ''}`}>{USER_2}</div>

          {step.thinking === 2 && (
            <Agent visible thinking>
              <span className="wr-chat__dots"><i /><i /><i /></span>
            </Agent>
          )}

          <Agent visible={step.a2}>
            <Stream text={AGENT_2} active={step.a2} />
            <div className={`wr-chat__card ${step.a2people ? 'is-visible' : ''}`}>
              <div className="wr-chat__card-label">
                <Users size={12} strokeWidth={2} /> People to talk to
              </div>
              {PEOPLE.map(([role, why, source], idx) => (
                <div key={role} className="wr-chat__person" style={{ '--i': idx }}>
                  <span>
                    <strong>{role}</strong>
                    <small>{why}</small>
                  </span>
                  <span className="wr-chat__source">{source}</span>
                </div>
              ))}
            </div>
          </Agent>

          <div className={`wr-chat__user ${step.u3 ? 'is-visible' : ''}`}>{USER_3}</div>

          {step.thinking === 3 && (
            <Agent visible thinking>
              <span className="wr-chat__dots"><i /><i /><i /></span>
            </Agent>
          )}

          <Agent visible={step.a3}>
            <Stream text={AGENT_3} active={step.a3} />
            {/* The artefact is announced, not shown: a tile, no contents. */}
            {step.tile && (
              <div className={`wr-chat__tile is-${step.tile}`}>
                <span className="wr-chat__tile-icon">
                  <FileText size={16} strokeWidth={1.8} />
                </span>
                <span className="wr-chat__tile-text">
                  <strong>Draft capture plan</strong>
                  <small>{step.tile === 'creating' ? 'Creating…' : 'Document · Created just now'}</small>
                </span>
                <span className="wr-chat__tile-status">
                  {step.tile === 'created' ? <Check size={12} strokeWidth={2.6} /> : <span className="wr-chat__tile-spinner" />}
                </span>
              </div>
            )}
          </Agent>
        </div>

        <div className="wr-chat__composer">
          <span className={input ? 'wr-chat__typed' : 'wr-chat__placeholder'}>{input || 'Ask about a pursuit'}</span>
          <span className={`wr-chat__send ${step.send ? 'is-active' : ''}`}>
            <ArrowUp size={14} strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default WinRoomChatDemo;

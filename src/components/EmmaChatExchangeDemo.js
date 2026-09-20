import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Check, Layers, Map, FileText } from 'lucide-react';
import { EmmaMark } from './EmmaArtefactsDemoShared';
import { Agent, Stream, typing } from './WinRoomChatDemo';
import './WinRoomChatDemo.css';
import './EmmaChatExchangeDemo.css';

// Common dialogue pattern: establish goal & persona → offer routes →
// ask to change → show the breakdown → suggest a next goal.

const USER_1 = 'I need to check transport access for the northern corridor EMF zone.';
const AGENT_1 =
  "You're a project admin on northern corridor siting. Goal: confirm road access and rail proximity for the EMF zone. Is that right?";
const USER_2 = "Yes - that's the goal.";
const AGENT_2 = 'Three routes from here. Pick one and I will take the next step.';
const USER_3 = 'Bring the transport and rail layers forward.';
const AGENT_3 = 'I will make these changes. Nothing moves on the map until you approve.';
const AGENT_4 = 'Here is what changed.';
const AGENT_5 =
  'Do you have a new goal for this site? I could check ecology constraints along the same corridor next.';

const ROUTES = [
  { icon: Layers, title: 'Bring transport & rail layers forward', hint: 'Fastest way to see access on the map' },
  { icon: Map, title: 'Run a spatial buffer on the corridor', hint: 'Measure standoff from rail and roads' },
  { icon: FileText, title: 'Summarise access constraints', hint: 'A short note you can share with the bid team' },
];

const CHANGES = [
  'addLayerGroup("Transport Network")',
  'addLayer("Road network")',
  'addLayer("Rail network")',
];

const COMMAND = 'addLayerGroup("Transport Network")';

// Cumulative visibility flags for each beat of the pattern.
const GOAL = { u1: true, a1: true };
const ROUTES_SHOWN = { ...GOAL, u2: true, a2: true, routes: true };
const ASKED = { ...ROUTES_SHOWN, u3: true, a3: true };
const DONE = { ...ASKED, permission: 'approved', breakdown: true };

const STEPS = [
  { duration: 700 },
  // 1. Establish goal & persona, confirm
  ...typing(USER_1),
  { input: USER_1, send: true, duration: 500 },
  { u1: true, thinking: 1, duration: 1100 },
  { ...GOAL, duration: 3800 },
  ...typing(USER_2).map((st) => ({ ...GOAL, ...st })),
  { ...GOAL, input: USER_2, send: true, duration: 500 },
  { ...GOAL, u2: true, thinking: 2, duration: 1000 },
  // 2. Options / routes to the goal
  { ...ROUTES_SHOWN, duration: 4200 },
  // 3. User asks for the change + permission
  ...typing(USER_3).map((st) => ({ ...ROUTES_SHOWN, ...st })),
  { ...ROUTES_SHOWN, input: USER_3, send: true, duration: 500 },
  { ...ROUTES_SHOWN, u3: true, thinking: 3, duration: 1000 },
  { ...ASKED, permission: 'pending', duration: 2400 },
  { ...ASKED, permission: 'hover', duration: 700 },
  { ...ASKED, permission: 'pressed', duration: 300 },
  { ...ASKED, permission: 'approved', duration: 900 },
  // 4. Breakdown of changes made
  { ...DONE, duration: 3200 },
  // 5. Follow-up: new goal + suggestion
  { ...DONE, a5: true, duration: 5200 },
];

const EmmaChatExchangeDemo = ({ className = '' }) => {
  const containerRef = useRef(null);
  const threadRef = useRef(null);
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

  // Keep the latest beat in view as the thread grows.
  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    thread.scrollTop = thread.scrollHeight;
  }, [index]);

  const input = step.input || '';
  const approved = step.permission === 'approved';

  return (
    <div className={`wr-chat emma-chat-exchange ${className}`.trim()} aria-hidden="true">
      <div ref={containerRef} className="wr-chat__window emma-chat-exchange__window">
        <div className="wr-chat__header">
          <EmmaMark size={24} />
          <span>
            <strong>Substation siting - northern corridor</strong>
            <small>EMMA · in Moata Geospatial</small>
          </span>
        </div>

        <div ref={threadRef} className="wr-chat__thread emma-chat-exchange__thread">
          <div className={`wr-chat__user ${step.u1 ? 'is-visible' : ''}`}>{USER_1}</div>

          {step.thinking === 1 && (
            <Agent visible thinking>
              <span className="wr-chat__dots"><i /><i /><i /></span>
            </Agent>
          )}

          <Agent visible={step.a1}>
            <Stream text={AGENT_1} active={step.a1 && !step.u2} />
          </Agent>

          <div className={`wr-chat__user ${step.u2 ? 'is-visible' : ''}`}>{USER_2}</div>

          {step.thinking === 2 && (
            <Agent visible thinking>
              <span className="wr-chat__dots"><i /><i /><i /></span>
            </Agent>
          )}

          <Agent visible={step.a2}>
            <Stream text={AGENT_2} active={step.a2 && !step.u3} />
            {step.routes && (
              <div className="emma-chat__routes">
                {ROUTES.map((route, idx) => {
                  const Icon = route.icon;
                  const picked = step.u3 && idx === 0;
                  return (
                    <div
                      key={route.title}
                      className={`emma-chat__route ${picked ? 'is-picked' : ''}`.trim()}
                      style={{ '--i': idx }}
                    >
                      <span className="emma-chat__route-icon">
                        <Icon size={14} strokeWidth={1.8} />
                      </span>
                      <span>
                        <strong>{route.title}</strong>
                        <small>{route.hint}</small>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Agent>

          <div className={`wr-chat__user ${step.u3 ? 'is-visible' : ''}`}>{USER_3}</div>

          {step.thinking === 3 && (
            <Agent visible thinking>
              <span className="wr-chat__dots"><i /><i /><i /></span>
            </Agent>
          )}

          <Agent visible={step.a3}>
            <Stream text={AGENT_3} active={step.a3 && !step.breakdown} />

            {step.permission && (
              <div className={`emma-chat__permission is-${step.permission}`}>
                <div className="emma-chat__permission-head">
                  <Layers size={14} strokeWidth={1.8} />
                  Add Transport Network to layer tree
                  {approved && (
                    <span className="emma-chat__approved">
                      <Check size={11} strokeWidth={2.6} /> Approved
                    </span>
                  )}
                </div>
                <code className="emma-chat__command">$ {COMMAND}</code>
                <div className="emma-chat__actions">
                  <span className="emma-chat__deny">Deny</span>
                  <span className="emma-chat__allow">
                    {approved ? (
                      <>
                        <Check size={12} strokeWidth={2.6} /> Allowed
                      </>
                    ) : (
                      'Allow'
                    )}
                  </span>
                </div>
              </div>
            )}

            {step.breakdown && (
              <>
                <Stream text={AGENT_4} active={step.breakdown && !step.a5} />
                <div className="emma-chat__breakdown">
                  {CHANGES.map((change, idx) => (
                    <div key={change} className="emma-chat__breakdown-row" style={{ '--i': idx }}>
                      <code>{change}</code>
                      <span className="emma-chat__badge">
                        <Check size={10} strokeWidth={2.6} />
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step.a5 && <Stream text={AGENT_5} active={step.a5} />}
          </Agent>
        </div>

        <div className="wr-chat__composer">
          <span className={input ? 'wr-chat__typed' : 'wr-chat__placeholder'}>{input || 'Ask Emma'}</span>
          <span className={`wr-chat__send ${step.send ? 'is-active' : ''}`}>
            <ArrowUp size={14} strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmmaChatExchangeDemo;

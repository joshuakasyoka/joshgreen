import React, { useEffect, useRef, useState } from 'react';
import { WIREFRAME_SPACES, WIREFRAME_TEAMS } from './moataResearchDemoData';
import './MoataProcessDemoShared.css';
import './MoataProblemWireframeDemo.css';

const STEPS = [
  { phase: 'shared', activeTeam: null, showConflict: false, split: false, showComms: false, duration: 900 },
  { phase: 'shared', activeTeam: 'ecology', showConflict: false, split: false, showComms: false, duration: 1100 },
  { phase: 'shared', activeTeam: 'structures', showConflict: true, split: false, showComms: false, duration: 1200 },
  { phase: 'shared', activeTeam: 'utilities', showConflict: true, split: false, showComms: false, duration: 1200 },
  { phase: 'shared', activeTeam: 'utilities', showConflict: true, split: false, showComms: false, duration: 900 },
  { phase: 'split', activeTeam: null, showConflict: false, split: true, showComms: false, duration: 1600 },
  { phase: 'split', activeTeam: null, showConflict: false, split: true, showComms: true, duration: 3200 },
  { phase: 'idle', activeTeam: null, showConflict: false, split: true, showComms: true, duration: 3600 },
];

const getPointById = (space, pointId) => space.points.find((point) => point.id === pointId);

const CONN_CYCLE_MS = 980;

const SpaceMapVisuals = ({ space, spaceIndex, animate, running }) => {
  const [activeConnIndex, setActiveConnIndex] = useState(0);
  const [connTick, setConnTick] = useState(0);
  const [pointsReady, setPointsReady] = useState(false);

  useEffect(() => {
    if (!animate) {
      setPointsReady(false);
      setActiveConnIndex(0);
      setConnTick(0);
      return undefined;
    }

    const revealTimer = window.setTimeout(() => setPointsReady(true), spaceIndex * 120);
    return () => window.clearTimeout(revealTimer);
  }, [animate, spaceIndex]);

  useEffect(() => {
    if (!animate || !running || !pointsReady || space.connections.length === 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveConnIndex((current) => (current + 1) % space.connections.length);
      setConnTick((current) => current + 1);
    }, CONN_CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [animate, running, pointsReady, space.connections.length]);

  const activePair = space.connections[activeConnIndex];
  const activePointIds = new Set(activePair || []);

  return (
    <span className="moata-problem-wireframe-demo__map-visuals" aria-hidden="true">
      <svg
        className="moata-problem-wireframe-demo__connections"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {space.connections.map(([fromId, toId], connectionIndex) => {
          const from = getPointById(space, fromId);
          const to = getPointById(space, toId);
          if (!from || !to) return null;

          const isActive = animate && pointsReady && connectionIndex === activeConnIndex;

          return (
            <line
              key={`${space.id}-${fromId}-${toId}-${isActive ? connTick : 'idle'}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className={[
                'moata-problem-wireframe-demo__connection',
                isActive ? 'is-active' : '',
                pointsReady ? 'is-visible' : '',
              ].filter(Boolean).join(' ')}
              pathLength="1"
            />
          );
        })}
      </svg>

      {space.points.map((point, pointIndex) => (
        <span
          key={point.id}
          className={[
            'moata-problem-wireframe-demo__point',
            pointsReady ? 'is-visible' : '',
            activePointIds.has(point.id) ? 'is-exchange' : '',
          ].filter(Boolean).join(' ')}
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            '--point-delay': `${spaceIndex * 90 + pointIndex * 70}ms`,
          }}
        >
          <span className="moata-problem-wireframe-demo__point-dot">
            {activePointIds.has(point.id) && (
              <span
                key={`pulse-${connTick}`}
                className="moata-problem-wireframe-demo__point-pulse"
                aria-hidden="true"
              />
            )}
          </span>
        </span>
      ))}
    </span>
  );
};

const MoataProblemWireframeDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isSplit = step.split;
  const showComms = step.showComms;

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

  return (
    <div className={`moata-problem-wireframe-demo moata-process-demo ${className}`.trim()} style={style}>
      <div className="moata-process-demo__card" ref={containerRef}>
        <div className="moata-process-demo__label">
          <span className="moata-process-demo__label-dot" />
          Problem framing
        </div>

        <div className="moata-process-demo__body moata-problem-wireframe-demo__body">
          <p className="moata-problem-wireframe-demo__subtitle">
            {!isSplit && 'One shared map, three workstreams'}
            {isSplit && !showComms && (
              <>
                One programme map →{' '}
                <span className="moata-problem-wireframe-demo__highlight">isolated project spaces</span>
              </>
            )}
            {isSplit && showComms && (
              <>
                Private spaces enabled{' '}
                <span className="moata-problem-wireframe-demo__highlight">
                  better communication within team silos
                </span>
              </>
            )}
          </p>

          <div
            className={[
              'moata-problem-wireframe-demo__stage',
              isSplit ? 'is-split' : '',
            ].filter(Boolean).join(' ')}
          >
            {!isSplit ? (
              <div className="moata-problem-wireframe-demo__map">
                <span className="moata-problem-wireframe-demo__map-label">Programme map</span>

                {step.showConflict && (
                  <span className="moata-problem-wireframe-demo__conflict" aria-hidden="true">
                    View conflict
                  </span>
                )}

                {WIREFRAME_TEAMS.map((team) => (
                  <span
                    key={team.id}
                    className={[
                      'moata-problem-wireframe-demo__cursor',
                      step.activeTeam === team.id ? 'is-active' : '',
                    ].filter(Boolean).join(' ')}
                    style={{
                      left: `${team.x}%`,
                      top: `${team.y}%`,
                    }}
                  >
                    <span className="moata-problem-wireframe-demo__cursor-dot" />
                    <span className="moata-problem-wireframe-demo__cursor-label">{team.label}</span>
                  </span>
                ))}
              </div>
            ) : (
              <div className="moata-problem-wireframe-demo__spaces">
                {WIREFRAME_SPACES.map((space, index) => (
                  <div
                    key={space.id}
                    className="moata-problem-wireframe-demo__space"
                    style={{ '--space-delay': `${index * 90}ms` }}
                  >
                    <span className="moata-problem-wireframe-demo__space-label">
                      {space.label}
                      <span className="moata-problem-wireframe-demo__space-private">Private</span>
                    </span>
                    <span className="moata-problem-wireframe-demo__space-map">
                      {showComms && (
                        <>
                          <SpaceMapVisuals
                            space={space}
                            spaceIndex={index}
                            animate={showComms}
                            running={running}
                          />
                          <span className="moata-problem-wireframe-demo__thread" aria-hidden="true">
                            {space.threads.map((message, messageIndex) => (
                              <span
                                key={`${space.id}-${messageIndex}`}
                                className="moata-problem-wireframe-demo__thread-msg"
                                style={{
                                  '--msg-delay': `${index * 100 + 520 + messageIndex * 130}ms`,
                                }}
                              >
                                <span className="moata-problem-wireframe-demo__thread-avatar">
                                  {message.initials}
                                </span>
                                <span className="moata-problem-wireframe-demo__thread-bubble">
                                  {message.text}
                                </span>
                              </span>
                            ))}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoataProblemWireframeDemo;

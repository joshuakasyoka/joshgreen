import React, { useEffect, useRef, useState } from 'react';
import { BugDexPhone } from './BugDexDemoShared';
import './BugDexDemoShared.css';

const ROW_HEIGHT = 56;
const ROW_GAP = 10;
const LOOP_MS = 7400;

const RANK_COLORS = ['#BFDDFA', '#D0BFFA', '#F3FABD'];

const COLLECTORS = [
  {
    id: 'joshybug',
    handle: '@joshybug',
    sub: 'Pollinator · 23 bugs · 1 rare',
    pts: 1165,
    avatar: `${process.env.PUBLIC_URL}/images/bug-club/leaderboard-joshybug.webp`,
  },
  {
    id: 'joshgreen',
    handle: '@joshgreen',
    sub: 'Pollinator · 10 bugs · 3 rare',
    pts: 1140,
    you: true,
    avatar: `${process.env.PUBLIC_URL}/images/bug-club/profile-avatar.webp`,
  },
  {
    id: 'mikipede',
    handle: '@mikipede',
    sub: 'Pollinator · 18 bugs · 0 rare',
    pts: 1120,
    avatar: `${process.env.PUBLIC_URL}/images/bug-club/leaderboard-mikipede.webp`,
  },
];

// A rare find lands mid-loop: @joshgreen's points count up
// and the rows swap places as they overtake first place.
export default function BugDexLeaderboardDemo({ className = '' }) {
  const [cycle, setCycle] = useState(0);
  const [pts, setPts] = useState(1140);
  const [overtaken, setOvertaken] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    setPts(1140);
    setOvertaken(false);

    const countTimer = setTimeout(() => {
      let started = null;
      const tick = (now) => {
        if (started === null) started = now;
        const p = Math.min((now - started) / 900, 1);
        setPts(Math.round(1140 + 240 * (1 - Math.pow(1 - p, 3))));
        if (p < 1) countRef.current = requestAnimationFrame(tick);
      };
      countRef.current = requestAnimationFrame(tick);
    }, 1900);
    const swapTimer = setTimeout(() => setOvertaken(true), 3100);
    const loopTimer = setTimeout(() => setCycle((c) => c + 1), LOOP_MS);

    return () => {
      clearTimeout(countTimer);
      clearTimeout(swapTimer);
      clearTimeout(loopTimer);
      cancelAnimationFrame(countRef.current);
    };
  }, [cycle]);

  // Visual order: before the swap it's the seeded order; after it, you lead.
  const order = overtaken ? ['joshgreen', 'joshybug', 'mikipede'] : ['joshybug', 'joshgreen', 'mikipede'];

  return (
    <BugDexPhone className={className} tab="leaders">
      <div className="bugdex-demo__navtitle">Leaderboard</div>
      <div className="bugdex-demo__board" style={{ height: (ROW_HEIGHT + ROW_GAP) * COLLECTORS.length }}>
        {COLLECTORS.map((collector) => {
          const rank = order.indexOf(collector.id);
          const displayPts = collector.you ? pts : collector.pts;
          return (
            <div
              key={collector.id}
              className={`bugdex-demo__board-row ${collector.you ? 'is-you' : ''}`}
              style={{ top: rank * (ROW_HEIGHT + ROW_GAP), height: ROW_HEIGHT }}
            >
              <div className="bugdex-demo__board-rank" style={{ background: RANK_COLORS[rank] }}>
                {rank + 1}
              </div>
              <div className="bugdex-demo__board-avatar">
                <img
                  src={collector.avatar}
                  alt=""
                  aria-hidden="true"
                  className="bugdex-demo__board-avatar-img"
                />
              </div>
              <div className="bugdex-demo__board-info">
                <div className="bugdex-demo__board-handle">
                  {collector.handle}
                  {collector.you && <span className="bugdex-demo__board-you-chip">YOU</span>}
                </div>
                <div className="bugdex-demo__board-sub">{collector.sub}</div>
              </div>
              <div className="bugdex-demo__board-pts">
                <strong>{displayPts.toLocaleString()}</strong>
                <span>pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </BugDexPhone>
  );
}

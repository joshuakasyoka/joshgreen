import React, { useEffect, useRef, useState } from 'react';
import {
  BugDexPhone,
  TypeIcon,
  RarityGem,
  LadybirdArt,
  StagBeetleArt,
  BlueBeetleArt,
  YellowBeetleArt,
} from './BugDexDemoShared';
import './BugDexDemoShared.css';

const LOOP_MS = 8600;
const PROFILE_AVATAR = `${process.env.PUBLIC_URL}/images/bug-club/profile-avatar.webp`;
const CHIP_STAGGER_MS = 380;
const CHIP_START_MS = 2300;
const SCROLL_PAUSE_MS = 600;
const SCROLL_DURATION_MS = 900;

const animateScroll = (element, to, duration, onComplete) => {
  const from = element.scrollTop;
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - p) ** 3;
    element.scrollTop = from + (to - from) * eased;
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      onComplete?.();
    }
  };

  requestAnimationFrame(tick);
};

const POINT_CHIPS = [
  { pts: '+400', label: 'Catches' },
  { pts: '+200', label: 'Species' },
  { pts: '+180', label: 'Types' },
  { pts: '+250', label: 'Places' },
  { pts: '+350', label: 'Badges' },
];

const PROFILE_CARDS = [
  { art: <StagBeetleArt size={46} />, num: 'N° 001', rarity: 'ultra', name: 'Duelhorn', hp: 90 },
  { art: <YellowBeetleArt size={46} />, num: 'N° 002', rarity: 'common', name: 'Sunspindle', hp: 50 },
  { art: <BlueBeetleArt size={46} />, num: 'N° 003', rarity: 'uncommon', name: 'Azurehood', hp: 60 },
  { art: <LadybirdArt size={46} />, num: 'N° 010', rarity: 'uncommon', name: 'Emberdome', hp: 45 },
];

const OVERVIEW = [
  { num: '10', label: 'Bugs caught', icon: <TypeIcon type="bug" size={13} /> },
  {
    num: '3',
    label: 'Rare finds',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#58c224" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 5.9L12 16.4l-5.3 2.9 1.2-5.9L3.4 9.3l6-.7z" />
      </svg>
    ),
  },
  {
    num: '6',
    label: 'Types collected',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#58c224" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="1.6" />
        <rect x="13" y="4" width="7" height="7" rx="1.6" />
        <rect x="4" y="13" width="7" height="7" rx="1.6" />
        <rect x="13" y="13" width="7" height="7" rx="1.6" />
      </svg>
    ),
  },
  {
    num: '10',
    label: 'Places explored',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#58c224" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z" />
        <path d="M9 4v14M15 6v14" />
      </svg>
    ),
  },
];

// Points climb toward the next rank while the score breakdown
// chips land one by one — the "one more catch" progression hook.
export default function BugDexProfileDemo({ className = '' }) {
  const [cycle, setCycle] = useState(0);
  const [pts, setPts] = useState(1140);
  const [fill, setFill] = useState(58);
  const [chipsIn, setChipsIn] = useState(0);
  const countRef = useRef(null);
  const profileRef = useRef(null);
  const scrollTimersRef = useRef([]);

  useEffect(() => {
    const profile = profileRef.current;
    if (profile) profile.scrollTop = 0;

    setPts(1140);
    setFill(58);
    setChipsIn(0);

    const countTimer = setTimeout(() => {
      setFill(96);
      let started = null;
      const tick = (now) => {
        if (started === null) started = now;
        const p = Math.min((now - started) / 1100, 1);
        setPts(Math.round(1140 + 240 * (1 - Math.pow(1 - p, 3))));
        if (p < 1) countRef.current = requestAnimationFrame(tick);
      };
      countRef.current = requestAnimationFrame(tick);
    }, 900);

    const chipTimers = POINT_CHIPS.map((_, i) =>
      setTimeout(() => setChipsIn(i + 1), CHIP_START_MS + i * CHIP_STAGGER_MS)
    );

    const lastChipAt = CHIP_START_MS + (POINT_CHIPS.length - 1) * CHIP_STAGGER_MS;
    const scrollDownTimer = setTimeout(() => {
      if (!profile) return;
      const maxScroll = profile.scrollHeight - profile.clientHeight;
      if (maxScroll <= 0) return;

      animateScroll(profile, maxScroll, SCROLL_DURATION_MS, () => {
        const scrollUpTimer = setTimeout(() => {
          animateScroll(profile, 0, SCROLL_DURATION_MS);
        }, SCROLL_PAUSE_MS);
        scrollTimersRef.current.push(scrollUpTimer);
      });
    }, lastChipAt + 450);

    const loopTimer = setTimeout(() => setCycle((c) => c + 1), LOOP_MS);

    return () => {
      clearTimeout(countTimer);
      chipTimers.forEach(clearTimeout);
      clearTimeout(scrollDownTimer);
      scrollTimersRef.current.forEach(clearTimeout);
      scrollTimersRef.current = [];
      clearTimeout(loopTimer);
      cancelAnimationFrame(countRef.current);
    };
  }, [cycle]);

  return (
    <BugDexPhone className={className} tab="profile">
      <div className="bugdex-demo__navtitle">Profile</div>
      <div className="bugdex-demo__profile" ref={profileRef}>
        <div className="bugdex-demo__profile-avatar">
          <img
            src={PROFILE_AVATAR}
            alt=""
            aria-hidden="true"
            className="bugdex-demo__profile-avatar-img"
          />
        </div>
        <div className="bugdex-demo__profile-handle">@joshgreen</div>
        <div className="bugdex-demo__profile-since">Collecting since June 2026</div>

        <div className="bugdex-demo__level-card">
          <div className="bugdex-demo__level-head">
            <span className="bugdex-demo__level-label">LEVEL 5 · POLLINATOR</span>
            <span className="bugdex-demo__level-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#58c224" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="9" r="5.5" />
                <path d="M9.5 13.5 8 21l4-2.5 4 2.5-1.5-7.5" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <div className="bugdex-demo__level-pts">
            {pts.toLocaleString()}
            <span>pts</span>
          </div>
          <div className="bugdex-demo__level-bar">
            <div className="bugdex-demo__level-fill" style={{ width: `${fill}%` }} />
          </div>
          <div className="bugdex-demo__level-next">{pts >= 1380 ? '20' : Math.max(20, 1400 - pts)} pts to Swarm Leader</div>
          <div className="bugdex-demo__point-chips">
            {POINT_CHIPS.map((chip, i) => (
              <div key={chip.label} className={`bugdex-demo__point-chip ${i < chipsIn ? 'is-in' : ''}`}>
                <strong>{chip.pts}</strong>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bugdex-demo__ov-title">Overview</div>
        <div className="bugdex-demo__ov-grid">
          {OVERVIEW.map((cell) => (
            <div key={cell.label} className="bugdex-demo__ov-cell">
              {cell.icon}
              <div>
                <div className="bugdex-demo__ov-num">{cell.num}</div>
                <div className="bugdex-demo__ov-label">{cell.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bugdex-demo__ov-title">Collection</div>
        <div className="bugdex-demo__profile-cards">
          {PROFILE_CARDS.map((card) => (
            <div key={card.num} className="bugdex-demo__coll-cell">
              <div className="bugdex-demo__coll-art">{card.art}</div>
              <div className="bugdex-demo__coll-cell-num">
                {card.num}
                <RarityGem rarity={card.rarity} size={6} />
              </div>
              <div className="bugdex-demo__coll-cell-name">
                {card.name} <span>HP {card.hp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BugDexPhone>
  );
}

import React from 'react';
import './BugDexDemoShared.css';
import ladybirdImg from './bugdex-art/ladybird.png';
import stagBeetleImg from './bugdex-art/stag-beetle.png';
import blueBeetleImg from './bugdex-art/blue-beetle.png';
import yellowBeetleImg from './bugdex-art/yellow-beetle.png';

/* ── Watercolour bug artwork ────────────────────────────── */

const BugPhoto = ({ src, size }) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
  />
);

export const LadybirdArt = ({ size = 64 }) => <BugPhoto src={ladybirdImg} size={size} />;
export const StagBeetleArt = ({ size = 64 }) => <BugPhoto src={stagBeetleImg} size={size} />;
export const BlueBeetleArt = ({ size = 64 }) => <BugPhoto src={blueBeetleImg} size={size} />;
export const YellowBeetleArt = ({ size = 64 }) => <BugPhoto src={yellowBeetleImg} size={size} />;

/* ── Type icons ─────────────────────────────────────────── */

export const TypeIcon = ({ type, size = 12 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  };
  switch (type) {
    case 'fire':
      return (
        <svg {...common}>
          <path
            d="M12 2.5c1.2 3.4-2.4 5-2.4 8 0 1.6 1 2.7 2.4 2.7s2.4-1.1 2.4-2.7c1.7 1.5 3.1 3.3 3.1 5.6 0 3.3-2.4 5.4-5.5 5.4s-5.5-2.1-5.5-5.4c0-4.6 4.3-6.9 5.5-13.6z"
            fill="#ee6d2d"
          />
        </svg>
      );
    case 'bug':
      return (
        <svg {...common}>
          <circle cx="12" cy="14" r="7" fill="#67c23a" />
          <path d="M6.5 9.5a6 6 0 0 1 11 0z" fill="#67c23a" />
          <line x1="12" y1="8" x2="12" y2="21" stroke="#fff" strokeWidth="1.4" />
          <circle cx="9" cy="13" r="1.1" fill="#fff" />
          <circle cx="15" cy="13" r="1.1" fill="#fff" />
          <circle cx="9.5" cy="17" r="1.1" fill="#fff" />
          <circle cx="14.5" cy="17" r="1.1" fill="#fff" />
          <path d="M8 6 6 3.5M16 6l2-2.5" stroke="#67c23a" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'grass':
      return (
        <svg {...common}>
          <path
            d="M19.5 4.5c.5 7.5-3.5 13.5-11 13.5C6.5 11 11 5.5 19.5 4.5z"
            fill="none"
            stroke="#4faf52"
            strokeWidth="1.8"
          />
          <path d="M8.5 18c3-5 7-8.5 9.5-10" stroke="#4faf52" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'ground':
      return (
        <svg {...common}>
          <path
            d="M3.5 17.5 9 8.5l3.5 5.4 1.8-2.7 6.2 6.3z"
            fill="none"
            stroke="#c9982d"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'water':
      return (
        <svg {...common}>
          <path
            d="M12 3.5c3.2 4.2 5.5 7.2 5.5 10.3a5.5 5.5 0 0 1-11 0c0-3.1 2.3-6.1 5.5-10.3z"
            fill="none"
            stroke="#4a9fe0"
            strokeWidth="1.8"
          />
        </svg>
      );
    case 'wind':
      return (
        <svg {...common}>
          <path
            d="M3.5 9h10a3 3 0 1 0-3-3.5M3.5 14h14a3 3 0 1 1-3 3.5"
            stroke="#7c92e8"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" stroke="#d9a824" strokeWidth="1.8" />
          <g stroke="#d9a824" strokeWidth="1.6" strokeLinecap="round">
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
          </g>
        </svg>
      );
    case 'electric':
      return (
        <svg {...common}>
          <path
            d="M13 2.5 5.5 13.5H11L9.5 21.5 17.5 10H12z"
            fill="none"
            stroke="#c9c9c9"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="3" transform="rotate(45 12 12)" stroke="#c9c9c9" strokeWidth="1.6" />
        </svg>
      );
  }
};

/* ── Rarity gem ─────────────────────────────────────────── */

export const RarityGem = ({ rarity, size = 9 }) => {
  if (rarity === 'ultra') {
    return (
      <svg width={size + 3} height={size + 3} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2.5 14 9l6.5 2-6.5 2.5L12 21l-2-7.5L3.5 11 10 9z" fill="#c26be0" />
      </svg>
    );
  }
  if (rarity === 'uncommon') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5.5" y="5.5" width="13" height="13" rx="2" transform="rotate(45 12 12)" fill="#2f7df6" />
      </svg>
    );
  }
  return <span className="bugdex-demo__gem-common" style={{ width: size, height: size }} />;
};

/* ── Bug artwork (flat, top-down illustration style) ────── */

export const LadybugGlyph = ({ size = 46, color = '#58c224' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M30 30a25 22 0 0 1 40 0z" fill={color} />
    <ellipse cx="50" cy="60" rx="26" ry="24" fill={color} />
    <path d="M50 36v48" stroke="#fff" strokeWidth="4" />
    <g stroke={color} strokeWidth="4" strokeLinecap="round">
      <path d="M38 22l-6-8M62 22l6-8" />
      <path d="M25 46 12 40M25 62H10M28 74 16 84" />
      <path d="M75 46l13-6M75 62h15M72 74l12 10" />
    </g>
    <g fill="#fff">
      <circle cx="41" cy="52" r="3.6" />
      <circle cx="59" cy="52" r="3.6" />
      <circle cx="38" cy="66" r="3.6" />
      <circle cx="62" cy="66" r="3.6" />
      <circle cx="50" cy="74" r="0" />
    </g>
  </svg>
);

export const SparkleIcon = ({ size = 10, color = '#c26be0' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2 14 9.5 21.5 12 14 14.5 12 22 10 14.5 2.5 12 10 9.5z" fill={color} />
  </svg>
);

/* ── Phone chrome ───────────────────────────────────────── */

export const StatusBar = ({ light = false }) => (
  <div className={`bugdex-demo__status ${light ? 'is-light' : ''}`}>
    <span className="bugdex-demo__status-time">9:41</span>
    <span className="bugdex-demo__status-icons">
      <svg width="10" height="8" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
        <path d="M8 9.5a2 2 0 0 1 2 2L8 12l-2-.5a2 2 0 0 1 2-2zM4.5 7.5a5 5 0 0 1 7 0l-1.4 1.4a3 3 0 0 0-4.2 0zM1.5 4.5a9.5 9.5 0 0 1 13 0l-1.4 1.4a7.5 7.5 0 0 0-10.2 0z" />
      </svg>
      <svg width="15" height="8" viewBox="0 0 25 12" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" opacity="0.5" />
        <rect x="2" y="2" width="15" height="8" rx="1.6" fill="currentColor" />
        <path d="M22.5 4v4a2.2 2.2 0 0 0 0-4z" fill="currentColor" opacity="0.5" />
      </svg>
    </span>
  </div>
);

const TAB_ICONS = {
  home: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 10.5 12 3l8.5 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
    </svg>
  ),
  collection: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="2" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="2" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="2" />
    </svg>
  ),
  scan: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M3.5 8V5.5a2 2 0 0 1 2-2H8M16 3.5h2.5a2 2 0 0 1 2 2V8M20.5 16v2.5a2 2 0 0 1-2 2H16M8 20.5H5.5a2 2 0 0 1-2-2V16" />
      <rect x="8" y="9" width="8" height="6.5" rx="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12.2" r="1.6" fill="#fff" stroke="none" />
    </svg>
  ),
  leaders: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 3h12v2h3v3a5 5 0 0 1-4.6 5A6 6 0 0 1 13 16v2h3.5v3h-9v-3H11v-2a6 6 0 0 1-3.4-3A5 5 0 0 1 3 8V5h3zM3 8h3V5H4.8L3 5z" />
    </svg>
  ),
  profile: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8" r="4.2" />
      <path d="M4 20.5a8 8 0 0 1 16 0z" />
    </svg>
  ),
};

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'collection', label: 'Collection' },
  { id: 'scan', label: 'Scan' },
  { id: 'leaders', label: 'Leaders' },
  { id: 'profile', label: 'Profile' },
];

export const TabBar = ({ active }) => (
  <div className="bugdex-demo__tabbar">
    {TABS.map((tab) => (
      <div key={tab.id} className={`bugdex-demo__tab ${active === tab.id ? 'is-active' : ''}`}>
        {TAB_ICONS[tab.id]}
        <span>{tab.label}</span>
      </div>
    ))}
  </div>
);

export const BugDexPhone = ({ children, tab, light = false, className = '' }) => (
  <div className={`bugdex-demo ${className}`} aria-hidden="true">
    <div className={`bugdex-demo__phone${tab ? ` bugdex-demo__phone--${tab}` : ''}`}>
      <StatusBar light={light} />
      {children}
      {tab && <TabBar active={tab} />}
    </div>
  </div>
);

export default BugDexPhone;

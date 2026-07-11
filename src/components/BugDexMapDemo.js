import React, { useEffect, useState } from 'react';
import { BugDexPhone, TypeIcon } from './BugDexDemoShared';
import './BugDexDemoShared.css';

const SOUTH_DOWNS_MAP = '/images/bug-club/south-downs-map.png';

const PINS = [
  { x: '26%', y: '38%', type: 'fire', color: '#ee6d2d', label: 'Ditchling Beacon' },
  { x: '50%', y: '28%', type: 'grass', color: '#4faf52', label: 'Westmeston' },
  { x: '54%', y: '56%', type: 'ground', color: '#c9982d', label: 'Bow Hill' },
];

const LOOP_MS = 7200;

export default function BugDexMapDemo({ className = '' }) {
  const [cycle, setCycle] = useState(0);
  const [visiblePins, setVisiblePins] = useState([]);

  useEffect(() => {
    setVisiblePins([]);
    const pinTimers = PINS.map((_, i) =>
      setTimeout(() => setVisiblePins((v) => [...v, i]), 700 + i * 1300)
    );
    const loopTimer = setTimeout(() => setCycle((c) => c + 1), LOOP_MS);
    return () => {
      pinTimers.forEach(clearTimeout);
      clearTimeout(loopTimer);
    };
  }, [cycle]);

  return (
    <BugDexPhone className={className} tab="collection">
      <div className="bugdex-demo__map">
        <div className="bugdex-demo__coll-top">
          <div className="bugdex-demo__coll-star">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </div>
          <div className="bugdex-demo__coll-caught">11 caught</div>
        </div>
        <div className="bugdex-demo__coll-title">Field Map</div>

        <div className="bugdex-demo__map-canvas">
        <img
          className="bugdex-demo__map-image"
          src={SOUTH_DOWNS_MAP}
          alt=""
          aria-hidden="true"
          draggable="false"
        />
        <div className="bugdex-demo__map-legal" aria-hidden="true">Maps Legal</div>
        {PINS.map((pin, i) => {
          const isVisible = visiblePins.includes(i);
          return (
            <React.Fragment key={`${cycle}-${i}`}>
              {isVisible && (
                <span
                  className="bugdex-demo__map-ripple"
                  style={{ left: pin.x, top: pin.y, borderColor: pin.color }}
                />
              )}
              <div
                className={`bugdex-demo__map-pin ${isVisible ? 'is-visible' : ''}`}
                style={{ left: pin.x, top: pin.y }}
              >
                <div className="bugdex-demo__map-pin-bubble" style={{ borderColor: pin.color }}>
                  <TypeIcon type={pin.type} size={13} />
                </div>
                <div className="bugdex-demo__map-pin-stem" style={{ background: pin.color }} />
                <div className="bugdex-demo__map-pin-label">{pin.label}</div>
              </div>
            </React.Fragment>
          );
        })}
        </div>
      </div>
    </BugDexPhone>
  );
}

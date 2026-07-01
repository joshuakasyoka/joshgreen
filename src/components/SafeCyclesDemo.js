import React, { useEffect, useState } from 'react';
import './SafeCyclesDemo.css';

// Screens: 0 = planner, 1 = route found, 2 = navigation
const SCREEN_DURATIONS = [2800, 3200, 3800];

const MapDots = () => (
  <svg className="safe-cycles-demo__map-bg" viewBox="0 0 280 320" fill="none" aria-hidden="true">
    {/* Simplified street lines */}
    <line x1="0" y1="80" x2="280" y2="80" stroke="#d8d8d8" strokeWidth="1.5"/>
    <line x1="0" y1="160" x2="280" y2="160" stroke="#d8d8d8" strokeWidth="1.5"/>
    <line x1="0" y1="240" x2="280" y2="240" stroke="#d8d8d8" strokeWidth="1.5"/>
    <line x1="70" y1="0" x2="70" y2="320" stroke="#d8d8d8" strokeWidth="1.5"/>
    <line x1="140" y1="0" x2="140" y2="320" stroke="#d8d8d8" strokeWidth="1.5"/>
    <line x1="210" y1="0" x2="210" y2="320" stroke="#d8d8d8" strokeWidth="1.5"/>
    {/* Diagonal / diagonal streets */}
    <line x1="0" y1="0" x2="280" y2="160" stroke="#e2e2e2" strokeWidth="1"/>
    <line x1="40" y1="320" x2="240" y2="0" stroke="#e2e2e2" strokeWidth="1"/>
    {/* Route line */}
    <polyline points="60,240 60,160 140,160 140,80 200,80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3"/>
    {/* Start pin */}
    <circle cx="60" cy="240" r="5" fill="#1a1a1a"/>
    {/* End pin */}
    <circle cx="200" cy="80" r="5" fill="#1a1a1a"/>
  </svg>
);

const NavMapDots = ({ progress }) => {
  const totalLength = 260; // approximate polyline length
  const done = totalLength * Math.min(1, progress);
  return (
    <svg className="safe-cycles-demo__map-bg" viewBox="0 0 280 320" fill="none" aria-hidden="true">
      <line x1="0" y1="80" x2="280" y2="80" stroke="#d8d8d8" strokeWidth="1.5"/>
      <line x1="0" y1="160" x2="280" y2="160" stroke="#d8d8d8" strokeWidth="1.5"/>
      <line x1="0" y1="240" x2="280" y2="240" stroke="#d8d8d8" strokeWidth="1.5"/>
      <line x1="70" y1="0" x2="70" y2="320" stroke="#d8d8d8" strokeWidth="1.5"/>
      <line x1="140" y1="0" x2="140" y2="320" stroke="#d8d8d8" strokeWidth="1.5"/>
      <line x1="210" y1="0" x2="210" y2="320" stroke="#d8d8d8" strokeWidth="1.5"/>
      <line x1="0" y1="0" x2="280" y2="160" stroke="#e2e2e2" strokeWidth="1"/>
      <line x1="40" y1="320" x2="240" y2="0" stroke="#e2e2e2" strokeWidth="1"/>
      {/* Remaining route */}
      <polyline points="60,240 60,160 140,160 140,80 200,80" stroke="#d0d0d0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Completed route */}
      <polyline points="60,240 60,160 140,160 140,80 200,80" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={`${done} 9999`}/>
      {/* Cyclist position — moves along route */}
      <circle cx={60} cy={Math.max(240 - progress * 220, 80)} r="6" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx={60} cy={Math.max(240 - progress * 220, 80)} r="3" fill="#1a1a1a"/>
    </svg>
  );
};

export default function SafeCyclesDemo({ className = '' }) {
  const [screen, setScreen] = useState(0);
  const [navProgress, setNavProgress] = useState(0);
  const [inputFocus, setInputFocus] = useState(0); // 0=start,1=end,2=none

  // Cycle screens
  useEffect(() => {
    const dur = SCREEN_DURATIONS[screen];
    const t = setTimeout(() => setScreen(s => (s + 1) % 3), dur);
    return () => clearTimeout(t);
  }, [screen]);

  // Reset focus on screen change
  useEffect(() => {
    if (screen === 0) {
      setInputFocus(0);
      const t1 = setTimeout(() => setInputFocus(1), 900);
      const t2 = setTimeout(() => setInputFocus(2), 1800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    if (screen === 2) {
      setNavProgress(0);
      let start = null;
      let raf;
      const dur = SCREEN_DURATIONS[2];
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        setNavProgress(p);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }
  }, [screen]);

  const remainingMin = Math.round(18 * (1 - navProgress));

  return (
    <div className={`safe-cycles-demo ${className}`} aria-hidden="true">
      {/* Phone frame */}
      <div className="safe-cycles-demo__phone">
        {/* Notch */}
        <div className="safe-cycles-demo__notch" />

        {/* Screen 0: Planner */}
        <div className={`safe-cycles-demo__screen ${screen === 0 ? 'is-visible' : ''}`}>
          <MapDots />
          <div className="safe-cycles-demo__sheet">
            <div className="safe-cycles-demo__handle" />
            <div className="safe-cycles-demo__brand">SAFE CYCLES</div>
            <div className="safe-cycles-demo__brand-sub">Open map routing · London</div>
            <div className="safe-cycles-demo__inputs">
              <div className={`safe-cycles-demo__input ${inputFocus === 0 ? 'is-focused' : ''}`}>
                <span className="safe-cycles-demo__pin">●</span>
                <span className={`safe-cycles-demo__input-text ${inputFocus === 0 ? 'is-active' : ''}`}>
                  {inputFocus === 0 ? <span className="safe-cycles-demo__typing">King's Cross</span> : "King's Cross"}
                </span>
              </div>
              <div className={`safe-cycles-demo__input ${inputFocus === 1 ? 'is-focused' : ''}`}>
                <span className="safe-cycles-demo__pin">●</span>
                <span className={`safe-cycles-demo__input-text ${inputFocus === 1 ? 'is-active' : ''}`}>
                  {inputFocus === 1 ? <span className="safe-cycles-demo__typing">London Bridge</span> : inputFocus === 2 ? 'London Bridge' : <span className="safe-cycles-demo__placeholder">Destination</span>}
                </span>
              </div>
            </div>
            <div className={`safe-cycles-demo__cta ${inputFocus === 2 ? 'is-ready' : ''}`}>
              FIND BIKE ROUTE
            </div>
          </div>
        </div>

        {/* Screen 1: Route found */}
        <div className={`safe-cycles-demo__screen ${screen === 1 ? 'is-visible' : ''}`}>
          <MapDots />
          <div className="safe-cycles-demo__sheet safe-cycles-demo__sheet--peek">
            <div className="safe-cycles-demo__handle" />
            <div className="safe-cycles-demo__peek-row">
              <div className="safe-cycles-demo__peek-stats">
                <span className="safe-cycles-demo__big-num">7.2</span>
                <span className="safe-cycles-demo__unit"> km</span>
                <span className="safe-cycles-demo__sep">·</span>
                <span className="safe-cycles-demo__big-num">28</span>
                <span className="safe-cycles-demo__unit"> min</span>
              </div>
              <button className="safe-cycles-demo__start-btn">▶ Start</button>
            </div>
          </div>
          <div className="safe-cycles-demo__stats-card">
            <div className="safe-cycles-demo__stat">
              <span className="safe-cycles-demo__stat-label">DISTANCE</span>
              <span className="safe-cycles-demo__stat-val">7.2 km</span>
            </div>
            <div className="safe-cycles-demo__stat">
              <span className="safe-cycles-demo__stat-label">RIDE TIME</span>
              <span className="safe-cycles-demo__stat-val">28 min</span>
            </div>
            <div className="safe-cycles-demo__stat">
              <span className="safe-cycles-demo__stat-label">LOW TRAFFIC</span>
              <span className="safe-cycles-demo__stat-val">74%</span>
            </div>
            <div className="safe-cycles-demo__stat">
              <span className="safe-cycles-demo__stat-label">CLIMB</span>
              <span className="safe-cycles-demo__stat-val">42 m</span>
            </div>
          </div>
        </div>

        {/* Screen 2: Navigation */}
        <div className={`safe-cycles-demo__screen ${screen === 2 ? 'is-visible' : ''}`}>
          <NavMapDots progress={navProgress} />
          {/* Top nav banner */}
          <div className="safe-cycles-demo__nav-banner">
            <div className="safe-cycles-demo__nav-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
            </div>
            <div className="safe-cycles-demo__nav-text">
              <span className="safe-cycles-demo__nav-dist">{Math.round(350 - navProgress * 300)}m</span>
              <span className="safe-cycles-demo__nav-inst">Continue on Farringdon Rd</span>
              <span className="safe-cycles-demo__nav-then">then → Turn right</span>
            </div>
            <div className="safe-cycles-demo__nav-gps">
              <span className="safe-cycles-demo__gps-dot" />
              <span className="safe-cycles-demo__gps-label">LIVE GPS</span>
            </div>
          </div>
          {/* Bottom status */}
          <div className="safe-cycles-demo__nav-sheet">
            <div className="safe-cycles-demo__handle" />
            <div className="safe-cycles-demo__nav-status">
              <div className="safe-cycles-demo__nav-stats">
                <strong>{remainingMin < 1 ? '<1' : remainingMin}</strong>
                <span>min · {(7.2 * (1 - navProgress)).toFixed(1)} km remaining</span>
              </div>
              <button className="safe-cycles-demo__end-btn">End</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

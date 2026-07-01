import React, { useEffect, useState } from 'react';
import './SafeCyclesDemo.css';

// London street map SVG background - faithful to the actual app aesthetic
const LondonMap = ({ children }) => (
  <svg className="safe-cycles-demo__map" viewBox="0 0 280 380" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base */}
    <rect width="280" height="380" fill="#f0efeb"/>
    {/* Parks */}
    <rect x="28" y="90" width="38" height="52" rx="3" fill="#d8e8c8" opacity="0.8"/>
    <rect x="100" y="10" width="30" height="22" rx="2" fill="#d8e8c8" opacity="0.7"/>
    {/* Major roads - thick */}
    <path d="M0,130 Q60,120 140,135 Q200,145 280,138" stroke="#ffffff" strokeWidth="5"/>
    <path d="M0,195 Q80,190 140,200 Q210,208 280,200" stroke="#ffffff" strokeWidth="5"/>
    <path d="M0,270 Q70,265 140,272 Q210,278 280,270" stroke="#ffffff" strokeWidth="5"/>
    <path d="M65,0 Q62,80 68,195 Q70,270 66,380" stroke="#ffffff" strokeWidth="5"/>
    <path d="M140,0 Q138,80 142,200 Q143,270 140,380" stroke="#ffffff" strokeWidth="5"/>
    <path d="M210,0 Q208,80 212,200 Q213,270 210,380" stroke="#ffffff" strokeWidth="5"/>
    {/* Diagonal roads */}
    <path d="M0,50 Q70,90 110,130 Q160,175 180,220 Q210,270 240,380" stroke="#ffffff" strokeWidth="3.5"/>
    <path d="M100,0 Q130,40 155,90 Q175,135 200,195 Q225,250 250,380" stroke="#ffffff" strokeWidth="3"/>
    <path d="M280,80 Q220,120 180,170 Q140,210 100,280 Q60,330 40,380" stroke="#ffffff" strokeWidth="3.5"/>
    {/* Minor roads */}
    <path d="M0,80 Q50,75 100,82 Q160,88 280,78" stroke="#e8e7e2" strokeWidth="2"/>
    <path d="M0,160 Q60,155 140,162 Q200,168 280,158" stroke="#e8e7e2" strokeWidth="2"/>
    <path d="M0,235 Q70,230 140,237 Q210,243 280,235" stroke="#e8e7e2" strokeWidth="2"/>
    <path d="M0,310 Q80,306 140,313 Q200,318 280,308" stroke="#e8e7e2" strokeWidth="2"/>
    <path d="M30,0 Q28,80 32,195 Q33,270 30,380" stroke="#e8e7e2" strokeWidth="2"/>
    <path d="M100,0 Q98,80 102,195 Q103,270 100,380" stroke="#e8e7e2" strokeWidth="2"/>
    <path d="M175,0 Q173,80 177,195 Q178,270 175,380" stroke="#e8e7e2" strokeWidth="2"/>
    <path d="M245,0 Q243,80 247,195 Q248,270 245,380" stroke="#e8e7e2" strokeWidth="2"/>
    {/* Thames */}
    <path d="M0,310 Q50,305 100,315 Q150,325 200,320 Q240,316 280,322" stroke="#c5d8e8" strokeWidth="12" opacity="0.6"/>
    <path d="M0,310 Q50,305 100,315 Q150,325 200,320 Q240,316 280,322" stroke="#d0e4f0" strokeWidth="8" opacity="0.5"/>
    {/* Map labels */}
    <text x="38" y="172" fontSize="6" fill="#aaa" fontFamily="sans-serif" letterSpacing="0.5">CAMDEN</text>
    <text x="150" y="230" fontSize="7" fill="#999" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">LONDON</text>
    <text x="90" y="290" fontSize="5.5" fill="#aaa" fontFamily="sans-serif" letterSpacing="0.3">CITY OF WESTMINSTER</text>
    {children}
  </svg>
);

// Hazard dots scattered around London map
const HAZARDS = [
  { cx: 88, cy: 48,  r: 8 },
  { cx: 195, cy: 55, r: 8 },
  { cx: 42,  cy: 115, r: 9 },
  { cx: 130, cy: 148, r: 8 },
  { cx: 200, cy: 172, r: 8 },
  { cx: 78,  cy: 228, r: 9 },
  { cx: 165, cy: 245, r: 8 },
  { cx: 230, cy: 210, r: 8 },
  // Along Thames
  { cx: 118, cy: 312, r: 8 },
  { cx: 138, cy: 318, r: 7 },
  { cx: 160, cy: 316, r: 7 },
  { cx: 210, cy: 308, r: 8 },
  { cx: 230, cy: 315, r: 7 },
  { cx: 248, cy: 310, r: 8 },
];

const HazardDot = ({ cx, cy, r }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 5} fill="rgba(255,27,27,0.12)"/>
    <circle cx={cx} cy={cy} r={r} fill="rgba(255,27,27,0.18)" stroke="rgba(255,27,27,0.5)" strokeWidth="1.5"/>
    <circle cx={cx} cy={cy} r={r - 3} fill="rgba(255,27,27,0.7)"/>
  </g>
);

// Route line for navigation screen
const RouteLine = ({ progress }) => {
  const total = 220;
  const done = total * Math.min(1, progress);
  return (
    <g>
      {/* Remaining */}
      <polyline points="68,340 68,260 68,195 100,160 140,135 175,115 210,90" stroke="#cccccc" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Completed */}
      <polyline points="68,340 68,260 68,195 100,160 140,135 175,115 210,90" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={`${done} 9999`}/>
      {/* Cyclist */}
      <circle cx={68 + Math.min(done * 0.6, 50)} cy={Math.max(340 - done * 1.1, 90)} r="6" fill="#fff" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx={68 + Math.min(done * 0.6, 50)} cy={Math.max(340 - done * 1.1, 90)} r="3" fill="#1a1a1a"/>
    </g>
  );
};

// Amenity markers for route screen
const AMENITIES = [
  { x: 110, y: 158, type: 'pump',    label: '⛽', delay: 0 },
  { x: 168, y: 112, type: 'parking', label: 'P',  delay: 300 },
  { x: 145, y: 133, type: 'cafe',    label: '☕', delay: 600 },
  { x: 78,  y: 190, type: 'pump',    label: '⛽', delay: 900 },
];

// Screens: 0=planner, 1=hazard-reporting, 2=route+amenities, 3=navigation
const SCREEN_DURATIONS = [3000, 4000, 3500, 4000];

export default function SafeCyclesDemo({ className = '' }) {
  const [screen, setScreen] = useState(0);
  const [inputPhase, setInputPhase] = useState(0); // 0=empty,1=start typed,2=end typed,3=ready
  const [reportPhase, setReportPhase] = useState(0); // 0=nothing, 1=tap1, 2=tap2, 3=card
  const [amenitiesVisible, setAmenitiesVisible] = useState([]);
  const [navProgress, setNavProgress] = useState(0);

  // Cycle screens
  useEffect(() => {
    const dur = SCREEN_DURATIONS[screen];
    const t = setTimeout(() => {
      setScreen(s => (s + 1) % 4);
    }, dur);
    return () => clearTimeout(t);
  }, [screen]);

  // Screen 0: planner typing animation
  useEffect(() => {
    if (screen !== 0) return;
    setInputPhase(0);
    const t1 = setTimeout(() => setInputPhase(1), 600);
    const t2 = setTimeout(() => setInputPhase(2), 1400);
    const t3 = setTimeout(() => setInputPhase(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [screen]);

  // Screen 1: hazard reporting animation
  useEffect(() => {
    if (screen !== 1) return;
    setReportPhase(0);
    const t1 = setTimeout(() => setReportPhase(1), 700);
    const t2 = setTimeout(() => setReportPhase(2), 1600);
    const t3 = setTimeout(() => setReportPhase(3), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [screen]);

  // Screen 2: amenities popping in
  useEffect(() => {
    if (screen !== 2) return;
    setAmenitiesVisible([]);
    const timers = AMENITIES.map((a, i) =>
      setTimeout(() => setAmenitiesVisible(v => [...v, i]), 600 + a.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [screen]);

  // Screen 3: navigation progress
  useEffect(() => {
    if (screen !== 3) return;
    setNavProgress(0);
    let start = null;
    let raf;
    const dur = SCREEN_DURATIONS[3];
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setNavProgress(p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [screen]);

  const remainingMin = Math.max(1, Math.round(18 * (1 - navProgress)));

  return (
    <div className={`safe-cycles-demo ${className}`} aria-hidden="true">
      <div className="safe-cycles-demo__phone">
        <div className="safe-cycles-demo__notch" />

        {/* ── Screen 0: Route Planner ── */}
        <div className={`safe-cycles-demo__screen ${screen === 0 ? 'is-visible' : ''}`}>
          <LondonMap>
            {HAZARDS.map((h, i) => <HazardDot key={i} {...h} />)}
          </LondonMap>
          {/* Report button */}
          <div className="safe-cycles-demo__report-btn">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Report unsafe road
          </div>
          {/* Layers button */}
          <div className="safe-cycles-demo__layers-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          {/* Bottom sheet */}
          <div className="safe-cycles-demo__sheet">
            <div className="safe-cycles-demo__handle" />
            <div className="safe-cycles-demo__brand">SAFE CYCLES</div>
            <div className="safe-cycles-demo__brand-sub">Open map routing · London</div>
            <div className="safe-cycles-demo__inputs">
              <div className={`safe-cycles-demo__input ${inputPhase >= 1 ? 'is-focused' : ''}`}>
                <span className="safe-cycles-demo__pin-icon">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span className="safe-cycles-demo__input-text">
                  {inputPhase === 0
                    ? <span className="safe-cycles-demo__placeholder">Start — e.g. King's Cross</span>
                    : inputPhase === 1
                      ? <span className="safe-cycles-demo__typing">King's Cross</span>
                      : "King's Cross"
                  }
                </span>
                {inputPhase === 0 && (
                  <span className="safe-cycles-demo__input-action">⊕</span>
                )}
              </div>
              <div className={`safe-cycles-demo__input ${inputPhase === 2 ? 'is-focused' : ''}`}>
                <span className="safe-cycles-demo__pin-icon">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span className="safe-cycles-demo__input-text">
                  {inputPhase < 2
                    ? <span className="safe-cycles-demo__placeholder">Destination — e.g. London Bridge</span>
                    : inputPhase === 2
                      ? <span className="safe-cycles-demo__typing">London Bridge</span>
                      : "London Bridge"
                  }
                </span>
                {inputPhase >= 2 && (
                  <span className="safe-cycles-demo__input-action">⇅</span>
                )}
              </div>
            </div>
            <div className={`safe-cycles-demo__cta ${inputPhase === 3 ? 'is-ready' : ''}`}>
              Find bike route
            </div>
          </div>
        </div>

        {/* ── Screen 1: Hazard Reporting ── */}
        <div className={`safe-cycles-demo__screen ${screen === 1 ? 'is-visible' : ''}`}>
          <LondonMap>
            {HAZARDS.map((h, i) => <HazardDot key={i} {...h} />)}
            {/* New hazard stretch being marked */}
            {reportPhase >= 2 && (
              <line x1="110" y1="190" x2="155" y2="230" stroke="rgba(255,27,27,0.6)" strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round"/>
            )}
          </LondonMap>
          <div className={`safe-cycles-demo__report-btn safe-cycles-demo__report-btn--active`}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Cancel reporting
          </div>
          {/* Tap point 1 */}
          <div
            className={`safe-cycles-demo__tap ${reportPhase >= 1 ? 'is-visible' : ''}`}
            style={{ left: '110px', top: '190px' }}
          />
          {/* Tap point 2 */}
          <div
            className={`safe-cycles-demo__tap ${reportPhase >= 2 ? 'is-visible' : ''}`}
            style={{ left: '155px', top: '230px' }}
          />
          {/* Report card */}
          {reportPhase >= 3 && (
            <div className="safe-cycles-demo__report-card">
              <p>Add a note (optional) and save this report.</p>
              <div className="safe-cycles-demo__report-actions">
                <div className="safe-cycles-demo__save-btn">Save report</div>
                <div className="safe-cycles-demo__discard-btn">Discard</div>
              </div>
            </div>
          )}
          {/* Instruction text */}
          {reportPhase < 3 && (
            <div style={{
              position: 'absolute', bottom: '200px', left: '12px', right: '12px',
              background: 'rgba(255,255,255,0.92)', borderRadius: '10px',
              padding: '10px 12px', fontFamily: 'monospace', fontSize: '9px',
              fontWeight: 600, color: '#1a1a1a', lineHeight: 1.5,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              {reportPhase < 1
                ? 'Tap 2 points on the map to mark the unsafe stretch.'
                : reportPhase === 1
                  ? 'Tap 1 more point on the map to mark the unsafe stretch.'
                  : 'Snapping to the road…'
              }
            </div>
          )}
        </div>

        {/* ── Screen 2: Route + Amenities ── */}
        <div className={`safe-cycles-demo__screen ${screen === 2 ? 'is-visible' : ''}`}>
          <LondonMap>
            {HAZARDS.map((h, i) => <HazardDot key={i} {...h} />)}
            {/* Route line */}
            <polyline points="68,340 68,260 68,195 100,160 140,135 175,115 210,90"
              stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="7 4"/>
            <circle cx="68" cy="340" r="5" fill="#1a1a1a"/>
            <circle cx="210" cy="90" r="5" fill="#1a1a1a"/>
          </LondonMap>
          {/* Amenity markers */}
          {AMENITIES.map((a, i) => (
            <div
              key={i}
              className={`safe-cycles-demo__amenity-marker safe-cycles-demo__amenity-marker--${a.type} ${amenitiesVisible.includes(i) ? 'is-visible' : ''}`}
              style={{ left: `${a.x}px`, top: `${a.y}px` }}
            >
              {a.label}
            </div>
          ))}
          {/* Stats overlay */}
          <div className="safe-cycles-demo__stats-overlay">
            <div className="safe-cycles-demo__stat">
              <span className="safe-cycles-demo__stat-label">Distance</span>
              <span className="safe-cycles-demo__stat-val">7.2 km</span>
            </div>
            <div className="safe-cycles-demo__stat">
              <span className="safe-cycles-demo__stat-label">Ride Time</span>
              <span className="safe-cycles-demo__stat-val">28 min</span>
            </div>
            <div className="safe-cycles-demo__stat">
              <span className="safe-cycles-demo__stat-label">Low Traffic</span>
              <span className="safe-cycles-demo__stat-val">74%</span>
            </div>
            <div className="safe-cycles-demo__stat">
              <span className="safe-cycles-demo__stat-label">Climb</span>
              <span className="safe-cycles-demo__stat-val">42 m</span>
            </div>
          </div>
          {/* Peek bar */}
          <div className="safe-cycles-demo__sheet" style={{ padding: '8px 14px 14px' }}>
            <div className="safe-cycles-demo__handle" />
            <div className="safe-cycles-demo__peek-row">
              <div className="safe-cycles-demo__peek-stats">
                <span className="safe-cycles-demo__big-num">7.2</span>
                <span className="safe-cycles-demo__unit">km</span>
                <span className="safe-cycles-demo__sep">·</span>
                <span className="safe-cycles-demo__big-num">28</span>
                <span className="safe-cycles-demo__unit">min</span>
              </div>
              <div className="safe-cycles-demo__start-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Start
              </div>
            </div>
          </div>
        </div>

        {/* ── Screen 3: Navigation ── */}
        <div className={`safe-cycles-demo__screen ${screen === 3 ? 'is-visible' : ''}`}>
          <LondonMap>
            <RouteLine progress={navProgress} />
          </LondonMap>
          {/* Top nav banner */}
          <div className="safe-cycles-demo__nav-banner">
            <div className="safe-cycles-demo__nav-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
            </div>
            <div className="safe-cycles-demo__nav-text">
              <span className="safe-cycles-demo__nav-dist">{Math.max(20, Math.round(380 - navProgress * 350))}m</span>
              <span className="safe-cycles-demo__nav-inst">Continue on Farringdon Rd</span>
              <span className="safe-cycles-demo__nav-then">then → Turn right onto Holborn</span>
            </div>
            <div className="safe-cycles-demo__nav-side">
              <div className="safe-cycles-demo__mute-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              </div>
              <div className="safe-cycles-demo__gps-pill">
                <span className="safe-cycles-demo__gps-dot" />
                <span className="safe-cycles-demo__gps-label">Live GPS</span>
              </div>
            </div>
          </div>
          {/* Bottom sheet */}
          <div className="safe-cycles-demo__nav-sheet">
            <div className="safe-cycles-demo__handle" />
            <div className="safe-cycles-demo__nav-status">
              <div className="safe-cycles-demo__nav-stats">
                <strong>{remainingMin} min</strong>
                <span>{(7.2 * (1 - navProgress)).toFixed(1)} km · arrive {Math.floor(9 + navProgress) < 10 ? '09' : 9 + Math.floor(navProgress * 18)}:{String(Math.round(navProgress * 55)).padStart(2,'0')}</span>
              </div>
              <div className="safe-cycles-demo__end-btn">End</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

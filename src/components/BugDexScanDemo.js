import React, { useEffect, useRef, useState } from 'react';
import {
  BugDexPhone,
  TypeIcon,
  BUGDEX_TYPE_GREEN,
  RarityGem,
  SparkleIcon,
  WeevilArt,
} from './BugDexDemoShared';
import './BugDexDemoShared.css';

const BEETLE_SCAN_VIDEO = `${process.env.PUBLIC_URL}/images/bug-club/beetle-scan.mp4`;
const BEETLE_SCAN_POSTER = `${process.env.PUBLIC_URL}/images/bug-club/beetle-scan-poster.png`;

// Phases: 0=camera, 1=identifying, 2=card reveal
const PHASE_DURATIONS = [2400, 3000, 3400];

export default function BugDexScanDemo({ className = '' }) {
  const [phase, setPhase] = useState(0);
  const [named, setNamed] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = Boolean(entries[0]?.isIntersecting);
        setIsActive(visible);
        if (visible) {
          setPhase(0);
          setNamed(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return undefined;
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASE_DURATIONS.length), PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase, isActive]);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video || !isActive) return undefined;

    const syncPlayback = () => {
      if (phase === 0 || phase === 1) {
        if (phase === 0) video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    syncPlayback();

    return undefined;
  }, [phase, isActive]);

  // Phase 1: species name lands partway through identification
  useEffect(() => {
    if (phase !== 1) return undefined;
    setNamed(false);
    const t = setTimeout(() => setNamed(true), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div ref={rootRef}>
      <BugDexPhone className={className} tab="scan">
      {/* ── Phases 0–1: Camera + identifying ── */}
      <div className={`bugdex-demo__screen ${phase === 0 || phase === 1 ? 'is-visible' : ''}`}>
        <div className="bugdex-demo__camera">
          <video
            ref={videoRef}
            className="bugdex-demo__camera-video"
            src={BEETLE_SCAN_VIDEO}
            poster={BEETLE_SCAN_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={(e) => {
              if (isActive && (phase === 0 || phase === 1)) e.currentTarget.play().catch(() => {});
            }}
            aria-hidden="true"
          />
          {phase === 1 && (
            <>
              <div className="bugdex-demo__identify-dim" />
              <div className="bugdex-demo__scanline" />
              {!named ? (
                <div className="bugdex-demo__identify-pill" key="working">
                  <span className="bugdex-demo__identify-spark">
                    <SparkleIcon size={11} color="#48484a" />
                  </span>
                  <span className="bugdex-demo__identify-dots">Identifying with Opus</span>
                </div>
              ) : (
                <div className="bugdex-demo__identify-pill" key="named">
                  <TypeIcon type="ground" size={11} color={BUGDEX_TYPE_GREEN} />
                  Violet ground beetle <span className="is-species">Carabus violaceus</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Phase 2: Card sheet reveal ── */}
      <div className={`bugdex-demo__screen ${phase === 2 ? 'is-visible' : ''}`}>
        {phase === 2 && (
          <>
            <div className="bugdex-demo__sheet-bar">
              <span className="bugdex-demo__sheet-title">Irideon</span>
              <span className="bugdex-demo__sheet-done">Done</span>
            </div>
            <div className="bugdex-demo__card-stage bugdex-demo__card-stage--tabbed">
              <div className="bugdex-demo__card is-pop">
                <div className="bugdex-demo__holo" />
                <div className="bugdex-demo__card-head">
                  <span className="bugdex-demo__card-wild">WILD</span>
                  <span className="bugdex-demo__card-name">Irideon</span>
                  <span className="bugdex-demo__card-hp">
                    <span>HP</span>55
                  </span>
                  <TypeIcon type="ground" size={14} color={BUGDEX_TYPE_GREEN} />
                </div>
                <div className="bugdex-demo__card-rule" style={{ background: BUGDEX_TYPE_GREEN }} />
                <div className="bugdex-demo__card-art">
                  <WeevilArt size={104} />
                </div>
                <div className="bugdex-demo__card-info">N° 014 · Moss Walker · 28 mm · 1.2 g</div>
                <div className="bugdex-demo__attack is-hot">
                  <TypeIcon type="ground" size={10} color={BUGDEX_TYPE_GREEN} />
                  <div className="bugdex-demo__attack-body">
                    <div className="bugdex-demo__attack-name">Mandible Snap</div>
                    <div className="bugdex-demo__attack-desc">Clamps prey with powerful jaws and drags it under leaf litter.</div>
                  </div>
                  <div className="bugdex-demo__attack-dmg">30</div>
                </div>
                <div className="bugdex-demo__attack">
                  <TypeIcon type="ground" size={10} color={BUGDEX_TYPE_GREEN} />
                  <div className="bugdex-demo__attack-body">
                    <div className="bugdex-demo__attack-name">Leaf Scuttle</div>
                    <div className="bugdex-demo__attack-desc">Darts beneath moss at the first vibration of a footfall.</div>
                  </div>
                  <div className="bugdex-demo__attack-dmg">20</div>
                </div>
                <div className="bugdex-demo__card-flavour">
                  A metallic hunter that prowls moss and leaf litter at dusk. Its iridescent shell flashes violet when it turns in the sun.
                </div>
                <div className="bugdex-demo__card-meta">
                  <span>
                    Weakness <TypeIcon type="water" size={7} /> ×2
                  </span>
                  <span className="is-dim">Resistance —</span>
                  <span className="is-dim">Retreat ●</span>
                </div>
                <div className="bugdex-demo__card-foot">
                  <div className="bugdex-demo__card-species">
                    Violet ground beetle
                    <em>Carabus violaceus</em>
                  </div>
                  <div className="bugdex-demo__card-rarity">
                    <RarityGem rarity="common" size={7} />
                    Common
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      </BugDexPhone>
    </div>
  );
}

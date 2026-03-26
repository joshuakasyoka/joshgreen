import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MIN_DISTANCE_PX = 8;
const STROKE = '#81FF03';

export default function ClickTrail({ enabled = true }) {
  const [marks, setMarks] = useState([]);
  const isDownRef = useRef(false);
  const lastPosRef = useRef({ x: null, y: null });
  const idRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const onDown = () => {
      if (!enabled) return;
      isDownRef.current = true;
      lastPosRef.current = { x: null, y: null };
    };
    const onUp = () => {
      isDownRef.current = false;
      lastPosRef.current = { x: null, y: null };
    };

    const onMove = (e) => {
      if (!enabled) return;
      if (!isDownRef.current) return;
      const x = e.clientX;
      const y = e.clientY;

      const last = lastPosRef.current;
      if (last.x != null && last.y != null) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (Math.hypot(dx, dy) < MIN_DISTANCE_PX) return;
      }

      lastPosRef.current = { x, y };

      const id = idRef.current++;
      setMarks((prev) => [...prev, { id, x, y }]);
    };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('blur', onUp);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('blur', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  // Clear trail when navigating between pages
  useEffect(() => {
    setMarks([]);
  }, [location.pathname]);

  // If disabled, clear any existing marks
  useEffect(() => {
    if (!enabled) setMarks([]);
  }, [enabled]);

  // Clear trail when switching case studies
  useEffect(() => {
    const onClear = () => setMarks([]);
    window.addEventListener('case-study-change', onClear);
    return () => window.removeEventListener('case-study-change', onClear);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {marks.map((m) => (
        <svg
          key={m.id}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          style={{
            position: 'absolute',
            left: m.x,
            top: m.y,
            transform: 'translate(-50%, -50%)',
            opacity: 0.85,
          }}
        >
          <path d="M12 5V19" stroke={STROKE} strokeWidth="1" strokeLinecap="round" />
          <path d="M5 12H19" stroke={STROKE} strokeWidth="1" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  );
}


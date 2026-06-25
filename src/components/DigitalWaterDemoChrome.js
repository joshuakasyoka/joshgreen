import React from 'react';
import { DEMO_ARTIFACTS, TOTAL_WATER } from './digitalWaterDemoData';
import './DigitalWaterDemoShared.css';

const Cursor = ({ visible, x, y }) => (
  <div
    className={`dwd-demo__cursor ${visible ? 'is-visible' : ''}`}
    style={{ transform: `translate(${x}px, ${y}px)` }}
    aria-hidden="true"
  >
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path
        d="M1 1l4.2 16.2L7.5 11 14 9.5 1 1z"
        fill="#ff3300"
        stroke="#000"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const DigitalWaterDemoChrome = ({
  containerRef,
  cursor,
  artifactCount = DEMO_ARTIFACTS.length,
  totalWater = TOTAL_WATER,
  children,
  className = '',
  style,
}) => (
  <div className={`dwd-demo ${className}`.trim()} style={style}>
    <div className="dwd-demo__window" ref={containerRef}>
      <div className="dwd-demo__browser-bar">
        <span className="dwd-demo__dot dwd-demo__dot--red" />
        <span className="dwd-demo__dot dwd-demo__dot--yellow" />
        <span className="dwd-demo__dot dwd-demo__dot--green" />
        <span className="dwd-demo__url">digital-water-database.vercel.app</span>
      </div>

      <div className="dwd-demo__content">
        <header className="dwd-demo__header">
          <span className="dwd-demo__header-left">DATABASE OF DIGITAL WATER</span>
          <span className="dwd-demo__header-right">
            NUMBER OF LIQUID ARTIFACTS: #{artifactCount} | TOTAL WATER USED: {totalWater.toFixed(1)}L
          </span>
        </header>

        <div className="dwd-demo__body">{children}</div>

        <Cursor visible={cursor.visible} x={cursor.x} y={cursor.y} />
      </div>
    </div>
  </div>
);

export default DigitalWaterDemoChrome;

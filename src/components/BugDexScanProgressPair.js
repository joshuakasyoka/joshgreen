import React from 'react';
import BugDexScanDemo from './BugDexScanDemo';
import BugDexProfileDemo from './BugDexProfileDemo';
import './BugDexScanProgressPair.css';

export default function BugDexScanProgressPair({ className = '' }) {
  return (
    <div className={`bugdex-demo-pair ${className}`.trim()}>
      <div className="bugdex-demo-pair__item">
        <BugDexScanDemo />
      </div>
      <div className="bugdex-demo-pair__item">
        <BugDexProfileDemo />
      </div>
    </div>
  );
}

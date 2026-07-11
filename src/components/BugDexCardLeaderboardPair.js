import React from 'react';
import BugDexCardDemo from './BugDexCardDemo';
import BugDexLeaderboardDemo from './BugDexLeaderboardDemo';
import './BugDexScanProgressPair.css';

export default function BugDexCardLeaderboardPair({ className = '' }) {
  return (
    <div className={`bugdex-demo-pair ${className}`.trim()}>
      <div className="bugdex-demo-pair__item">
        <BugDexCardDemo />
      </div>
      <div className="bugdex-demo-pair__item">
        <BugDexLeaderboardDemo />
      </div>
    </div>
  );
}

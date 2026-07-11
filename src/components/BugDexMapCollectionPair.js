import React from 'react';
import BugDexMapDemo from './BugDexMapDemo';
import BugDexCollectionDemo from './BugDexCollectionDemo';
import './BugDexScanProgressPair.css';

export default function BugDexMapCollectionPair({ className = '' }) {
  return (
    <div className={`bugdex-demo-pair ${className}`.trim()}>
      <div className="bugdex-demo-pair__item">
        <BugDexMapDemo />
      </div>
      <div className="bugdex-demo-pair__item">
        <BugDexCollectionDemo />
      </div>
    </div>
  );
}

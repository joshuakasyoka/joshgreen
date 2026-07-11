import React, { useEffect, useState } from 'react';
import {
  BugDexPhone,
  LadybirdArt,
  StagBeetleArt,
  BlueBeetleArt,
  YellowBeetleArt,
  TypeIcon,
  RarityGem,
} from './BugDexDemoShared';
import './BugDexDemoShared.css';

const LOOP_MS = 6800;
const NEW_CARD_AT = 1600;

const CATEGORY_ORDER = ['bug', 'grass', 'sun', 'wind', 'water', 'fire', 'electric', 'ground'];
const BASE_LIT = ['bug', 'grass', 'wind', 'ground'];

// A firebug catch lands in the collection: the Fire section appears,
// the caught counter ticks over, and the fire category lights up.
export default function BugDexCollectionDemo({ className = '' }) {
  const [cycle, setCycle] = useState(0);
  const [caughtNew, setCaughtNew] = useState(false);

  useEffect(() => {
    setCaughtNew(false);
    const catchTimer = setTimeout(() => setCaughtNew(true), NEW_CARD_AT);
    const loopTimer = setTimeout(() => setCycle((c) => c + 1), LOOP_MS);
    return () => {
      clearTimeout(catchTimer);
      clearTimeout(loopTimer);
    };
  }, [cycle]);

  return (
    <BugDexPhone className={className} tab="collection">
      <div className="bugdex-demo__coll">
        <div className="bugdex-demo__coll-top">
          <div className="bugdex-demo__coll-star">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
              <path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 5.9L12 16.4l-5.3 2.9 1.2-5.9L3.4 9.3l6-.7z" />
            </svg>
          </div>
          <div key={`caught-${cycle}-${caughtNew}`} className={`bugdex-demo__coll-caught ${caughtNew ? 'is-bump' : ''}`}>
            {caughtNew ? '11' : '10'} caught
          </div>
        </div>
        <div className="bugdex-demo__coll-title">Bug Club</div>

        <div className="bugdex-demo__coll-cats">
          <div className="bugdex-demo__coll-cats-head">
            <span>Categories</span>
            <span>{caughtNew ? '7' : '6'}/12</span>
          </div>
          <div className="bugdex-demo__coll-cats-row">
            {CATEGORY_ORDER.map((cat) => {
              const lit = BASE_LIT.includes(cat) || (cat === 'fire' && caughtNew);
              const isNew = cat === 'fire' && caughtNew;
              return (
                <div
                  key={`${cat}-${cycle}`}
                  className={`bugdex-demo__coll-cat bugdex-demo__coll-cat--${cat} ${lit ? 'is-lit' : ''} ${isNew ? 'is-new' : ''}`}
                >
                  <TypeIcon type={cat} size={11} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bugdex-demo__coll-section">
          <div className="bugdex-demo__coll-section-head">
            <TypeIcon type="bug" size={12} />
            Bug
            <span className="bugdex-demo__coll-section-count">3</span>
          </div>
          <div className="bugdex-demo__coll-grid">
            <div className="bugdex-demo__coll-cell">
              <div className="bugdex-demo__coll-art">
                <BlueBeetleArt size={46} />
              </div>
              <div className="bugdex-demo__coll-cell-num">
                N° 003
                <RarityGem rarity="uncommon" size={7} />
              </div>
              <div className="bugdex-demo__coll-cell-name">
                Azurehood <span>HP 60</span>
              </div>
            </div>
            <div className="bugdex-demo__coll-cell">
              <div className="bugdex-demo__coll-art">
                <YellowBeetleArt size={46} />
              </div>
              <div className="bugdex-demo__coll-cell-num">
                N° 002
                <RarityGem rarity="common" size={7} />
              </div>
              <div className="bugdex-demo__coll-cell-name">
                Sunspindle <span>HP 50</span>
              </div>
            </div>
            <div className="bugdex-demo__coll-cell">
              <div className="bugdex-demo__coll-art">
                <StagBeetleArt size={46} />
              </div>
              <div className="bugdex-demo__coll-cell-num">
                N° 001
                <RarityGem rarity="ultra" size={7} />
              </div>
              <div className="bugdex-demo__coll-cell-name">
                Duelhorn <span>HP 90</span>
              </div>
            </div>
          </div>
        </div>

        {caughtNew && (
          <div className="bugdex-demo__coll-section" style={{ animation: 'bugdex-fade-up 0.4s ease both' }}>
            <div className="bugdex-demo__coll-section-head">
              <TypeIcon type="fire" size={12} />
              Fire
              <span className="bugdex-demo__coll-section-count">1</span>
            </div>
            <div className="bugdex-demo__coll-grid">
              <div className="bugdex-demo__coll-cell is-new">
                <div className="bugdex-demo__coll-art">
                  <LadybirdArt size={46} />
                </div>
                <div className="bugdex-demo__coll-cell-num">
                  N° 010
                  <RarityGem rarity="uncommon" size={7} />
                </div>
                <div className="bugdex-demo__coll-cell-name">
                  Emberdome <span>HP 45</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BugDexPhone>
  );
}

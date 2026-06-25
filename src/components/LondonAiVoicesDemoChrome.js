import React from 'react';
import { CONTRIBUTION, FILTER_MODES } from './londonAiVoicesDemoData';
import './LondonAiVoicesDemoShared.css';

const Cursor = ({ visible, x, y }) => (
  <div
    className={`laiv-demo__cursor ${visible ? 'is-visible' : ''}`}
    style={{ transform: `translate(${x}px, ${y}px)` }}
    aria-hidden="true"
  >
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path
        d="M1 1l4.2 16.2L7.5 11 14 9.5 1 1z"
        fill="#fff"
        stroke="#111"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const FilterPanel = ({
  searchQuery,
  filterMode = 'story',
  searchRef,
  isSearchHovered,
}) => (
  <aside className="laiv-demo__sidebar">
    <div className="laiv-demo__filter-box">
      <input
        ref={searchRef}
        className={[
          'laiv-demo__search',
          isSearchHovered ? 'is-hovered' : '',
        ].filter(Boolean).join(' ')}
        value={searchQuery}
        readOnly
        aria-label="Search contributions"
        placeholder="SEARCH"
      />
      <div className="laiv-demo__filters" role="radiogroup" aria-label="Filter mode">
        {FILTER_MODES.map((mode) => (
          <label key={mode} className="laiv-demo__filter">
            <span
              className={[
                'laiv-demo__radio',
                filterMode === mode ? 'is-active' : '',
              ].filter(Boolean).join(' ')}
              aria-hidden="true"
            />
            <span>{mode.toUpperCase()}</span>
          </label>
        ))}
      </div>
    </div>
  </aside>
);

const ViewButtons = ({
  activeView,
  networkRef,
  tagRef,
  modeRef,
  hoveredTarget,
}) => (
  <div className="laiv-demo__view-btns">
    <span
      ref={networkRef}
      className={[
        'laiv-demo__view-btn',
        activeView === 'network' ? 'is-active' : '',
        hoveredTarget === 'network' ? 'is-hovered' : '',
      ].filter(Boolean).join(' ')}
    >
      NETWORK VIEW
    </span>
    <span
      ref={tagRef}
      className={[
        'laiv-demo__view-btn',
        activeView === 'tag' ? 'is-active' : '',
        hoveredTarget === 'tag' ? 'is-hovered' : '',
      ].filter(Boolean).join(' ')}
    >
      TAG VIEW
    </span>
    <span
      ref={modeRef}
      className={[
        'laiv-demo__view-btn',
        hoveredTarget === 'mode' ? 'is-hovered' : '',
      ].filter(Boolean).join(' ')}
    >
      MODE
    </span>
  </div>
);

export const ContributionCard = ({
  visible,
  activeTag,
  hoveredTag,
  cardRef,
  tagRefs,
  className = '',
  style,
}) => (
  <article
    className={[
      'laiv-demo__card',
      visible ? 'is-visible' : '',
      className,
    ].filter(Boolean).join(' ')}
    ref={cardRef}
    style={style}
  >
    <header className="laiv-demo__card-header">
      <span>CONTRIBUTION</span>
      <span>{CONTRIBUTION.date}</span>
    </header>
    <div className="laiv-demo__card-photo">
      <img
        className="laiv-demo__card-photo-img"
        src={CONTRIBUTION.portrait}
        alt=""
        loading="lazy"
        draggable="false"
      />
    </div>
    <p className="laiv-demo__card-quote">{CONTRIBUTION.quote}</p>
    <div className="laiv-demo__card-tags">
      {CONTRIBUTION.tags.map((tag) => (
        <span
          key={tag}
          ref={tagRefs?.(tag)}
          className={[
            'laiv-demo__card-tag',
            activeTag === tag ? 'is-active' : '',
            hoveredTag === tag ? 'is-hovered' : '',
          ].filter(Boolean).join(' ')}
        >
          {tag}
        </span>
      ))}
    </div>
  </article>
);

const LondonAiVoicesDemoChrome = ({
  containerRef,
  cursor,
  activeView = 'tag',
  searchQuery = '',
  filterMode = 'story',
  showCard = false,
  cardActiveTag = null,
  hoveredView = null,
  hoveredTag = null,
  isSearchHovered = false,
  searchRef,
  networkRef,
  tagRef,
  modeRef,
  cardRef,
  tagRefs,
  cardPlacement = 'sidebar',
  stageClassName = '',
  children,
  className = '',
  style,
}) => (
  <div className={`laiv-demo ${className}`.trim()} style={style}>
    <div className="laiv-demo__window" ref={containerRef}>
      <div className="laiv-demo__browser-bar">
        <span className="laiv-demo__dot laiv-demo__dot--red" />
        <span className="laiv-demo__dot laiv-demo__dot--yellow" />
        <span className="laiv-demo__dot laiv-demo__dot--green" />
        <span className="laiv-demo__url">aivoicesmap.vercel.app</span>
      </div>

      <div className="laiv-demo__content">
        <header className="laiv-demo__header">
          <h2 className="laiv-demo__title">LONDON AI VOICES ARCHIVE</h2>
          <ViewButtons
            activeView={activeView}
            networkRef={networkRef}
            tagRef={tagRef}
            modeRef={modeRef}
            hoveredTarget={hoveredView}
          />
        </header>

        <div className="laiv-demo__layout">
          <div className="laiv-demo__left">
            <FilterPanel
              searchQuery={searchQuery}
              filterMode={filterMode}
              searchRef={searchRef}
              isSearchHovered={isSearchHovered}
            />
            {cardPlacement === 'sidebar' ? (
              <ContributionCard
                visible={showCard}
                activeTag={cardActiveTag}
                hoveredTag={hoveredTag}
                cardRef={cardRef}
                tagRefs={tagRefs}
              />
            ) : null}
          </div>

          <div className={['laiv-demo__stage', stageClassName].filter(Boolean).join(' ')}>{children}</div>
        </div>

        <Cursor visible={cursor.visible} x={cursor.x} y={cursor.y} />
      </div>
    </div>
  </div>
);

export default LondonAiVoicesDemoChrome;

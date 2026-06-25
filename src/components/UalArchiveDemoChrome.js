import React from 'react';

const Cursor = ({ visible, x, y }) => (
  <div
    className={`ual-archive-demo__cursor ${visible ? 'is-visible' : ''}`}
    style={{ transform: `translate(${x}px, ${y}px)` }}
    aria-hidden="true"
  >
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path
        d="M1 1l4.2 16.2L7.5 11 14 9.5 1 1z"
        fill="#111"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const UalArchiveDemoChrome = ({
  containerRef,
  cursor,
  activeSubnav = 'artefacts',
  url = 'gcdp-archive-2026.vercel.app',
  children,
  className = '',
  style,
}) => (
  <div className={`ual-archive-demo ${className}`.trim()} style={style}>
    <div className="ual-archive-demo__window" ref={containerRef}>
      <div className="ual-archive-demo__browser-bar">
        <span className="ual-archive-demo__dot ual-archive-demo__dot--red" />
        <span className="ual-archive-demo__dot ual-archive-demo__dot--yellow" />
        <span className="ual-archive-demo__dot ual-archive-demo__dot--green" />
        <span className="ual-archive-demo__url">{url}</span>
      </div>

      <div className="ual-archive-demo__content">
        <header className="ual-archive-demo__navbar">
          <div className="ual-archive-demo__navbar-top">
            <span className="ual-archive-demo__navbar-title">MA GCDP ARCHIVE</span>
            <div className="ual-archive-demo__navbar-links">
              <span>About</span>
              <span>Glossary</span>
            </div>
          </div>
          <nav className="ual-archive-demo__subnav">
            {[
              ['artefacts', 'Artefacts'],
              ['projects', 'Projects'],
              ['collaborations', 'Collaborations'],
            ].map(([id, label]) => (
              <span
                key={id}
                className={`ual-archive-demo__subnav-link${activeSubnav === id ? ' is-active' : ''}`}
              >
                {label}
              </span>
            ))}
          </nav>
        </header>

        <div className="ual-archive-demo__body">{children}</div>

        <Cursor visible={cursor.visible} x={cursor.x} y={cursor.y} />
      </div>
    </div>
  </div>
);

export default UalArchiveDemoChrome;

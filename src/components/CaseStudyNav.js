import React from 'react';
import './CaseStudyNav.css';

const CaseStudyNav = ({ sections, activeSectionId, onSelectSection, onBackToTop, showBackToTop }) => {
  if (!sections?.length) return null;

  return (
    <nav className="case-study-nav hidden md:block" aria-label="On this page">
      <div className="case-study-nav__scroll scroll-clip__inner">
        <button
          type="button"
          className={[
            'case-study-nav__index',
            'custom-clickable',
            showBackToTop ? 'case-study-nav__index--visible' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={onBackToTop}
          aria-hidden={!showBackToTop}
          tabIndex={showBackToTop ? 0 : -1}
        >
          <span className="case-study-nav__index-arrow" aria-hidden="true">↑</span>
          <span className="case-study-nav__index-label">Back to top</span>
        </button>

        <ul className="case-study-nav__list">
          {sections.map((section) => {
            const isActive = activeSectionId === section.id;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  className={[
                    'case-study-nav__item',
                    'custom-clickable',
                    isActive ? 'case-study-nav__item--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => onSelectSection(section.id)}
                  aria-current={isActive ? 'location' : undefined}
                  title={section.title || section.label}
                >
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default CaseStudyNav;

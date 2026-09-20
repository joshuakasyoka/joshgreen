import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, ChevronUp, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { PRESENTABLE_CASE_STUDIES } from '../../data/caseStudies';
import { PRESENTATION_DEMOS } from './demoRegistry';
import { buildSlides } from './buildSlides';
import CaseStudyLockPrompt from '../CaseStudyLockPrompt';
import { isUnlocked, lockedSlugId } from '../../utils/caseStudyLock';
import './CaseStudyPresentation.css';

// Slides are authored on a fixed 1920×1080 canvas and scaled to fit the
// viewport, the way Figma's present mode letterboxes a frame.
const SLIDE_W = 1920;
const SLIDE_H = 1080;
const DEMO_FORCE_WIDTH = 1000;
const CHROME_IDLE_MS = 2200;

const RichText = ({ body, className }) => {
  if (!body) return null;
  if (typeof body === 'string') return <p className={className}>{body}</p>;

  const paragraphs = [[]];
  body.forEach((part) => {
    if (part?.break) paragraphs.push([]);
    else paragraphs[paragraphs.length - 1].push(part);
  });

  return paragraphs.map((parts, pIdx) => (
    <p key={pIdx} className={className}>
      {parts.map((part, idx) =>
        typeof part === 'string' ? (
          <React.Fragment key={idx}>{part}</React.Fragment>
        ) : (
          <span key={idx} className="present-term">
            {part.text}
          </span>
        )
      )}
    </p>
  ));
};

// Renders a demo at its natural desktop size, then scales it uniformly to fit
// both dimensions of its box. Uses layout sizes (clientWidth/offsetWidth) so it
// measures correctly inside the already-scaled slide.
const FitDemo = ({ demo }) => {
  const Demo = PRESENTATION_DEMOS[demo];
  const boxRef = useRef(null);
  const innerRef = useRef(null);
  const [natural, setNatural] = useState(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const target = innerRef.current?.firstElementChild;
    if (!target) return undefined;
    const measure = () => {
      const w = target.offsetWidth;
      const h = target.offsetHeight;
      if (w > 0 && h > 0) setNatural({ w, h });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    return () => observer.disconnect();
  }, [demo]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box || !natural) return undefined;
    const fit = () => {
      const s = Math.min(box.clientWidth / natural.w, box.clientHeight / natural.h, 1.6);
      if (s > 0) setScale(s);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [natural]);

  if (!Demo) return null;

  return (
    <div ref={boxRef} className="present-demo">
      <div
        className="present-demo__stage"
        style={natural ? { width: natural.w * scale, height: natural.h * scale } : { visibility: 'hidden' }}
      >
        <div
          ref={innerRef}
          className="present-demo__inner"
          style={{ width: natural ? natural.w : DEMO_FORCE_WIDTH, transform: `scale(${scale})` }}
        >
          <Demo className="w-full" />
        </div>
      </div>
    </div>
  );
};

const Eyebrow = ({ items }) => (
  <div className="present-eyebrow">
    {items.filter(Boolean).map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
);

const Slide = ({ slide, study }) => {
  if (slide.type === 'cover') {
    return (
      <div className="present-slide present-slide--cover">
        <Eyebrow items={['Case Study', study.presentation?.client, study.date]} />
        <div className="present-cover__bottom">
          <h1 className="present-display">{study.name}</h1>
          <p className="present-body present-cover__lede">{study.description}</p>
        </div>
      </div>
    );
  }

  if (slide.type === 'end') {
    return (
      <div className="present-slide present-slide--cover">
        <Eyebrow items={['Case Study', study.presentation?.client, study.date]} />
        <div className="present-cover__bottom">
          <h2 className="present-display">{study.name}</h2>
          <div className="present-body present-end__links">
            {study.website && (
              <a href={study.website} target="_blank" rel="noreferrer">
                View the prototype ↗
              </a>
            )}
            <Link to="/">Back to portfolio</Link>
          </div>
        </div>
      </div>
    );
  }

  // Story slides: a white side column (label, copy, "n of N") beside a grey
  // stage holding the demo, the result figures or - with no media - the copy.
  const hasDemo = Boolean(slide.demo && PRESENTATION_DEMOS[slide.demo]);
  const hasStats = slide.type === 'results' && slide.stats.length > 0;
  const hasMedia = hasDemo || hasStats;

  return (
    <div className="present-slide present-slide--story">
      <div className="present-side">
        <Eyebrow items={[slide.label, slide.subLabel]} />
        {hasMedia && (
          <div className="present-side__body">
            <RichText body={slide.body} className="present-body" />
          </div>
        )}
        <div className="present-side__count">
          {slide.position} of {slide.of}
        </div>
      </div>
      <div className="present-stage">
        {hasDemo && (
          <div className="present-stage__frame">
            <FitDemo demo={slide.demo} />
          </div>
        )}
        {hasStats && (
          <div className="present-stage__frame present-stats">
            {slide.stats.map((stat) => (
              <div key={stat.value} className="present-stat">
                <div className="present-stat__value">{stat.value}</div>
                <div className="present-stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        {!hasMedia && (
          <div className="present-stage__statement">
            <RichText body={slide.body} className="present-body present-body--statement" />
          </div>
        )}
      </div>
    </div>
  );
};

const useViewportScale = (ref) => {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const fit = () => {
      const style = window.getComputedStyle(node);
      const w = node.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const h = node.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      setScale(Math.max(0, Math.min(w / SLIDE_W, h / SLIDE_H)));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return scale;
};

const CaseStudyPresentation = () => {
  const { slug, slide: slideParam } = useParams();
  const navigate = useNavigate();
  const study = PRESENTABLE_CASE_STUDIES[slug];
  const slides = useMemo(() => (study ? buildSlides(study) : []), [study]);

  const requested = Number.parseInt(slideParam, 10);
  const index = Number.isFinite(requested) ? Math.min(Math.max(requested - 1, 0), slides.length - 1) : 0;

  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const scale = useViewportScale(viewportRef);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toolbarRef = useRef(null);
  const lockedId = lockedSlugId(slug);
  const [unlocked, setUnlocked] = useState(() => (lockedId ? isUnlocked(lockedId) : true));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const idleTimer = useRef(null);
  const touchStart = useRef(null);

  menuOpenRef.current = menuOpen;

  const goTo = useCallback(
    (next) => {
      const clamped = Math.min(Math.max(next, 0), slides.length - 1);
      if (clamped === index) return;
      navigate(`/present/${slug}/${clamped + 1}`, { replace: true });
    },
    [index, navigate, slides.length, slug]
  );

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else rootRef.current?.requestFullscreen?.();
  }, []);

  const wake = useCallback(() => {
    setChromeVisible(true);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      // Keep the toolbar up while the case-study menu is open.
      if (!menuOpenRef.current) setChromeVisible(false);
    }, CHROME_IDLE_MS);
  }, []);

  // Switching case study closes the menu and starts from its first slide.
  useEffect(() => {
    setMenuOpen(false);
    setUnlocked(lockedId ? isUnlocked(lockedId) : true);
  }, [slug, lockedId]);

  useEffect(() => {
    if (!menuOpen) wake();
  }, [menuOpen, wake]);

  useEffect(() => {
    wake();
    return () => window.clearTimeout(idleTimer.current);
  }, [wake]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    if (!study) return undefined;
    const previousTitle = document.title;
    document.title = `${study.name} - Presentation`;
    return () => {
      document.title = previousTitle;
    };
  }, [study]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      // While the menu is open, keys belong to it: Escape closes it, and
      // Tab/Enter work on its items as normal buttons.
      if (menuOpenRef.current) {
        if (event.key === 'Escape') setMenuOpen(false);
        return;
      }
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
        case 'Enter':
          event.preventDefault();
          goTo(index + (event.shiftKey && event.key === ' ' ? -1 : 1));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          event.preventDefault();
          goTo(index - 1);
          break;
        case 'Home':
          goTo(0);
          break;
        case 'End':
          goTo(slides.length - 1);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (!document.fullscreenElement) navigate('/');
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, index, navigate, slides.length, toggleFullscreen]);

  if (!study) return <Navigate to="/" replace />;

  // Click the right two-thirds to advance, the left third to go back -
  // links and toolbar buttons keep their own behaviour.
  const handleStageClick = (event) => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    if (event.target.closest('a, button')) return;
    // A faded-out toolbar lets clicks through; a click where it sits should
    // bring it back, not change slide.
    const bar = toolbarRef.current?.getBoundingClientRect();
    if (bar && event.clientY >= bar.top && event.clientX >= bar.left && event.clientX <= bar.right) {
      wake();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    goTo(event.clientX - rect.left < rect.width / 3 ? index - 1 : index + 1);
  };

  const handleTouchStart = (event) => {
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) goTo(index + (dx < 0 ? 1 : -1));
  };

  const slide = slides[index];
  const progress = slides.length > 1 ? index / (slides.length - 1) : 1;

  return (
    <div
      ref={rootRef}
      className={`present${chromeVisible ? '' : ' present--idle'}`}
      onMouseMove={wake}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={viewportRef} className="present__viewport" onClick={handleStageClick}>
        <div className="present__frame" style={{ width: SLIDE_W * scale, height: SLIDE_H * scale }}>
          <div className="present__canvas" style={{ transform: `scale(${scale})` }}>
            {unlocked ? (
              <div key={slide.id} className="present__slide-enter">
                <Slide slide={slide} study={study} />
              </div>
            ) : (
              <div className="present-slide present__locked">
                <CaseStudyLockPrompt
                  projectId={lockedId}
                  title={study.name}
                  onUnlocked={() => setUnlocked(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div ref={toolbarRef} className="present__toolbar" role="toolbar" aria-label="Presentation controls">
        {menuOpen && (
          <div className="present__menu" role="menu" aria-label="Case study presentations">
            <div className="present__menu-label">Case studies</div>
            {Object.entries(PRESENTABLE_CASE_STUDIES).map(([key, entry]) => (
              <button
                key={key}
                type="button"
                role="menuitemradio"
                aria-checked={key === slug}
                className={`present__menu-item ${key === slug ? 'is-current' : ''}`.trim()}
                onClick={() => (key === slug ? setMenuOpen(false) : navigate(`/present/${key}/1`))}
              >
                <span className="present__menu-text">
                  <span>{entry.name}</span>
                  <small>{[entry.presentation?.client, entry.date].filter(Boolean).join(' · ')}</small>
                </span>
                {key === slug && <Check size={14} strokeWidth={2} aria-hidden="true" />}
              </button>
            ))}
          </div>
        )}
        <div className="present__progress" aria-hidden="true">
          <div className="present__progress-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="present__toolbar-row">
          <div className="present__toolbar-group">
            <Link to="/" className="present__btn present__btn--label" title="Exit (Esc)">
              <ArrowLeft size={16} strokeWidth={1.75} />
              <span>Portfolio</span>
            </Link>
            <button
              type="button"
              className={`present__title ${menuOpen ? 'is-open' : ''}`.trim()}
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              title="Switch case study"
            >
              <span className="present__title-text">
                {study.name}
                <span className="present__title-muted"> · {slide.label}</span>
              </span>
              <ChevronUp size={14} strokeWidth={1.75} className="present__title-chevron" aria-hidden="true" />
            </button>
          </div>

          <div className="present__toolbar-group present__toolbar-group--center">
            <button type="button" className="present__btn" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous slide">
              <ChevronLeft size={18} strokeWidth={1.75} />
            </button>
            <span className="present__counter">
              {index + 1} / {slides.length}
            </span>
            <button
              type="button"
              className="present__btn"
              onClick={() => goTo(index + 1)}
              disabled={index === slides.length - 1}
              aria-label="Next slide"
            >
              <ChevronRight size={18} strokeWidth={1.75} />
            </button>
          </div>

          <div className="present__toolbar-group present__toolbar-group--end">
            <button type="button" className="present__btn" onClick={() => goTo(0)} aria-label="Restart" title="Restart (Home)">
              <RotateCcw size={16} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="present__btn"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
              title="Full screen (F)"
            >
              {isFullscreen ? <Minimize2 size={16} strokeWidth={1.75} /> : <Maximize2 size={16} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPresentation;

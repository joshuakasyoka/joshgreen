import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../IntroAnimation.css';

const INTRO_LINES_RAW = [
  {
    parts: [{ text: 'Josh Green' }],
  },
  {
    parts: [
      { text: "I'm a Product Designer working on the future of civil engineering tools at" },
      { text: 'Mott MacDonald', href: 'https://www.mottmac.com/' },
      { text: '— a global engineering and management consultancy — through' },
      { text: 'Mettle Design Studio', href: 'https://mettle-studio.com/' },
      { text: '.' },
    ],
  },
  {
    parts: [
      { text: "Alongside this, I'm a part-time doctoral researcher at UAL, investigating the role of" },
      { text: 'generative AI in creative and civic contexts', underline: true },
      { text: '.' },
    ],
  },
  {
    parts: [
      { text: "I'm also an associate lecturer at UAL, where I care deeply about collaboration and about using" },
      { text: "design's potential as a force for good", underline: true },
      { text: ', particularly for communities that are typically excluded or marginalised.' },
    ],
  },
];

const INTRO_PARTS = [];
const INTRO_LINES = INTRO_LINES_RAW.map((line) => ({
  parts: line.parts.map((part) => {
    const indexedPart = { ...part, partIndex: INTRO_PARTS.length };
    INTRO_PARTS.push(indexedPart);
    return indexedPart;
  }),
}));

const INTRO_TOKENS = INTRO_PARTS.flatMap((part) =>
  part.text.split(/\s+/).map((word) => ({
    word,
    partIndex: part.partIndex,
    href: part.href || null,
    underline: part.underline || false,
  }))
);

const WORD_INTERVAL_MS = 85;
const HOLD_AFTER_COMPLETE_MS = 3200;
const FADE_OUT_MS = 0;

const CONTACT_EMAIL = 'joshkwgreen@gmail.com';

const IntroAnimation = ({ onComplete }) => {
  const words = useMemo(() => INTRO_TOKENS, []);
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState('revealing');
  const [emailCopied, setEmailCopied] = useState(false);
  const timersRef = useRef([]);
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    setPhase('done');
    onComplete?.();
  }, [clearTimers, onComplete]);

  const exitIntro = useCallback(() => {
    if (phase === 'done') return;
    clearTimers();
    setVisibleCount(words.length);
    setPhase('exiting');
    const timer = setTimeout(finish, prefersReducedMotion ? 0 : FADE_OUT_MS);
    timersRef.current.push(timer);
  }, [phase, clearTimers, words.length, finish, prefersReducedMotion]);

  const skip = useCallback(() => {
    exitIntro();
  }, [exitIntro]);

  const handleChipClick = useCallback((e) => {
    e.stopPropagation();
    exitIntro();
  }, [exitIntro]);

  const handleContactClick = useCallback(async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  }, []);

  const renderPart = useCallback((part) => {
    const partStartIndex = words.findIndex((token) => token.partIndex === part.partIndex);
    const partWords = words.filter((token) => token.partIndex === part.partIndex);

    const content = partWords.map((token, wordIndex) => {
      const globalIndex = partStartIndex + wordIndex;
      const isVisible = globalIndex < visibleCount;
      return (
        <span
          key={`${part.partIndex}-${wordIndex}`}
          className={['intro-word', isVisible ? 'intro-word--visible' : ''].filter(Boolean).join(' ')}
        >
          {token.word}{' '}
        </span>
      );
    });

    if (part.href) {
      return (
        <a
          key={part.partIndex}
          href={part.href}
          className="intro-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </a>
      );
    }

    if (part.underline) {
      return (
        <span key={part.partIndex} className="intro-emphasis">
          {content}
        </span>
      );
    }

    return <React.Fragment key={part.partIndex}>{content}</React.Fragment>;
  }, [words, visibleCount]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(words.length);
      setPhase('holding');
      const timer = setTimeout(() => {
        setPhase('exiting');
        timersRef.current.push(setTimeout(finish, 0));
      }, 1200);
      timersRef.current.push(timer);
      return clearTimers;
    }

    if (phase !== 'revealing') return undefined;

    if (visibleCount < words.length) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), WORD_INTERVAL_MS);
      timersRef.current.push(timer);
      return clearTimers;
    }

    setPhase('holding');
    const holdTimer = setTimeout(() => setPhase('exiting'), HOLD_AFTER_COMPLETE_MS);
    timersRef.current.push(holdTimer);
    return clearTimers;
  }, [phase, visibleCount, words.length, prefersReducedMotion, clearTimers, finish]);

  useEffect(() => {
    if (phase !== 'exiting') return undefined;
    const timer = setTimeout(finish, FADE_OUT_MS);
    timersRef.current.push(timer);
    return clearTimers;
  }, [phase, finish, clearTimers]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [skip]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  if (phase === 'done') return null;

  const textComplete = visibleCount >= words.length;

  return (
    <div
      className={`intro-overlay ${phase === 'exiting' ? 'intro-overlay--exit' : ''}`}
      role="dialog"
      aria-label="Introduction"
      aria-live="polite"
      onClick={skip}
    >
      <div className="intro-content">
        <div className="intro-text-column">
          {INTRO_LINES.map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              <p className="intro-line">
                {line.parts.map((part) => renderPart(part))}
              </p>
              {lineIndex === 0 && (
                <p className="intro-line intro-line--date">Updated 1st July 2026</p>
              )}
            </React.Fragment>
          ))}

          <div
            className={[
              'intro-chips',
              textComplete ? 'intro-chips--visible' : '',
              phase === 'exiting' ? 'intro-chips--instant' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <button
              type="button"
              className="intro-chip"
              onClick={handleContactClick}
            >
              <span aria-hidden="true">{emailCopied ? '♡' : '+'}</span>
              {emailCopied ? 'Email copied' : 'Contact me'}
            </button>
            <button
              type="button"
              className="intro-chip"
              onClick={handleChipClick}
            >
              latest case study
              <svg className="intro-chip__arrow" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                <path d="M1 4 H7.5 M7.5 4 L5 1.5 M7.5 4 L5 6.5" />
              </svg>
            </button>
            <button
              type="button"
              className="intro-chip"
              onClick={handleChipClick}
            >
              all work
              <svg className="intro-chip__arrow" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                <path d="M1 4 H7.5 M7.5 4 L5 1.5 M7.5 4 L5 6.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`intro-photo ${phase !== 'revealing' || visibleCount > 8 ? 'intro-photo--visible' : ''}`}>
          <img
            src="/images/intro/team.png"
            alt="Mettle Design Studio team"
            className="intro-photo__img"
          />
          <div
            className={[
              'intro-photo__callout',
              textComplete ? 'intro-photo__callout--visible' : '',
              phase === 'exiting' ? 'intro-photo__callout--instant' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          >
            <svg className="intro-photo__callout-arrow" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M5 8 V3 M5 3 L2.5 5.5 M5 3 L7.5 5.5" />
            </svg>
            <span className="intro-photo__callout-text">Me :)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;

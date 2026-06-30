import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import FloatingLetters from './FloatingLetters';
import './About.css';

const TEAM_PHOTO_SRC = '/images/intro/team.png';
const CONTACT_EMAIL = 'joshkwgreen@gmail.com';

const About = ({ isDarkMode, toggleDarkMode }) => {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  // Screenshot photos (latest first)
  const recentPhotos = [
    '/images/about/Screenshot 2026-03-25 at 23.34.45.png',
    '/images/about/Screenshot 2026-03-25 at 23.32.23.png',
    '/images/about/Screenshot 2026-03-25 at 23.31.49.png',
    '/images/about/Screenshot 2026-03-25 at 23.31.39.png',
    '/images/about/Screenshot 2026-03-25 at 23.31.23.png',
    '/images/about/Screenshot 2026-03-25 at 23.30.56.png',
    '/images/about/Screenshot 2026-03-25 at 23.30.42.png',
    '/images/about/Screenshot 2026-03-25 at 23.30.27.png',
    '/images/about/Screenshot 2026-03-25 at 23.30.12.png',
    '/images/about/Screenshot 2026-03-25 at 23.30.02.png',
    '/images/about/Screenshot 2026-03-25 at 23.29.51.png',
    '/images/about/Screenshot 2026-03-25 at 23.29.40.png',
    '/images/about/Screenshot 2026-03-25 at 23.26.54.png',
    '/images/about/Screenshot 2026-03-25 at 23.26.23.png',
    '/images/about/Screenshot 2026-03-25 at 23.26.04.png',
    TEAM_PHOTO_SRC,
  ];

  const stackRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  useEffect(() => {
    if (!stackRef.current) return;
    const el = stackRef.current;
    let timer;

    const onIntersect = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Stagger in each card
        let i = 0;
        const step = () => {
          setVisibleCount((prev) => {
            const next = Math.min(recentPhotos.length, prev + 1);
            return next;
          });
          i += 1;
          if (i < recentPhotos.length) {
            timer = setTimeout(step, 700);
          }
        };
        // start after a tiny delay for nicer feel
        timer = setTimeout(step, 350);
      } else {
        // Reset when scrolled away so animation can replay
        setVisibleCount(0);
        if (timer) clearTimeout(timer);
      }
    };

    const io = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [recentPhotos.length]);

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between items-start px-8 py-6">
        <Link
          to="/"
          className="floating-letters-header text-xl font-normal text-gray-800 custom-clickable no-underline"
          aria-label="Josh Green"
        >
          <span className="md:hidden">
            <FloatingLetters text="JG" />
          </span>
          <span className="hidden md:inline">
            <FloatingLetters text="Josh Green" /><span className="header-smiley" aria-hidden="true"> :)</span>
          </span>
        </Link>

        {/* Right side content */}
        <div className="flex items-center gap-4">
          {isDarkMode && (
            <span className="text-xs md:text-sm text-gray-500 select-none whitespace-nowrap">
              hold to annotate
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="w-9 h-5 custom-clickable relative rounded-full"
            style={{ border: '0.5px solid #81FF03' }}
          >
            <span
              className="absolute w-4 h-4 rounded-full transition-transform duration-200"
              style={{
                left: '2px',
                top: '50%',
                transform: isDarkMode ? 'translate(16px, -50%)' : 'translate(0, -50%)',
                backgroundColor: '#81FF03'
              }}
            />
          </button>
          <Link to="/" className="text-base font-normal text-gray-800 hover:text-gray-400 transition-colors duration-300">
          Back
        </Link>
        </div>
      </div>
      <div className="px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Text */}
        <div
          className="max-w-md space-y-6 text-sm text-gray-800 leading-normal overflow-y-auto md:max-h-[calc(100vh-140px)] pb-12"
        >
          <div
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: 'rgb(129, 255, 3)' }}
          ></div>
          <div className="pt-2">
            <h3 className="text-sm font-normal text-gray-900 mb-3">Education</h3>
            <div className="space-y-3">
              <div>
                <div>PhD, Critical Design Theory</div>
                <div className="text-xs text-gray-500">University of the Arts London (2025—2030)</div>
              </div>
              <div>
                <div>MSc &amp; MA, Collaborative Design</div>
                <div className="text-xs text-gray-500">UAL &amp; Kyoto Institute of Technology (Distinction)</div>
              </div>
              <div>
                <div>MA (Hons), English</div>
                <div className="text-xs text-gray-500">University of Edinburgh (1st Class)</div>
              </div>
            </div>
          </div>
          <p>
            I'm a Senior Design Consultant leading multiple digital products for Mott MacDonald, a global engineering and management consultancy, through Mettle Design Studio. Alongside this, I'm a part-time doctoral researcher at UAL, investigating the role of generative AI in creative and civic contexts. I care deeply about design excellence and its potential as a force for good, particularly for excluded and marginalised communities.
          </p>
          <p className="mt-3">
            If you want to get a coffee and chat about design send me an email!
          </p>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 border border-gray-300 text-gray-600 text-xs rounded-full custom-clickable"
          >
            <span aria-hidden="true">{emailCopied ? '♡' : '+'}</span>
            <span>{emailCopied ? 'Email copied to clipboard' : 'Contact me'}</span>
          </button>

          </div>
          {/* Right: Stacking cards animation */}
          <div ref={stackRef} className="relative mt-8 md:mt-0 mb-32 md:mb-8" style={{ height: '76vh' }}>
            {recentPhotos.map((src, idx) => {
              const currentIdx = visibleCount > 0 ? visibleCount - 1 : -1;
              const isCurrent = idx === currentIdx;
              const hasAppeared = idx < visibleCount;
              const isTeamPhoto = src === TEAM_PHOTO_SRC;
              const rot = (idx % 2 === 0 ? -1 : 1) * (2 + (idx % 3));
              return (
                <div
                  key={src}
                  className="absolute left-1/2 -translate-x-1/2 md:-ml-24 transition-all duration-700 ease-out will-change-transform"
                  style={{
                    top: 0,
                    transform: `translateX(-50%) ${hasAppeared ? 'translateY(0) rotate(0deg)' : `translateY(24px) rotate(${rot}deg)`}`,
                    opacity: isCurrent ? 1 : 0,
                    zIndex: isCurrent ? 20 : 10,
                    width: 'min(88vw, 600px)'
                  }}
                >
                  <div
                    className={`about-photo-frame rounded-lg ${isTeamPhoto ? 'about-photo-frame--team' : 'overflow-hidden'}`}
                  >
                    <OptimizedImage
                      src={src}
                      alt={isTeamPhoto ? 'Mettle Design Studio team' : `About ${idx + 1}`}
                      className="block w-full h-full object-contain"
                      loading={idx < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 
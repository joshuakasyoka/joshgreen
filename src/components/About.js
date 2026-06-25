import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import FloatingLetters from './FloatingLetters';
import './About.css';

const TEAM_PHOTO_SRC = '/images/intro/team.png';

const About = ({ isDarkMode, toggleDarkMode }) => {
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
          className={`floating-letters-header text-xl font-normal text-gray-800 transition-all duration-300 custom-clickable no-underline ${
            isHeaderHovered ? 'filter-none' : 'blur-sm'
          }`}
          aria-label="Josh Green"
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          <span className="md:hidden">
            <FloatingLetters text="JG" />
          </span>
          <span className="hidden md:inline">
            <FloatingLetters text="Josh Green" />
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
          <Link to="/" className="text-base font-normal text-gray-800 filter blur-[1px] hover:filter-none transition-all">
          Back
        </Link>
        </div>
      </div>
      <div className="px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start md:items-center">
          {/* Left: Text */}
        <div className="max-w-md space-y-6 text-sm text-gray-800 leading-normal">
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
          <h2 className="font-normal">I'm Josh</h2>
          <p>
            I am an interdisciplinary designer based in London, and I'm exploring the societal challenges posed by generative AI. My work challenges the unfulfilled promises of a technological utopia by investigating how technology has often exacerbated inequality and led to social fragmentation.
          </p>
          <p>
            I am particularly focused on how the proliferation of AI-generated visual content, often called "AI slop," is undermining our relationship with images and truth.
          </p>
          <p>
            Through my research, I aim to imagine more inclusive technological futures by using participatory design methods and public-facing probes that encourage critical and speculative thinking. My goal is to develop a new social contract with images, fostering critical literacy and epistemic resilience in the face of AI technologies that seek to make us passive recipients of their impacts.
          </p>
          <p>
            My creative lab invites people to actively make, think, and critique, helping them reclaim their human agency. To understand how these methods work in different contexts, I am conducting a comparative study in London and Tokyo, which have different technological and cultural landscapes.
          </p>

          </div>
          {/* Right: Stacking cards animation */}
          <div ref={stackRef} className="relative mt-8 md:mt-0 mb-32 md:mb-8" style={{ height: '76vh' }}>
            {recentPhotos.map((src, idx) => {
              const isVisible = idx < visibleCount;
              const isTeamPhoto = src === TEAM_PHOTO_SRC;
              // Stack directly on top (no vertical offset)
              const y = 0;
              const rot = (idx % 2 === 0 ? -1 : 1) * (2 + (idx % 3));
              return (
                <div
                  key={src}
                  className="absolute left-1/2 -translate-x-1/2 md:-ml-24 transition-all duration-900 ease-out will-change-transform"
                  style={{
                    top: `${y}px`,
                    transform: `translateX(-50%) ${isVisible ? 'translateY(0) rotate(0deg)' : `translateY(24px) rotate(${rot}deg)`}`,
                    opacity: isVisible ? 1 : 0,
                    zIndex: 10 + idx,
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
                    {isTeamPhoto && isVisible && (
                      <div className="about-photo-callout" aria-hidden="true">
                        <svg className="about-photo-callout__arrow" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M5 8 V3 M5 3 L2.5 5.5 M5 3 L7.5 5.5" />
                        </svg>
                        <span className="about-photo-callout__text">Me :)</span>
                      </div>
                    )}
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
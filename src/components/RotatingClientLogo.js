import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/**
 * Circular client logo with a continuous GSAP 360° spin.
 * Hover / focus reveals the client label to the left.
 * Spin is disabled when the user prefers reduced motion.
 */
const RotatingClientLogo = ({
  src,
  clientLabel,
  className = '',
  size = 40,
  fit = 'cover',
  badgeClassName = 'bg-white',
  /** Scale the img inside the circle (e.g. 0.92 = slightly less zoomed cover crop). */
  imageScale = 1,
}) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(logoRef.current, {
          rotation: 360,
          duration: 14,
          ease: 'none',
          repeat: -1,
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const imageClassName =
    fit === 'contain'
      ? 'h-[70%] w-[70%] select-none object-contain'
      : 'h-full w-full select-none object-cover';

  return (
    <div
      ref={containerRef}
      className={`group relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      tabIndex={0}
      aria-label={clientLabel}
    >
      <div
        ref={logoRef}
        className={`flex h-full w-full cursor-default items-center justify-center overflow-hidden rounded-full ${badgeClassName}`}
        style={{ willChange: 'transform' }}
      >
        <img
          src={`${process.env.PUBLIC_URL}${src}`}
          alt=""
          draggable={false}
          className={imageClassName}
          style={
            imageScale !== 1
              ? { transform: `scale(${imageScale})` }
              : undefined
          }
        />
      </div>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap text-sm font-normal text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        {clientLabel}
      </span>
    </div>
  );
};

export default RotatingClientLogo;

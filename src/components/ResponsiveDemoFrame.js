import React, { useLayoutEffect, useRef, useState } from 'react';
import './ResponsiveDemoFrame.css';

// Most case-study demo components render a fixed-feeling "desktop window"
// whose root uses `width: 100%; max-width: Npx`. On a narrow mobile viewport
// that 100% just shrinks the window down to mobile width while its internal
// layout stays desktop-shaped, producing a tall, squashed mockup.
//
// This wrapper instead measures the demo's true natural (desktop) size —
// by forcing it to render at a generous width first — then scales the whole
// thing down uniformly with a CSS transform, so on mobile it appears as a
// small, proportionate version of the desktop screen instead of a reflowed
// one.
const FORCE_WIDTH = 1000;

const ResponsiveDemoFrame = ({ children }) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const [naturalSize, setNaturalSize] = useState(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    const target = inner && inner.firstElementChild;
    if (!target) return undefined;

    const measure = () => {
      const w = target.offsetWidth;
      const h = target.offsetHeight;
      if (w > 0 && h > 0) setNaturalSize({ w, h });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    return () => observer.disconnect();
  }, [children]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !naturalSize) return undefined;

    const measureScale = () => {
      const wrapWidth = wrap.getBoundingClientRect().width;
      if (wrapWidth > 0) setScale(Math.min(1, wrapWidth / naturalSize.w));
    };

    measureScale();
    const observer = new ResizeObserver(measureScale);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [naturalSize]);

  return (
    <div
      ref={wrapRef}
      className="responsive-demo-frame"
      style={naturalSize && scale < 1 ? { height: naturalSize.h * scale } : undefined}
    >
      <div
        ref={innerRef}
        className="responsive-demo-frame__inner"
        style={{
          width: FORCE_WIDTH,
          transform: scale < 1 ? `scale(${scale})` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResponsiveDemoFrame;

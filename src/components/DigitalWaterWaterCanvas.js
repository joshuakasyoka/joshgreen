import React, { useEffect, useRef } from 'react';

const DigitalWaterWaterCanvas = ({ running, className = '' }) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (time) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      if (running) {
        if (time % 900 < 16) {
          ripplesRef.current.push({
            x: width * (0.35 + Math.random() * 0.3),
            y: height * (0.35 + Math.random() * 0.3),
            radius: 0,
            maxRadius: 40 + Math.random() * 80,
            alpha: 0.9,
          });
        }

        ripplesRef.current = ripplesRef.current
          .map((ripple) => ({
            ...ripple,
            radius: ripple.radius + 1.4,
            alpha: ripple.alpha - 0.012,
          }))
          .filter((ripple) => ripple.alpha > 0 && ripple.radius < ripple.maxRadius);

        ripplesRef.current.forEach((ripple) => {
          const gradient = ctx.createRadialGradient(
            ripple.x,
            ripple.y,
            ripple.radius * 0.2,
            ripple.x,
            ripple.y,
            ripple.radius
          );
          gradient.addColorStop(0, `rgba(255, 80, 30, ${ripple.alpha})`);
          gradient.addColorStop(0.45, `rgba(255, 51, 0, ${ripple.alpha * 0.35})`);
          gradient.addColorStop(1, 'rgba(255, 51, 0, 0)');

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.strokeStyle = 'rgba(255, 51, 0, 0.12)';
        ctx.lineWidth = 1;
        const gridSize = 28;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else {
        ripplesRef.current = [];
        ctx.strokeStyle = 'rgba(255, 51, 0, 0.18)';
        ctx.lineWidth = 1;
        ctx.strokeRect(width * 0.2, height * 0.25, width * 0.6, height * 0.5);
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    frameRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [running]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default DigitalWaterWaterCanvas;

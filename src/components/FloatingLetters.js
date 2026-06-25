import React from 'react';
import './FloatingLetters.css';

const FloatingLetters = ({ text, className = '' }) => (
  <span className={['floating-letters', className].filter(Boolean).join(' ')} aria-hidden="true">
    {[...text].map((char, index) => (
      <span
        key={`${char}-${index}`}
        className="floating-letters__char"
        style={{
          '--i': index,
          '--float': (index % 3) + 2,
        }}
      >
        {char === ' ' ? '\u00a0' : char}
      </span>
    ))}
  </span>
);

export default FloatingLetters;

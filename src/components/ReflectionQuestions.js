import React, { useEffect, useRef, useState } from 'react';
import './ReflectionQuestions.css';

export default function ReflectionQuestions({ questions, className = '' }) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!questions?.length) return null;

  return (
    <ol
      ref={containerRef}
      className={`reflection-questions ${visible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {questions.map((question, index) => (
        <li
          key={question}
          className="reflection-questions__item"
          style={{ '--question-delay': `${index * 180}ms` }}
        >
          <span className="reflection-questions__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="reflection-questions__text">{question}</span>
        </li>
      ))}
    </ol>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import './DoodlerEditDoodleDemo.css';

const TILE_ITEMS = [
  {
    chip: 'Goed met taal',
    description: 'Je kunt goed praten en denkt graag diep na over dingen.',
    editedDescription: 'Je vindt het makkelijk om je gedachten onder woorden te brengen en verhalen te vertellen.',
  },
  { chip: 'Blijven proberen', description: 'Je wilt je taken graag goed uitvoeren.' },
  { chip: 'Makkelijk praten met anderen', description: 'Je kunt makkelijk contact maken met nieuwe mensen.' },
  { chip: 'Goede band met zus', description: 'Met je zus deel je vaak hoe het met je gaat.' },
];

const IMAGE_PROMPT = 'Een kind dat een boek voorleest aan klasgenoten';

const STEPS = [
  { mode: 'overview', target: 'edit-card-0', duration: 1800 },
  { mode: 'editing', target: 'description', duration: 1400 },
  { mode: 'typing-desc', target: 'description', duration: 2200 },
  { mode: 'prompt', target: 'image-prompt', duration: 1800 },
  { mode: 'prompt', target: 'generate', duration: 1200 },
  { mode: 'generating', target: 'generate', duration: 2000 },
  { mode: 'generated', target: 'display-tile-0', duration: 2200 },
  { mode: 'save', target: 'save', duration: 1200 },
  { mode: 'saved', target: 'edit-card-0', duration: 2400 },
  { mode: 'idle', duration: 1000 },
];

const ArrowUpIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M5 2v6M2.5 5.5L5 3l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TileIllustration = () => (
  <svg className="doodler-edit-doodle-demo__tile-art" viewBox="0 0 120 72" fill="none" aria-hidden="true">
    <rect width="120" height="72" rx="8" fill="#FFF6CC" />
    <rect x="38" y="18" width="44" height="34" rx="4" fill="#F5D0A8" stroke="#E8B88A" strokeWidth="1.5" />
    <path d="M44 24h28M44 30h22M44 36h26" stroke="#C9956E" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="30" cy="40" r="10" fill="#FFD4A8" stroke="#E8B88A" strokeWidth="1.2" />
    <path d="M24 52c2-6 12-6 14 0" stroke="#C9956E" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="88" cy="42" r="7" fill="#FFD4A8" stroke="#E8B88A" strokeWidth="1.2" />
    <circle cx="96" cy="38" r="5" fill="#FFD4A8" stroke="#E8B88A" strokeWidth="1.2" />
  </svg>
);

const DoodlerEditDoodleDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const isEditing = ['editing', 'typing-desc', 'prompt', 'generating', 'generated', 'save'].includes(step.mode);
  const isSaved = step.mode === 'saved' || step.mode === 'idle';
  const showEditedCopy = ['typing-desc', 'prompt', 'generating', 'generated', 'save', 'saved', 'idle'].includes(step.mode);
  const showImagePrompt = ['prompt', 'generating', 'generated', 'save'].includes(step.mode);
  const isGenerating = step.mode === 'generating';
  const tileHasImage = ['generated', 'save', 'saved', 'idle'].includes(step.mode);

  const tileDescription = (index) => {
    if (index !== 0) return TILE_ITEMS[index].description;
    if (showEditedCopy || isSaved) return TILE_ITEMS[0].editedDescription;
    return TILE_ITEMS[0].description;
  };

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;

    const updateCursor = () => {
      const container = containerRef.current;
      if (!container || !step.target) {
        setCursor((prev) => ({ ...prev, visible: step.mode !== 'idle' }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target) {
        setCursor((prev) => ({ ...prev, visible: step.mode !== 'idle' }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setCursor({
        x: targetRect.left - containerRect.left + targetRect.width * 0.55,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: step.mode !== 'idle',
      });
    };

    updateCursor();
    window.addEventListener('resize', updateCursor);
    return () => window.removeEventListener('resize', updateCursor);
  }, [step, running]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  const renderEditCard = (index) => {
    if (index === 0 && isEditing) {
      const descValue = showEditedCopy ? TILE_ITEMS[0].editedDescription : TILE_ITEMS[0].description;
      return (
        <div
          className="doodler-edit-doodle-demo__edit-panel"
          ref={setTargetRef('edit-card-0')}
        >
          <input
            type="text"
            className="doodler-edit-doodle-demo__edit-input doodler-edit-doodle-demo__edit-input--header"
            value={TILE_ITEMS[0].chip}
            readOnly
            aria-label="Koptekst"
          />
          <textarea
            className={`doodler-edit-doodle-demo__edit-input doodler-edit-doodle-demo__edit-input--description ${
              step.target === 'description' ? 'is-focused' : ''
            }`}
            value={descValue}
            readOnly
            rows={3}
            ref={setTargetRef('description')}
            aria-label="Beschrijving"
          />
          <div className="doodler-edit-doodle-demo__prompt-row">
            <input
              type="text"
              className={`doodler-edit-doodle-demo__edit-input doodler-edit-doodle-demo__edit-input--prompt ${
                step.target === 'image-prompt' ? 'is-focused' : ''
              }`}
              value={showImagePrompt ? IMAGE_PROMPT : ''}
              readOnly
              placeholder="Typ elke wijziging die je in de afbeelding wilt"
              ref={setTargetRef('image-prompt')}
              aria-label="Afbeelding prompt"
            />
            <button
              type="button"
              className={`doodler-edit-doodle-demo__generate-btn ${
                isGenerating ? 'is-loading' : ''
              } ${step.target === 'generate' ? 'is-highlighted' : ''}`}
              ref={setTargetRef('generate')}
              aria-label="Genereer afbeelding"
            >
              {isGenerating ? <span className="doodler-edit-doodle-demo__spinner" /> : <ArrowUpIcon />}
            </button>
          </div>
          <div className="doodler-edit-doodle-demo__edit-actions">
            <button type="button" className="doodler-edit-doodle-demo__btn doodler-edit-doodle-demo__btn--outline">
              Annuleren
            </button>
            <button
              type="button"
              className={`doodler-edit-doodle-demo__btn doodler-edit-doodle-demo__btn--primary ${
                step.target === 'save' ? 'is-highlighted' : ''
              }`}
              ref={setTargetRef('save')}
            >
              Opslaan
            </button>
          </div>
        </div>
      );
    }

    const item = TILE_ITEMS[index];
    const description = index === 0 ? tileDescription(0) : item.description;
    const isHighlighted = step.target === `edit-card-${index}`;

    return (
      <div
        key={item.chip}
        className={`doodler-edit-doodle-demo__edit-card ${isHighlighted ? 'is-highlighted' : ''}`}
        ref={index === 0 ? setTargetRef('edit-card-0') : undefined}
      >
        <span className="doodler-edit-doodle-demo__edit-chip">{item.chip}</span>
        <p>{description}</p>
      </div>
    );
  };

  return (
    <div className={`doodler-edit-doodle-demo ${className}`.trim()} style={style}>
      <div className="doodler-edit-doodle-demo__window" ref={containerRef}>
        <div className="doodler-edit-doodle-demo__browser-bar">
          <span className="doodler-edit-doodle-demo__dot doodler-edit-doodle-demo__dot--red" />
          <span className="doodler-edit-doodle-demo__dot doodler-edit-doodle-demo__dot--yellow" />
          <span className="doodler-edit-doodle-demo__dot doodler-edit-doodle-demo__dot--green" />
          <span className="doodler-edit-doodle-demo__url">doodler.app/krachten</span>
        </div>

        <div className="doodler-edit-doodle-demo__content">
          <div className="doodler-edit-doodle-demo__header">
            <span className="doodler-edit-doodle-demo__back">← doodler</span>
          </div>

          <div className="doodler-edit-doodle-demo__screen">
            <div className="doodler-edit-doodle-demo__copy">
              <h3>Krachten</h3>
              <p>Dit zijn de krachten die je bij je cliënt ziet.</p>
            </div>

            <div className="doodler-edit-doodle-demo__layout">
              <div className="doodler-edit-doodle-demo__display-panel">
                <div className="doodler-edit-doodle-demo__display-caption">Dit gaat er goed...</div>
                <div className="doodler-edit-doodle-demo__display-grid">
                  {TILE_ITEMS.map((item, index) => (
                    <div
                      key={item.chip}
                      className={`doodler-edit-doodle-demo__display-tile ${
                        index === 0 && (isEditing || tileHasImage) ? 'is-active' : ''
                      }`}
                      ref={index === 0 ? setTargetRef('display-tile-0') : undefined}
                    >
                      <div
                        className={`doodler-edit-doodle-demo__display-art ${
                          index === 0 && tileHasImage ? 'has-image' : ''
                        } ${index === 0 && isGenerating ? 'is-refreshing' : ''}`}
                      >
                        {index === 0 && tileHasImage ? <TileIllustration /> : null}
                      </div>
                      <strong>{item.chip}</strong>
                      <p>{tileDescription(index)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="doodler-edit-doodle-demo__edit-cards">
                {TILE_ITEMS.map((_, index) => renderEditCard(index))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`doodler-edit-doodle-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          aria-hidden="true"
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path
              d="M1 1l5.2 16.2L8.5 12 14 10.5 1 1z"
              fill="#111"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DoodlerEditDoodleDemo;

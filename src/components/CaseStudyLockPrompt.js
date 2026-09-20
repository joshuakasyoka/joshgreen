import React, { useEffect, useRef, useState } from 'react';
import { Lock } from 'lucide-react';
import { tryUnlock } from '../utils/caseStudyLock';
import './CaseStudyLockPrompt.css';

// Passphrase prompt for a private case study. `onUnlocked` runs once the
// passphrase matches; `onCancel` (when given) closes the prompt.
// Inline unlock: the sidebar row becomes a passphrase field. Enter submits,
// Escape cancels, and clicking away closes it.
export const CaseStudyLockRow = ({ projectId, onUnlocked, onCancel }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const check = async () => {
    if (!value) return;
    const ok = await tryUnlock(projectId, value);
    if (ok) {
      onUnlocked();
      return;
    }
    setError(true);
    setValue('');
  };

  return (
    <div className={`case-lock-row ${error ? 'is-error' : ''}`.trim()} onClick={(event) => event.stopPropagation()}>
      <input
        ref={inputRef}
        type="password"
        name="case-study-passphrase"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="case-lock-row__input"
        placeholder={error ? 'Try again' : 'Passphrase'}
        value={value}
        aria-label="Passphrase"
        onChange={(event) => {
          setValue(event.target.value);
          setError(false);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            check();
          }
          if (event.key === 'Escape') onCancel();
        }}
        onBlur={onCancel}
      />
    </div>
  );
};

const CaseStudyLockPrompt = ({ projectId, title, onUnlocked, onCancel }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!onCancel) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const submit = async (event) => {
    event.preventDefault();
    if (checking) return;
    setChecking(true);
    const ok = await tryUnlock(projectId, value);
    setChecking(false);
    if (ok) {
      onUnlocked();
      return;
    }
    setError(true);
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className="case-lock">
      <span className="case-lock__icon">
        <Lock size={18} strokeWidth={1.8} />
      </span>
      <h3 className="case-lock__title">{title} is private</h3>
      <p className="case-lock__body">This case study covers internal research. Enter the passphrase to read it.</p>
      <form className="case-lock__form" onSubmit={submit}>
        <input
          ref={inputRef}
          type="password"
          className={`case-lock__input ${error ? 'is-error' : ''}`.trim()}
          placeholder="Passphrase"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          aria-label="Passphrase"
        />
        <button type="submit" className="case-lock__btn" disabled={!value || checking}>
          Unlock
        </button>
      </form>
      {error && <p className="case-lock__error">That passphrase did not match.</p>}
      {onCancel && (
        <button type="button" className="case-lock__cancel" onClick={onCancel}>
          Back
        </button>
      )}
    </div>
  );
};

export default CaseStudyLockPrompt;

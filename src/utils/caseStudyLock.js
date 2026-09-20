// Private case studies: a passphrase gate for work that should not be read
// by every visitor.
//
// This is a courtesy lock, not security. The case study's text ships inside
// the site's JavaScript, so anyone who looks at the bundle can read it
// without the passphrase. Keep genuinely confidential material off the
// public site, or behind a server that checks the password before sending
// the content. The passphrase is stored as a SHA-256 hash so it is at least
// not sitting in the source in plain text.

const LOCKED = {
  // project id -> sha256 of the passphrase
  10: 'd00fa81f85677cd527084fdd3727e50356d523c5616c0acc75c0fb040cbfa63a',
  19: 'd00fa81f85677cd527084fdd3727e50356d523c5616c0acc75c0fb040cbfa63a',
  20: 'd00fa81f85677cd527084fdd3727e50356d523c5616c0acc75c0fb040cbfa63a',
  21: 'd00fa81f85677cd527084fdd3727e50356d523c5616c0acc75c0fb040cbfa63a',
};

const SLUG_IDS = {
  emma: 10,
  artefacts: 19,
  'win-room': 20,
  'monthly-project-review': 21,
};

const STORAGE_KEY = 'case-study-unlocked';

export const isLocked = (projectId) => Boolean(LOCKED[projectId]);
export const lockedSlugId = (slug) => SLUG_IDS[slug];

const readUnlocked = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const isUnlocked = (projectId) => !isLocked(projectId) || readUnlocked().includes(projectId);

const sha256 = async (text) => {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

// Returns true and remembers the unlock for this browser session.
export const tryUnlock = async (projectId, passphrase) => {
  const expected = LOCKED[projectId];
  if (!expected) return true;
  let hash;
  try {
    hash = await sha256(passphrase);
  } catch {
    return false;
  }
  if (hash !== expected) return false;
  try {
    const next = Array.from(new Set([...readUnlocked(), projectId]));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* session storage unavailable; unlock lasts for this page view */
  }
  return true;
};

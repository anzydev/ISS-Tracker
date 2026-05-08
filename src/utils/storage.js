/**
 * localStorage wrapper with TTL (time-to-live) support.
 */

export function setWithExpiry(key, value, ttlMs) {
  const item = {
    value,
    expiry: Date.now() + ttlMs,
  };
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.warn('localStorage setItem failed:', e);
  }
}

export function getWithExpiry(key) {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    console.warn('localStorage getItem failed:', e);
    return null;
  }
}

export function getItem(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage setItem failed:', e);
  }
}

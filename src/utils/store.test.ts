import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getCredentials, setCredentials, clearCredentials, isBlankValue } from './store.ts';

beforeEach(() => {
  localStorage.clear();
});

describe('store', () => {
  it('returns nulls when empty', () => {
    expect(getCredentials()).toEqual({ idInstance: null, apiTokenInstance: null });
  });

  it('round-trips credentials', () => {
    setCredentials({ idInstance: 'id1', apiTokenInstance: 'token1' });
    expect(getCredentials()).toEqual({ idInstance: 'id1', apiTokenInstance: 'token1' });
  });

  it('clearCredentials removes both', () => {
    setCredentials({ idInstance: 'id1', apiTokenInstance: 'token1' });
    clearCredentials();
    expect(getCredentials()).toEqual({ idInstance: null, apiTokenInstance: null });
  });

  it('does not throw on storage errors', () => {
    const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    expect(() => setCredentials({ idInstance: 'a', apiTokenInstance: 'b' })).not.toThrow();
    setSpy.mockRestore();

    const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(getCredentials()).toEqual({ idInstance: null, apiTokenInstance: null });
    getSpy.mockRestore();
  });

  it('isBlankValue works', () => {
    expect(isBlankValue('')).toBe(true);
    expect(isBlankValue('  ')).toBe(true);
    expect(isBlankValue(null)).toBe(true);
    expect(isBlankValue('x')).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import isBlank from './isBlank.ts';

describe('isBlank', () => {
  it('returns true for empty/whitespace/null/undefined', () => {
    expect(isBlank('')).toBe(true);
    expect(isBlank('   ')).toBe(true);
    expect(isBlank(null)).toBe(true);
    expect(isBlank(undefined)).toBe(true);
  });

  it('returns false for non-blank strings', () => {
    expect(isBlank('a')).toBe(false);
    expect(isBlank('  x  ')).toBe(false);
  });
});

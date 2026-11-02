import { describe, it, expect } from 'vitest';
import { formatDate } from './getDate.ts';

describe('formatDate', () => {
  it('formats millisecond timestamps', () => {
    const ms = new Date('2024-01-02T03:04:05').getTime();
    expect(formatDate(ms)).toBe(new Date(ms).toLocaleString());
  });

  it('converts second timestamps to ms', () => {
    const sec = 1700000000;
    const ms = sec * 1000;
    expect(formatDate(sec)).toBe(new Date(ms).toLocaleString());
  });

  it('handles epoch', () => {
    expect(formatDate(0)).toBe(new Date(0).toLocaleString());
  });
});

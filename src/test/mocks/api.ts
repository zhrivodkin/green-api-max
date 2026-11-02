import { vi } from 'vitest';

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const apiMock = {
  getAccountSettings: vi.fn(),
  getAccountSettingsCached: vi.fn(),
  checkAccount: vi.fn(),
  getContactInfo: vi.fn(),
  sendMessage: vi.fn(),
  getChatHistory: vi.fn(),
};

vi.mock('../../api/client', () => ({
  api: apiMock,
  ApiError,
  getAccountSettingsCached: vi.fn(() => apiMock.getAccountSettings()),
}));

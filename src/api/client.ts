import type {
  AccountSettingsResponse,
  CheckAccountDTO,
  CheckAccountResponse,
  DeleteNotificationResponse,
  GetChatHistoryDTO,
  GetChatHistoryResponse,
  GetContactInfoResponse,
  GetContactInfoTDO,
  GetMessageDTO,
  GetMessageResponse,
  ReceiveNotificationResponse,
  SendMessageDTO,
  SendMessageResponse,
} from '@api/types.ts';
import { getCredentials } from '@utils/store.ts';

const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

if (!BASE) {
  throw new Error('VITE_API_URL is not defined');
}

const TIMEOUT_MS = 15000;

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const json = (body: unknown): RequestInit => ({
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const request = async <T>(
  resource: string,
  init: RequestInit,
  postfix: string = '',
): Promise<T> => {
  const { idInstance, apiTokenInstance } = getCredentials();
  if (!idInstance || !apiTokenInstance) {
    throw new ApiError('Отсутствуют учетные данные', 401);
  }
  const url = `${BASE}/waInstance${idInstance}/${resource}/${apiTokenInstance}${postfix}`;

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    const text = await response.text();
    let result: unknown = null;
    if (text) {
      try {
        result = JSON.parse(text);
      } catch {
        result = text;
      }
    }
    if (!response.ok) {
      const message =
        (result && typeof result === 'object' && 'message' in result && typeof (result as { message: unknown }).message === 'string'
          ? (result as { message: string }).message
          : null) ||
        (result && typeof result === 'object' && 'error' in result && typeof (result as { error: unknown }).error === 'string'
          ? (result as { error: string }).error
          : null) ||
        `HTTP ${response.status}`;
      throw new ApiError(message, response.status);
    }
    return result as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Превышено время ожидания запроса', 408);
    }
    throw new ApiError(error instanceof Error ? error.message : 'Сетевая ошибка');
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const get = async <T>(resource: string): Promise<T> => request<T>(resource, { method: 'GET' });

const post = async <T, K>(resource: string, body: T): Promise<K> =>
  request<K>(resource, { method: 'POST', ...json(body) });

const del = async <T>(resource: string, postfix: string): Promise<T> =>
  request<T>(resource, { method: 'DELETE' }, postfix);

export const api = {
  getAccountSettings: () => get<AccountSettingsResponse>('getAccountSettings'),
  checkAccount: (body: CheckAccountDTO) => post<CheckAccountDTO, CheckAccountResponse>('checkAccount', body),
  getContactInfo: (body: GetContactInfoTDO) => post<GetContactInfoTDO, GetContactInfoResponse>('getContactInfo', body),
  sendMessage: (body: SendMessageDTO) => post<SendMessageDTO, SendMessageResponse>('sendMessage', body),
  receiveNotification: () => get<ReceiveNotificationResponse>('receiveNotification'),
  deleteNotification: (receiptId: string) => del<DeleteNotificationResponse>('deleteNotification', `/${receiptId}`),
  getMessage: (body: GetMessageDTO) => post<GetMessageDTO, GetMessageResponse>('getMessage', body),
  getChatHistory: (body: GetChatHistoryDTO) => post<GetChatHistoryDTO, GetChatHistoryResponse[]>('getChatHistory', body),
};

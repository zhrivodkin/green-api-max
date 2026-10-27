import type {
  AccountSettingsResponse,
  CheckAccountDTO,
  CheckAccountResponse, DeleteNotificationResponse, GetChatHistoryDTO, GetChatHistoryResponse,
  GetContactInfoResponse,
  GetContactInfoTDO, GetMessageDTO, GetMessageResponse,
  ReceiveNotificationResponse,
  SendMessageDTO,
  SendMessageResponse
} from "./types.ts";
import {getCredentials} from "../utils/store.ts";

const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

const json = (body: unknown): RequestInit => ({
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const request = async <T>(resource: string, body: RequestInit, postfix: string = ''): Promise<T> => {
  const { idInstance, apiTokenInstance } = getCredentials();
  const url = `${BASE}/waInstance${idInstance}/${resource}/${apiTokenInstance}${postfix}`;
  const response = await fetch(url, body);
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result as T;
}

const get = async <T>(resource: string): Promise<T> => request<T>(resource, {method: 'GET'});

const post = async <T, K>(resource: string, body: T): Promise<K> =>
  request<K>(resource, {method: 'POST', ...json(body)});

const del = async <T>(resource: string, postfix: string): Promise<T> =>
  request<T>(resource, {method: 'DELETE'}, postfix);

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

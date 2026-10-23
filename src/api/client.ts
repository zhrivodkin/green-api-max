import type {AccountSettingsResponse, SendMessageDTO, SendMessageResponse} from "./types.ts";
import {getCredentials} from "../utils/store.ts";

const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
//
// export class ApiError extends Error {
//   status: number;
//   body?: { error?: string; cardsCount?: number; maxSize?: number };
//   constructor(status: number, body?: { error?: string; cardsCount?: number; maxSize?: number }) {
//     super(body?.error ?? `HTTP ${status}`);
//     this.status = status;
//     this.body = body;
//   }
// }

async function request<T>(resource: string, body?: RequestInit): Promise<T> {
  const { idInstance, apiTokenInstance } = getCredentials();
  const url = `${BASE}/waInstance${idInstance}/${resource}/${apiTokenInstance}`;
  const response = await fetch(url, body);
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result as T;
}

const json = (body: unknown): RequestInit => ({
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const api = {
  getAccountSettings: () => request<AccountSettingsResponse>('getAccountSettings'),
  sendMessage: (body: SendMessageDTO) => request<SendMessageResponse>('sendMessage', { ...json(body) }),


  // login: (password: string) => request<{ ok: true }>('/auth/login', { method: 'POST', ...json({ password }) }),
  // logout: () => request<{ ok: true }>('/auth/logout', { method: 'POST' }),
  //
  // listThemes: () => request<Theme[]>('/themes'),
  // createTheme: (name: string, color: string) =>
  //   request<Theme>('/themes', { method: 'POST', ...json({ name, color }) }),
  // updateTheme: (id: string, patch: { name?: string; color?: string }) =>
  //   request<Theme>(`/themes/${id}`, { method: 'PATCH', ...json(patch) }),
  // deleteTheme: (id: string) => request<{ ok: true }>(`/themes/${id}`, { method: 'DELETE' }),
  //
  // listCards: (statuses: string[], themeId?: string) => {
  //   const params = new URLSearchParams({ status: statuses.join(',') });
  //   if (themeId) params.set('theme', themeId);
  //   return request<CardListItem[]>(`/cards?${params}`);
  // },
  // getCard: (id: string) => request<CardDetail>(`/cards/${id}`),
  // createCard: (input: CardCreateInput) => request<CardDetail>('/cards', { method: 'POST', ...json(input) }),
  // patchCard: (id: string, patch: CardPatchInput) =>
  //   request<CardDetail>(`/cards/${id}`, { method: 'PATCH', ...json(patch) }),
  // deleteCard: (id: string) => request<{ ok: true }>(`/cards/${id}`, { method: 'DELETE' }),
  // reorderCards: (ids: string[]) => request<{ ok: true }>('/cards/reorder', { method: 'POST', ...json({ ids }) }),
  // searchCards: (q: string, exclude?: string) => {
  //   const params = new URLSearchParams({ q });
  //   if (exclude) params.set('exclude', exclude);
  //   return request<CardSearchItem[]>(`/cards/search?${params}`);
  // },
  //
  // addChecklistItem: (cardId: string, text: string) =>
  //   request<ChecklistItem>(`/cards/${cardId}/checklist`, { method: 'POST', ...json({ text }) }),
  // patchChecklistItem: (itemId: string, patch: { text?: string; done?: boolean }) =>
  //   request<ChecklistItem>(`/checklist/${itemId}`, { method: 'PATCH', ...json(patch) }),
  // deleteChecklistItem: (itemId: string) =>
  //   request<{ ok: true }>(`/checklist/${itemId}`, { method: 'DELETE' }),
  //
  // addLink: (cardId: string, url: string, title?: string) =>
  //   request<CardLink>(`/cards/${cardId}/links`, { method: 'POST', ...json({ url, title }) }),
  // deleteLink: (id: string) => request<{ ok: true }>(`/links/${id}`, { method: 'DELETE' }),
  //
  // addRelation: (cardId: string, relatedCardId: string) =>
  //   request<RelatedCard>(`/cards/${cardId}/relations`, { method: 'POST', ...json({ relatedCardId }) }),
  // deleteRelation: (id: string) => request<{ ok: true }>(`/relations/${id}`, { method: 'DELETE' }),
  //
  // uploadAttachment: (cardId: string, file: File) => {
  //   const form = new FormData();
  //   form.append('file', file);
  //   return request<Attachment>(`/cards/${cardId}/attachments`, { method: 'POST', body: form });
  // },
  // deleteAttachment: (id: string) => request<{ ok: true }>(`/attachments/${id}`, { method: 'DELETE' }),
  // attachmentUrl: (id: string) => `${BASE}/api/attachments/${id}`,
};

// export function formatSize(bytes: number): string {
//   if (bytes < 1024) return `${bytes} Б`;
//   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
//   return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
// }

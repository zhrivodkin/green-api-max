const idInstanceKey = 'idInstance';
const apiTokenInstanceKey = 'apiTokenInstance';

interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

export const getCredentials = (): { idInstance: string | null; apiTokenInstance: string | null } => {
  try {
    return {
      idInstance: localStorage.getItem(idInstanceKey),
      apiTokenInstance: localStorage.getItem(apiTokenInstanceKey),
    };
  } catch {
    return { idInstance: null, apiTokenInstance: null };
  }
};

export const setCredentials = ({ idInstance, apiTokenInstance }: Credentials) => {
  try {
    localStorage.setItem(idInstanceKey, idInstance);
    localStorage.setItem(apiTokenInstanceKey, apiTokenInstance);
  } catch {
    // ignore storage errors (private mode, quota)
  }
};

export const clearCredentials = () => {
  try {
    localStorage.removeItem(idInstanceKey);
    localStorage.removeItem(apiTokenInstanceKey);
  } catch {
    // ignore
  }
};

export const isBlankValue = (value: string | null | undefined): boolean =>
  !value || value.trim().length === 0;

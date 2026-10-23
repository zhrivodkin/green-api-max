const idInstanceKey = 'idInstance';
const apiTokenInstanceKey = 'apiTokenInstance';

// TODO: trim, sanitize, etc
//  Clear creds + addressee

interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

export const getCredentials = () => {
  const idInstance = localStorage.getItem(idInstanceKey);
  const apiTokenInstance = localStorage.getItem(apiTokenInstanceKey);

  return { idInstance, apiTokenInstance };
}

export const setCredentials = ({idInstance, apiTokenInstance}: Credentials) => {
  localStorage.setItem(idInstanceKey, idInstance);
  localStorage.setItem(apiTokenInstanceKey, apiTokenInstance);
};

export const clearCredentials = () => {
  localStorage.removeItem(idInstanceKey);
  localStorage.removeItem(apiTokenInstanceKey);
};


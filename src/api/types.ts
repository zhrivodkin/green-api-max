export type AccountSettingsResponse = {
  avatar: string;
  phone: string;
  stateInstance: string;
  chatId: string;
  logoutProcess: boolean;
  historySyncProgress: number;
};

export type SendMessageDTO = {
  chatId: string;
  message: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type CheckAccountDTO = {
  phoneNumber: string;
};

export type CheckAccountResponse = {
  exist: boolean;
  chatId: string;
};

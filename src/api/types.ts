export type AccountSettingsResponse = {
  avatar: string;
  phone: string;
  stateInstance: string;
  chatId: string;
  logoutProcess: boolean;
  historySyncProgress: number;
};

export type CheckAccountDTO = {
  phoneNumber: string;
};

export type CheckAccountResponse = {
  exist: boolean;
  chatId: string;
};

export type GetContactInfoTDO = {
  chatId: string;
};

export type GetContactInfoResponse = {
  avatar: string;
  name: string;
  contactName: string;
  chatId: string;
  chatType: string;
  lastSeen: number;
  phoneNumber: number;
  phoneNumberTimestamp: number;
};

export type SendMessageDTO = {
  chatId: string;
  message: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

type APINotification = {
  timestamp: number;
  senderData: {
    chatId: string;
    chatName: string;
    chatType: string;
    sender: string;
    senderName: string;
    senderType: string;
    senderContactName: string;
    senderPhoneNumber: number;
  };
  messageData: {
    typeMessage: 'textMessage';
    textMessageData: {
      textMessage: string;
    };
  };
};

export type ReceiveNotificationResponse = {
  receiptId: string;
  body: APINotification;
};

export type DeleteNotificationResponse = {
  result: boolean;
  reason: string;
};

export type GetMessageDTO = {
  chatId: string;
  idMessage: string;
};

export type GetMessageResponse = {
  type: string;
  idMessage: string;
  timestamp: number;
  typeMessage: string;
  chatId: string;
  textMessage: string;
  senderId: string;
  senderName: string;
  senderContactName: string;
  deletedMessageId: string;
  editedMessageId: string;
  isEdited: boolean;
  isDeleted: boolean;
};

export type GetChatHistoryDTO = {
  chatId: string;
  count?: number;
}

export type GetChatHistoryResponse = {
  type: 'incoming' | 'outgoing';
  idMessage: string;
  timestamp: number;
  typeMessage: 'textMessage' | 'extendedTextMessage';
  chatId: string;
  textMessage: string;
  statusMessage: string;
  sendByApi: boolean;
  deletedMessageId: string;
  editedMessageId: string;
  isEdited: boolean;
  isDeleted: boolean;
};

export type TUserInfo = GetContactInfoResponse;

export type TMessage = GetChatHistoryResponse;

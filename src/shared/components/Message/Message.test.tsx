import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Message from './Message.tsx';
import type { TMessage, TUserInfo } from '../../../api/types.ts';

const msg = (type: 'incoming' | 'outgoing'): TMessage => ({
  type,
  timestamp: 1700000000000,
  textMessage: 'Привет',
  idMessage: 'm1',
  chatId: 'c1',
  typeMessage: 'textMessage',
  statusMessage: 'sent',
  sendByApi: false,
  deletedMessageId: '',
  editedMessageId: '',
  isEdited: false,
  isDeleted: false,
});

const user: TUserInfo = {
  avatar: '',
  name: 'Иван',
  contactName: 'Иван',
  chatId: 'c1',
  chatType: 'user',
  lastSeen: 1700000000000,
  phoneNumber: '7999',
  phoneNumberTimestamp: 0,
};

describe('Message', () => {
  it('shows contact name for incoming', () => {
    render(<Message message={msg('incoming')} user={user} />);
    expect(screen.getByText('Иван')).toBeInTheDocument();
    expect(screen.getByText('Привет')).toBeInTheDocument();
  });

  it('shows Вы for outgoing', () => {
    render(<Message message={msg('outgoing')} user={user} />);
    expect(screen.getByText('Вы')).toBeInTheDocument();
  });

  it('shows placeholder name when user missing', () => {
    render(<Message message={msg('incoming')} />);
    expect(screen.getByText('Собеседник')).toBeInTheDocument();
  });
});

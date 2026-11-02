import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatContent from './ChatContent.tsx';
import type { TMessage } from '../../../api/types.ts';

const mk = (id: string): TMessage => ({
  type: 'incoming',
  timestamp: 1700000000000,
  textMessage: `msg ${id}`,
  idMessage: id,
  chatId: 'c1',
  typeMessage: 'textMessage',
  statusMessage: 'sent',
  sendByApi: false,
  deletedMessageId: '',
  editedMessageId: '',
  isEdited: false,
  isDeleted: false,
});

describe('ChatContent', () => {
  it('renders a Message per item', () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(<ChatContent messages={[mk('a'), mk('b')]} />);
    expect(screen.getByText('msg a')).toBeInTheDocument();
    expect(screen.getByText('msg b')).toBeInTheDocument();
  });
});

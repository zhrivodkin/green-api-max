import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import '../../../test/mocks/api';
import { apiMock } from '../../../test/mocks/api';
import CheckAccountModal from './CheckAccountModal.tsx';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

beforeEach(() => {
  vi.clearAllMocks();
  mockNavigate.mockClear();
});

describe('CheckAccountModal', () => {
  it('closes on Escape', async () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <CheckAccountModal onClose={onClose} />
      </MemoryRouter>,
    );
    // dispatch escape
    // eslint-disable-next-line testing-library/no-node-access
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on backdrop click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <CheckAccountModal onClose={onClose} />
      </MemoryRouter>,
    );
    const backdrop = screen.getByRole('dialog');
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('validates phone number', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CheckAccountModal onClose={vi.fn()} />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText('Номер телефона'), '123');
    await user.click(screen.getByRole('button', { name: 'Найти в MAX' }));
    expect(screen.getByText('Введите корректный номер телефона')).toBeInTheDocument();
    expect(apiMock.checkAccount).not.toHaveBeenCalled();
  });

  it('shows not registered message', async () => {
    const user = userEvent.setup();
    apiMock.checkAccount.mockResolvedValue({ exist: false, chatId: '' });
    render(
      <MemoryRouter>
        <CheckAccountModal onClose={vi.fn()} />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText('Номер телефона'), '89991234567');
    await user.click(screen.getByRole('button', { name: 'Найти в MAX' }));
    expect(await screen.findByText('Пользователь не зарегистрирован в MAX')).toBeInTheDocument();
  });

  it('navigates on success', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    apiMock.checkAccount.mockResolvedValue({ exist: true, chatId: 'chat-1' });
    render(
      <MemoryRouter>
        <CheckAccountModal onClose={onClose} />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText('Номер телефона'), '89991234567');
    await user.click(screen.getByRole('button', { name: 'Найти в MAX' }));
    expect(onClose).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/messaging/chat-1');
  });
});

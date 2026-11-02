import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../../../test/mocks/api';
import { apiMock } from '../../../test/mocks/api';
import SendMessageForm from './SendMessageForm.tsx';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SendMessageForm', () => {
  it('disables submit when blank', () => {
    render(<SendMessageForm chatId="c1" onSuccess={vi.fn()} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sends message and clears input on success', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    apiMock.sendMessage.mockResolvedValue({ idMessage: 'm1' });
    render(<SendMessageForm chatId="c1" onSuccess={onSuccess} />);

    const input = screen.getByPlaceholderText('Введите сообщение');
    await user.type(input, 'Привет');
    await user.click(screen.getByRole('button'));

    expect(apiMock.sendMessage).toHaveBeenCalledWith({ chatId: 'c1', message: 'Привет' });
    expect(onSuccess).toHaveBeenCalled();
    expect(input).toHaveValue('');
  });

  it('keeps draft and shows error on failure', async () => {
    const user = userEvent.setup();
    const { ApiError } = await import('../../../test/mocks/api');
    apiMock.sendMessage.mockRejectedValue(new ApiError('fail'));
    render(<SendMessageForm chatId="c1" onSuccess={vi.fn()} />);

    const input = screen.getByPlaceholderText('Введите сообщение');
    await user.type(input, 'Черновик');
    await user.click(screen.getByRole('button'));

    expect(input).toHaveValue('Черновик');
    expect(screen.getByText('fail')).toBeInTheDocument();
  });
});

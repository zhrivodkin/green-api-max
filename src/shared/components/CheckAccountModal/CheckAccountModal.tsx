import * as React from "react";
import { useEffect, useRef, useState } from "react";
import isBlank from "../../../utils/isBlank.ts";
import { api, ApiError } from "../../../api/client.ts";
import routes from "../../routes.ts";
import { useNavigate } from "react-router";

type Props = {
  onClose: () => void;
};

const phoneRegex = /^(\+?7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

const CheckAccountModal = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const checkAccount = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isBlank(phoneNumber)) return;
    if (!phoneRegex.test(phoneNumber.trim())) {
      setMessage('Введите корректный номер телефона');
      return;
    }
    setMessage('');
    setIsLoading(true);
    try {
      const result = await api.checkAccount({ phoneNumber: phoneNumber.trim() });
      if (result.exist === false) {
        setMessage('Пользователь не зарегистрирован в MAX');
      } else {
        onClose();
        navigate(routes.chat(result.chatId));
      }
    } catch (error) {
      setMessage(error instanceof ApiError ? error.message : 'Ошибка проверки аккаунта');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal-wrapper"
      role="dialog"
      aria-modal="true"
      aria-labelledby="check-account-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" ref={dialogRef} tabIndex={-1}>
        <div className="modal-header">
          <h2 id="check-account-title" className="modal-title">Найти по номеру</h2>
          <button
            type="button"
            className="modal-close"
            aria-label="Закрыть"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal-content">
          <form className="simple-form" onSubmit={checkAccount}>
            <input
              type="tel"
              inputMode="tel"
              autoFocus
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Телефон (РФ или РБ)"
              className="input"
              aria-label="Номер телефона"
            />
            <button
              type="submit"
              className="button"
              disabled={isLoading}
            >
              Найти в MAX
            </button>
            <div className="simple-error">
              {message && <code>{message}</code>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckAccountModal;

import './SendMessageForm.css';
import * as React from "react";
import {useState} from "react";
import isBlank from "../../../utils/isBlank.ts";
import {api} from "../../../api/client.ts";

type Props = {
  chatId: string;
  onSuccess: () => void;
};

const SendMessageForm = ({chatId, onSuccess}: Props) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isBlank(message)) return;
    setIsLoading(true);
    try {
      await api.sendMessage({ chatId, message });
      onSuccess();
    } catch {
    // TODO
    } finally {
      setMessage('');
      setIsLoading(false);
    }
  };

  return (
    <form className="message-form" onSubmit={sendMessage}>
      <input
        type="text"
        className="message-input"
        placeholder="Введите сообщение"
        onChange={(e) => setMessage(e.target.value)}
        maxLength={4000}
        value={message}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="message-button"
        disabled={isLoading}
      >
        ➤
      </button>
    </form>
  );
};

export default SendMessageForm;

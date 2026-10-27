import * as React from "react";
import {useState} from "react";
import isBlank from "../../../utils/isBlank.ts";
import {api} from "../../../api/client.ts";
import {setAddressee} from "../../../utils/store.ts";
import routes from "../../routes.ts";
import {useNavigate} from "react-router";

type Props = {
  onClose: () => void;
};

const CheckAccountModal = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkAccount = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isBlank(phoneNumber)) return;
    setMessage('');
    setIsLoading(true);
    try {
      // TODO regexp, sanitize
      const result = await api.checkAccount({phoneNumber});
      console.log(result);
      if (result.exist === false) {
        setMessage('Пользователь не зарегистрирован в MAX');
      } else {
        setAddressee(phoneNumber);
        onClose();
          navigate(routes.chat(result.chatId));
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Найти по номеру</h2>
          <div className="modal-close" onClick={onClose}>×</div>
        </div>
        <div className="modal-content">
          <form className="simple-form" onSubmit={checkAccount}>
            <input
              type="number"
              autoFocus
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Телефон (РФ или РБ)"
              className="input"
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
}

export default CheckAccountModal;

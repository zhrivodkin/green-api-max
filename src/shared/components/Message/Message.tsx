import type {TMessage, TUserInfo} from "../../../api/types.ts";
import './Message.css';
import LastSeen from "../LastSeen/LastSeen.tsx";

type Props = {
  message: TMessage;
  user?: TUserInfo;
};

const Message = ({ message, user }: Props) => {
  const { type, timestamp, textMessage } = message;
  const senderName = type === 'incoming' ? (user?.name ?? 'Собеседник') : 'Вы';

  return (
    <div className={`message ${type}`}>
      <div className="message-header">
        <span>{senderName}</span>
        &nbsp;
        <LastSeen dateStr={timestamp} />
      </div>
      <div className="message-content">
        {textMessage}
      </div>
    </div>
  );
};

export default Message;

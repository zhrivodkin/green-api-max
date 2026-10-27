import type {TMessage, TUserInfo} from "../../../api/types.ts";
import './Message.css';
import LastSeen from "../LastSeen/LastSeen.tsx";

type Props = {
  message: TMessage;
  user?: TUserInfo;
};

const Message = ({ message, user }: Props) => {
  const { type, timestamp, textMessage } = message;
  const isAddressee = user && type === 'incoming';

  return (
    <div className={`message ${type}`}>
      <div className="message-header">
        {isAddressee ? <span>{user.name}</span> : <span>Вы</span>}
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

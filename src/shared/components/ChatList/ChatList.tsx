import Avatar from "../Avatar/Avatar.tsx";
import type {TUserInfo} from "../../../api/types.ts";
import './ChatList.css';

type Props = {
  user?: TUserInfo;
};

  const ChatList = ({ user }: Props) => {
  return (
    <div className="chat-list">
      {user && (
        <div className="chat-preview active">
          <Avatar url={user.avatar} userName={user.name} />
          <span>{user.name}</span>
        </div>
      )}
    </div>
  );
};

export default ChatList;

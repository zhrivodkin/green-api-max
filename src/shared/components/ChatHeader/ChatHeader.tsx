import Avatar from "../Avatar/Avatar.tsx";
import type {TUserInfo} from "../../../api/types.ts";
import './ChatHeader.css';
import LastSeen from "../LastSeen/LastSeen.tsx";

type Props = {
  user?: TUserInfo;
};

const ChatHeader = ({ user }: Props) => {
  return (
    <div className="chat-header">
      {user && (
        <>
          <Avatar url={user.avatar} userName={user.name} size="large" />
          <span>{user.name}</span>
          <LastSeen dateStr={user.lastSeen} />
        </>
      )}
    </div>
  );
};

export default ChatHeader;

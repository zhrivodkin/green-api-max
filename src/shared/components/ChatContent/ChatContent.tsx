import type {TMessage, TUserInfo} from "../../../api/types.ts";
import './ChatContent.css';
import Message from "../Message/Message.tsx";
import {useEffect, useRef} from "react";

type Props = {
  messages: TMessage[];
  user?: TUserInfo;
};

const ChatContent = ({ messages }: Props) => {
  const listRef = useRef(null);

  // скролл вниз при появлении сообщений
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <div className="chat-content" ref={listRef}>
      {messages.map((message: TMessage) =>
        <Message key={message.idMessage} message={message}  />
      )}
    </div>
  );
};

export default ChatContent;

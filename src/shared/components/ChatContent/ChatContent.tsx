import type {TMessage, TUserInfo} from "@api/types.ts";
import './ChatContent.css';
import Message from "@shared/components/Message/Message.tsx";
import {useEffect, useRef} from "react";

type Props = {
  messages: TMessage[];
  user?: TUserInfo;
};

const ChatContent = ({ messages, user }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  // скролл вниз при появлении сообщений
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-content" ref={listRef}>
      {messages.map((message: TMessage) =>
        <Message key={message.idMessage} message={message} user={user} />
      )}
    </div>
  );
};

export default ChatContent;

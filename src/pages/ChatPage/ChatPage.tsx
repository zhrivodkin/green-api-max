import './ChatPage.css';
import AddChatButton from "../../shared/components/AddChatButton/AddChatButton.tsx";
import {useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {api} from "../../api/client.ts";
import type {TMessage, TUserInfo} from "../../api/types.ts";
import SendMessageForm from "../../shared/components/SendMessageForm/SendMessageForm.tsx";
import ChatHeader from "../../shared/components/ChatHeader/ChatHeader.tsx";
import ChatList from "../../shared/components/ChatList/ChatList.tsx";
import ChatContent from "../../shared/components/ChatContent/ChatContent.tsx";

const availableMessageTypes = ['textMessage', 'extendedTextMessage'];

const ChatPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [user, setUser] = useState<TUserInfo>();
  const [messages, setMessages] = useState<TMessage[]>([]);

  const updateMessages = useCallback(async () => {
    const messages = await api.getChatHistory({chatId: id});
    const filteredMessages = messages
      .filter(message => availableMessageTypes.includes(message.typeMessage))
      .reverse();
    setMessages(filteredMessages);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const contactInfo = await api.getContactInfo({chatId: id});
      setUser(contactInfo);
    }
    fetchData()
      .then(updateMessages);
  }, [id, updateMessages]);

  return (
    <section className="section">
      <div className="chat-wrapper">
        <div className="chat-list-header">
          <h2>Чаты</h2>
          <AddChatButton size="small" />
        </div>
        <ChatHeader user={user} />
        <ChatList user={user} />
        <ChatContent messages={messages} />
        <div></div>
        <div className="chat-form">
          <SendMessageForm chatId={id} onSuccess={updateMessages} />
        </div>
      </div>
    </section>
  );
};

export default ChatPage;

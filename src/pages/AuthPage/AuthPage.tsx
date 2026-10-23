import { useState } from 'react'
import './AuthPage.css'
import * as React from "react";
import isBlank from "../../utils/isBlank.ts";
import {clearCredentials, setCredentials} from "../../utils/store.ts";
import {api} from "../../api/client.ts";
import routes from "../../shared/routes.ts";
import {useNavigate} from "react-router";

const AuthPage = () => {
  const navigate = useNavigate();
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    if (isBlank(idInstance) || isBlank(apiTokenInstance)) return;
    setCredentials({ idInstance, apiTokenInstance });
    try {
      await api.getAccountSettings();
      navigate(routes.messaging, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
      clearCredentials();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="section">
        <div className="hero">
          <h1>Вход в MAX</h1>
        </div>
        <form className="login-card" onSubmit={signIn}>
          <input
            type="text"
            autoFocus
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="Логин"
            className="input"
          />
          <input
            type="password"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="Пароль"
            className="input"
          />
          <button
            type="submit"
            className="button"
            disabled={isLoading}
          >
            Вход
          </button>
          <div className="login-error">
            {message && <code>{message}</code>}
          </div>
        </form>
      </section>
    </>
  )
}

export default AuthPage;

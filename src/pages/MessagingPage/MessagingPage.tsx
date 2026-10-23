import * as React from "react";
import {clearCredentials} from "../../utils/store.ts";
import routes from "../../shared/routes.ts";
import {useNavigate} from "react-router";

const MessagingPage = () => {
  const navigate = useNavigate();

  const signOut = (e: React.UIEvent) => {
    e.preventDefault();
    clearCredentials();
    navigate(routes.root, { replace: true })
  };

  return (
    <section className="section">
      <span>messaging page</span>
      <button
        className="button"
        onClick={signOut}
      >
        Выход
      </button>
    </section>
  )
};

export default MessagingPage;

import {Outlet, useNavigate} from 'react-router';
import {clearCredentials, getCredentials} from "../utils/store.ts";
import {api} from "../api/client.ts";
import isBlank from "../utils/isBlank.ts";
import routes from "../shared/routes.ts";
import {useEffect} from "react";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { idInstance, apiTokenInstance } = getCredentials();

  useEffect(() => {
    if (isBlank(idInstance) || isBlank(apiTokenInstance)) navigate(routes.auth, { replace: true });
    const fetchData = async () => {
      try {
        await api.getAccountSettings();
        navigate(routes.messaging, { replace: true });
      } catch {
        clearCredentials();
        navigate(routes.auth, { replace: true });
      }
    };
    fetchData();
  }, [idInstance, apiTokenInstance, navigate]);

  return <Outlet />;
};

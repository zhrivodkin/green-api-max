import {Outlet, useNavigate} from 'react-router';
import {clearCredentials, getCredentials} from "@utils/store.ts";
import {getAccountSettingsCached} from "@api/client.ts";
import isBlank from "@utils/isBlank.ts";
import routes from "@shared/routes.ts";
import {useEffect} from "react";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { idInstance, apiTokenInstance } = getCredentials();

  useEffect(() => {
    if (isBlank(idInstance) || isBlank(apiTokenInstance)) {
      navigate(routes.auth, { replace: true });
      return;
    }
    let cancelled = false;
    const fetchData = async () => {
      try {
        await getAccountSettingsCached();
        if (!cancelled) navigate(routes.messaging, { replace: true });
      } catch {
        clearCredentials();
        if (!cancelled) navigate(routes.auth, { replace: true });
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [idInstance, apiTokenInstance, navigate]);

  return <Outlet />;
};

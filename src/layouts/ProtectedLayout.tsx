import {Outlet, useNavigate} from 'react-router';
import {clearCredentials, getCredentials} from "@utils/store.ts";
import {getAccountSettingsCached} from "@api/client.ts";
import isBlank from "@utils/isBlank.ts";
import routes from "@shared/routes.ts";
import {useEffect, useState} from "react";

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { idInstance, apiTokenInstance } = getCredentials();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isBlank(idInstance) || isBlank(apiTokenInstance)) {
      navigate(routes.auth, { replace: true });
      return;
    }
    let cancelled = false;
    const verify = async () => {
      try {
        await getAccountSettingsCached();
        if (!cancelled) setIsChecking(false);
      } catch {
        clearCredentials();
        if (!cancelled) navigate(routes.auth, { replace: true });
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    };
    verify();
    return () => { cancelled = true; };
  }, [idInstance, apiTokenInstance, navigate]);

  if (isChecking) return null;
  return <Outlet />;
};
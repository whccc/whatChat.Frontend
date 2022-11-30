import { useEffect } from "react";
import SessionPage from "../../features/login/pages/login-session-page";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const { checkIfYourAreLoggedIn, loadAuth } = useAuth();
  useEffect(() => {
    //checkIfYourAreLoggedIn();
  }, []);
  return false ? (
    <div>loading...</div>
  ) : (
    <div>
      <SessionPage />
    </div>
  );
};

export default LoginPage;

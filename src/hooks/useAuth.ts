import { useRouter } from "next/router";
import { useState } from "react";

const useAuth = () => {
  const [loadAuth, setLoadAuth] = useState(true);
  const router = useRouter();
  //Validando si ya existe un token
  const validIfTokenExits = () => {
    const split = document.cookie.split(";");
    let token = null;
    for (const data of split) {
      const splitEqual = data.split("=");
      if (splitEqual[0] === "token") {
        token = splitEqual[1];
      }
    }
    if (!token) {
      router.push("/Login");
    }
    setLoadAuth(false);
  };

  const checkIfYourAreLoggedIn = () => {
    const split = document.cookie.split(";");
    let token = null;
    for (const data of split) {
      const splitEqual = data.split("=");
      if (splitEqual[0] === "token") {
        token = splitEqual[1];
      }
    }

    if (token) {
      router.push("/Chat");
    }
    setLoadAuth(false);
  };

  return { validIfTokenExits, checkIfYourAreLoggedIn, loadAuth };
};

export default useAuth;

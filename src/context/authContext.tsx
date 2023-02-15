import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/todoApi";
import { userLogin } from "../services/userApi";
import {
  AuthTypeContext,
  ContextProps,
  SignInData,
  userProps,
} from "../types/context";

export const AuthContext = createContext({} as AuthTypeContext);

function AuthProvider({ children }: ContextProps) {
  const [user, setUser] = useState<userProps>();

  useEffect(() => {
    function userAlreadyExists() {
      const storageUserToken = JSON.parse(localStorage.getItem("@Auth:token")!);
      const storageUserId = JSON.parse(localStorage.getItem("userId")!);
      if (storageUserToken) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storageUserToken}`;
        setUser({ userId: storageUserId, token: storageUserToken });
      }
    }
    userAlreadyExists();
  }, []);

  const signIn = ({ email, password }: SignInData): void => {
    userLogin({ email, password })
      .then((response) => {
        const { loginUser, token } = response;
        setUser({ userId: loginUser, token: token });
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("@Auth:token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(loginUser));
      })
      .catch((error) => {
        console.log(error);
        return alert("Email or Password incorrect.");
      });
  };
  const signOut = () => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("userId");
    setUser({ userId: "", token: "" });
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

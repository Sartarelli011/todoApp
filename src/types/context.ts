import { ReactNode } from "react";

export type ContextProps = {
  children: ReactNode;
};
export type userProps = {
  userId: string;
  token: string | any;
};
export type SignInData = {
  email: string;
  password: string;
};

export type AuthTypeContext = {
  user: userProps;
  signed: Boolean;
  signIn: (data: SignInData) => void;
  signOut: () => void;
};

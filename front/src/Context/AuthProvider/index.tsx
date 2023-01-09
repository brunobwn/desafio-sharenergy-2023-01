import React, { createContext, useState, useEffect } from 'react';
import { ContextProps, AuthProviderProps, UserProps } from './types';
import {
  getUserLocalStorage,
  getUserSessionStorage,
  LoginRequest,
  setUserLocalStorage,
  setUserSessionStorage,
} from './util';

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(
    getUserLocalStorage() || getUserSessionStorage()
  );

  async function authenticate(username: string, password: string, persist: boolean) {
    const login = await LoginRequest(username, password);

    if ('response' in login) {
      throw new Error(login.response.data.message);
    }

    const payload = {
      token: login.token,
      _id: login.user._id,
      username: login.user.username,
    };

    setUser(payload);
    persist ? setUserLocalStorage(payload) : setUserSessionStorage(payload);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
    setUserSessionStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

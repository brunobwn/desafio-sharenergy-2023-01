import React, { createContext, useState, useEffect } from 'react';
import { ContextProps, AuthProviderProps, UserProps } from './types';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util';

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>();

  useEffect(() => {
    setUser(getUserLocalStorage());
  }, []);

  async function authenticate(username: string, password: string, persist: boolean) {
    const response = await LoginRequest(username, password);
    if (response) {
      const payload = { token: response.token, username };
      setUser(payload);
      if (persist) setUserLocalStorage(payload);
    }
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

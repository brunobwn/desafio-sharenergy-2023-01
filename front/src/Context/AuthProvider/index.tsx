import React, { createContext, useState } from 'react';
import { ContextProps, AuthProviderProps, UserProps } from './types';
import { LoginRequest, setUserLocalStorage } from './util';

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>();

  async function authenticate(email: string, password: string, persist: boolean) {
    const response = await LoginRequest(email, password);
    if (response) {
      const payload = { token: response.token, email };
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

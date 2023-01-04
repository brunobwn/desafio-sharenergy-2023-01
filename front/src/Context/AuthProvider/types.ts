export interface UserProps {
  username?: string;
  token?: string;
}

export interface ContextProps extends UserProps {
  authenticate: (username: string, password: string, persist: boolean) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: JSX.Element;
}

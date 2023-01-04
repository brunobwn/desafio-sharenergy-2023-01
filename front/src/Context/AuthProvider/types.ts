export interface UserProps {
  email?: string;
  token?: string;
}

export interface ContextProps extends UserProps {
  authenticate: (email: string, password: string, persist: boolean) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: JSX.Element;
}
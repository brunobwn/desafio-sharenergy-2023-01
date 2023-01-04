import { UserProps } from './types';
import api from '../../api';

export function setUserLocalStorage(user: UserProps | null) {
  localStorage.setItem('uf31sa9s31sg2', JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('uf31sa9s31sg2');
  if (json) {
    const user = JSON.parse(json);
    return user ?? null;
  }
  return null;
}

export async function LoginRequest(username: string, password: string) {
  try {
    const request = await api.post('login', { username, password });
    return request.data;
  } catch (error) {
    return null;
  }
}

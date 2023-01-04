import { UserProps } from './types';
import api from '../../api';

export function setUserLocalStorage(user: UserProps | null) {
  localStorage.setItem('u2', JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('u2');
  if (json) {
    const user = JSON.parse(json);
    return user ?? null;
  }
  return null;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const request = await api.post('login', { email, password });
    return request.data;
  } catch (error) {
    return null;
  }
}

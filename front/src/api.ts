import axios from 'axios';
console.log(process.env.REACT_APP_BACKEND_API);
const backend = process.env.REACT_APP_BACKEND_API ?? 'http://localhost:3333';
export const api = axios.create({
  baseURL: encodeURI(backend),
});

export const randomUserApi = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

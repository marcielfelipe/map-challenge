import axios from 'axios';

export function getAPIClient(ctx?: any) {
  const api = axios.create();
  return api;
}

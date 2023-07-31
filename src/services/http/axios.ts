import axios from 'axios';

export function getAPIClient() {
  const api = axios.create();
  return api;
}

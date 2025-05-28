import axios from 'axios';

export const apiTransactionClient = axios.create({
  baseURL: import.meta.env.VITE_TRANSACTION_URL_API,
});

export default apiTransactionClient;

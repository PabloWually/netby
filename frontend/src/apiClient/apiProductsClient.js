import axios from 'axios';

export const apiProductsClient = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_URL_API,
});

export default apiProductsClient;

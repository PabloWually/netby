import { useQuery } from '@tanstack/react-query';
import { apiProducts } from '../apiClient/products';
import apiProductsClient from '../apiClient/apiProductsClient';

const api = apiProducts(apiProductsClient)

export const useGetProducts = (page = 1, pageSize = 10, name, category) => {
  return useQuery({
    queryKey: ['getProducts'],
    queryFn: () => api.getProducts(page, pageSize, name, category),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};

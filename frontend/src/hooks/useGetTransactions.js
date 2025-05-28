import { useQuery } from '@tanstack/react-query';
import { apiTransaction } from '../apiClient/transaction';
import apiTransactionClient from '../apiClient/apiTransactionClient';

const api = apiTransaction(apiTransactionClient);

export const useGetTransactions = (page = 1, pageSize = 10, startDate, endDate, type) => {
  return useQuery({
    queryKey: ['getTransactions', page, pageSize, startDate, endDate, type],
    queryFn: () => api.getTransactions(page, pageSize, startDate, endDate, type),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};

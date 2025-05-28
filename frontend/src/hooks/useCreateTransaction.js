import { useMutation } from "@tanstack/react-query";
import { apiTransaction } from "../apiClient/transaction";
import apiTransactionClient from "../apiClient/apiTransactionClient";

const api = apiTransaction(apiTransactionClient)

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: (transaction) => api.createTransaction(transaction),
  })
}

import { useMutation } from "@tanstack/react-query";
import { apiProducts } from "../apiClient/products";
import apiProductsClient from "../apiClient/apiProductsClient";

const api = apiProducts(apiProductsClient);

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (product) => api.createProducts(product),
  })
}

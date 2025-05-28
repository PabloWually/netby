export const apiTransaction = (client) => ({
  createTransaction: async (transaction) => {
    const response = await client.post("/transactions", transaction);

    return response.data;
  },

});

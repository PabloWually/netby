export const apiTransaction = (client) => ({
  createTransaction: async (transaction) => {
    const response = await client.post("/transactions", transaction);

    return response.data;
  },
  getTransactions: async (page, pageSize, startDate, endDate, type) => {
    const params = {};

    if (page) params.page = page;
    if (pageSize) params.pageSize = pageSize;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (type) params.type = type

    const response = await client.get("/transactions", { params });
    return response.data;
  },
});

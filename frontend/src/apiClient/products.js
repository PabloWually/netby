export const apiProducts = (client) => ({
  createMessage: async (product) => {
    const response = await client.post("/products", product);

    return response.data;
  },
  getProducts: async (page, pageSize, name, category) => {
    const params = {};

    if (page) params.page = page;
    if (pageSize) params.pageSize = pageSize;
    if (category) params.category = category;
    if (name) params.name = name;

    const response = await client.get("/products", {params});
    return response.data;
  },
});

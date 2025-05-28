public interface IProductRepository
{
    Task<Product> CreateAsync(Product product);
    Task<Product?> GetByIdAsync(Guid id);
    Task<Product> UpdateAsync(Product product);
    Task DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
    Task UpdateStockAsync(Guid productId, int newStock);
    Task<IEnumerable<Product>> GetAllAsync(int page, int pageSize, string? category = null, string? name = null);
    Task<int> GetTotalCountAsync(string? category = null, string? name = null);

}
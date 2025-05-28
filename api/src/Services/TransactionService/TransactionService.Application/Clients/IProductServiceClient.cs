public interface IProductServiceClient
{
    Task<ProductDto?> GetProductByIdAsync(Guid productId);
    Task<bool> HasSufficientStockAsync(Guid productId, int quantity);
    Task UpdateStockAsync(Guid productId, int quantity, bool isAddition);
}
public interface IProductRepository
{
    Task<Product> CreateAsync(Product product);
}
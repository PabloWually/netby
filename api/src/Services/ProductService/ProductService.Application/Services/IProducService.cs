public interface IProductService
{
    Task<ProductDto> CreateAsync(CreateProductDto createProductDto);
}
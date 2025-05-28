public interface IProductService
{
  Task<ProductDto> CreateAsync(CreateProductDto createProductDto);
  Task<ProductDto?> GetByIdAsync(Guid id);
  Task<ProductDto> UpdateAsync(Guid id, UpdateProductDto updateProductDto);
  Task DeleteAsync(Guid id);
}
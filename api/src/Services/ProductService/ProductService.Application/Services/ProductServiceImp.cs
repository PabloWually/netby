using AutoMapper;

public class ProductServiceImp : IProductService
{
  private readonly IProductRepository _repository;
  private readonly IMapper _mapper;

  public ProductServiceImp(IProductRepository repository, IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }
  public async Task<ProductDto> CreateAsync(CreateProductDto createProductDto)
  {
    var product = _mapper.Map<Product>(createProductDto);
    product.CreatedAt = DateTime.UtcNow;
    product.UpdatedAt = DateTime.UtcNow;

    var createdProduct = await _repository.CreateAsync(product);
    return _mapper.Map<ProductDto>(createdProduct);
  }

  public async Task<ProductDto?> GetByIdAsync(Guid id)
  {
    var product = await _repository.GetByIdAsync(id);
    return product != null ? _mapper.Map<ProductDto>(product) : null;
  }

  public async Task<ProductDto> UpdateAsync(Guid id, UpdateProductDto updateProductDto)
  {
    var existingProduct = await _repository.GetByIdAsync(id);
    if (existingProduct == null)
      throw new Exception($"Product with ID {id} not found");

    _mapper.Map(updateProductDto, existingProduct);
    existingProduct.UpdatedAt = DateTime.UtcNow;

    var updatedProduct = await _repository.UpdateAsync(existingProduct);
    return _mapper.Map<ProductDto>(updatedProduct);
  }

  public async Task DeleteAsync(Guid id)
  {
    if (!await _repository.ExistsAsync(id))
      throw new Exception($"Product with ID {id} not found");

    await _repository.DeleteAsync(id);
  }
  public async Task UpdateStockAsync(Guid productId, int quantity, bool isAddition)
  {
    var product = await _repository.GetByIdAsync(productId);
    if (product == null)
      throw new Exception($"Product with ID {productId} not found");

    var newStock = isAddition ? product.Stock + quantity : product.Stock - quantity;

    if (newStock < 0)
      throw new InvalidOperationException("Insufficient stock");

    await _repository.UpdateStockAsync(productId, newStock);
  }
  public async Task<bool> HasSufficientStockAsync(Guid productId, int requiredQuantity)
  {
    var product = await _repository.GetByIdAsync(productId);
    return product != null && product.Stock >= requiredQuantity;
  }
}
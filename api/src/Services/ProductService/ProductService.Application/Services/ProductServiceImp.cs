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

}
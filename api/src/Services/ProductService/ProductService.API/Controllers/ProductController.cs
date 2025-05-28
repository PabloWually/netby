using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
  private readonly IProductService _productService;

  public ProductsController(IProductService productService)
  {
    _productService = productService;
  }

  [HttpPost]
  public async Task<IResult> CreateProduct(CreateProductDto createProductDto)
  {
    var product = await _productService.CreateAsync(createProductDto);
    return Results.Ok();
  }
}


public class UpdateStockRequest
{
    public int Quantity { get; set; }
    public bool IsAddition { get; set; }
}
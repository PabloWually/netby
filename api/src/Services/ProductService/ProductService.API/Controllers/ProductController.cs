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
  public async Task<ActionResult<ProductDto>> CreateProduct(CreateProductDto createProductDto)
  {
    var product = await _productService.CreateAsync(createProductDto);
    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<ProductDto>> UpdateProduct(Guid id, UpdateProductDto updateProductDto)
  {
    var product = await _productService.UpdateAsync(id, updateProductDto);
    return Ok(product);
  }

  [HttpGet("{id}/check-stock")]
  public async Task<ActionResult<bool>> CheckStock(Guid id, [FromQuery] int quantity)
  {
    var result = await _productService.HasSufficientStockAsync(id, quantity);
    return Ok(result);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<ProductDto>> GetProduct(Guid id)
  {
    var product = await _productService.GetByIdAsync(id);
    if (product == null)
      return NotFound();

    return Ok(product);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteProduct(Guid id)
  {
    await _productService.DeleteAsync(id);
    return NoContent();
  }

  [HttpPut("{id}/stock")]
  public async Task<IActionResult> UpdateStock(Guid id, [FromBody] UpdateStockRequest request)
  {
    await _productService.UpdateStockAsync(id, request.Quantity, request.IsAddition);
    return NoContent();
  }
}


public class UpdateStockRequest
{
  public int Quantity { get; set; }
  public bool IsAddition { get; set; }
}
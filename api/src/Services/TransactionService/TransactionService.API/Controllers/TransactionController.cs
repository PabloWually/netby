using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
  private readonly ITransactionService _transactionService;

  public TransactionsController(ITransactionService transactionService)
  {
    _transactionService = transactionService;
  }

  [HttpPost]
  public async Task<ActionResult<TransactionDto>> CreateTransaction(CreateTransactionDto createTransactionDto)
  {
    var transaction = await _transactionService.CreateAsync(createTransactionDto);
    return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
  }

  public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
      [FromQuery] int page = 1,
      [FromQuery] int pageSize = 10,
      [FromQuery] string? startDate = null,
      [FromQuery] string? endDate = null,
      [FromQuery] int? type = null)
  {
    var result = await _transactionService.GetAllAsync(page, pageSize, startDate, endDate, type);
    return Ok(result);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<ProductDto>> GetTransaction(Guid id)
  {
    var product = await _transactionService.GetByIdAsync(id);
    if (product == null)
      return NotFound();

    return Ok(product);
  }
}

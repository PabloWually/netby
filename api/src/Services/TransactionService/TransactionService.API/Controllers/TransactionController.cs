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

  [HttpGet("{id}")]
  public async Task<ActionResult<ProductDto>> GetTransaction(Guid id)
  {
    var product = await _transactionService.GetByIdAsync(id);
    if (product == null)
      return NotFound();

    return Ok(product);
  }
}

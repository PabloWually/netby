using AutoMapper;

public class TransactionServiceImp : ITransactionService
{
  private readonly ITransactionRepository _repository;
  private readonly IMapper _mapper;
  private readonly IProductServiceClient _productServiceClient;

  public TransactionServiceImp(ITransactionRepository repository, IMapper mapper, IProductServiceClient productServiceClient)
  {
    _repository = repository;
    _mapper = mapper;
    _productServiceClient = productServiceClient;
  }

  public async Task<TransactionDto> CreateAsync(CreateTransactionDto createTransactionDto)
  {
    Guid productId = Guid.Parse(createTransactionDto.ProductId);
    var product = await _productServiceClient.GetProductByIdAsync(productId);
    if (product == null)
      throw new Exception($"Product with ID {createTransactionDto.ProductId} not found");

    if (createTransactionDto.Type == TransactionType.Sale)
    {
      var hasSufficientStock = await _productServiceClient.HasSufficientStockAsync(productId, createTransactionDto.Quantity);
      if (!hasSufficientStock)
        throw new InvalidOperationException("Insufficient stock for this sale");
    }

    var transaction = _mapper.Map<Transaction>(createTransactionDto);
    transaction.Date = DateTime.Now;
    transaction.UnitPrice = product.Price;
    transaction.TotalPrice = createTransactionDto.Quantity * product.Price;
    transaction.CreatedAt = DateTime.UtcNow;

    var createdTransaction = await _repository.CreateAsync(transaction);

    var isAddition = createTransactionDto.Type == TransactionType.Purchase;
    await _productServiceClient.UpdateStockAsync(productId, createTransactionDto.Quantity, isAddition);

    var result = _mapper.Map<TransactionDto>(createdTransaction);
    result.ProductName = product.Name;
    return result;
  }
  public async Task<TransactionDto?> GetByIdAsync(Guid id)
  {
    var product = await _repository.GetByIdAsync(id);
    return product != null ? _mapper.Map<TransactionDto>(product) : null;
  }
  public async Task<PagedResult<TransactionDto>> GetAllAsync(int page, int pageSize, string? dateStart = null, string? dateEnd = null, int? type = null)
  {
    var transactions = await _repository.GetAllAsync(page, pageSize, dateStart, dateEnd, type);
    var totalCount = await _repository.GetTotalCountAsync(dateStart, dateEnd, type);

    var transactionDtos = _mapper.Map<List<TransactionDto>>(transactions);

    foreach (var transactionDto in transactionDtos)
    {
      try
      {
        if (Guid.TryParse(transactionDto.ProductId, out Guid productId))
        {
          var product = await _productServiceClient.GetProductByIdAsync(productId);
          if (product != null)
          {
            transactionDto.ProductName = product.Name;
            transactionDto.ProductStock = product.Stock;
          }
        }
      }
      catch (Exception ex)
      {
        transactionDto.ProductName = "Producto no encontrado " + ex;
      }
    }
    return new PagedResult<TransactionDto>
    {
      Items = transactionDtos,
      TotalCount = totalCount,
      Page = page,
      PageSize = pageSize
    };
  }

}
public interface ITransactionService
{
  Task<TransactionDto> CreateAsync(CreateTransactionDto createTransactionDto);
  Task<TransactionDto?> GetByIdAsync(Guid id);
  Task<PagedResult<TransactionDto>> GetAllAsync(int page, int pageSize, string? dateStart = null, string? dateEnd = null, int? type = null);
}
public interface ITransactionService
{
  Task<TransactionDto> CreateAsync(CreateTransactionDto createTransactionDto);
  Task<TransactionDto?> GetByIdAsync(Guid id);
}
public interface ITransactionRepository
{
    Task<Transaction> CreateAsync(Transaction transaction);
    Task<Transaction?> GetByIdAsync(Guid id);
    Task<IEnumerable<Transaction>> GetAllAsync(int page, int pageSize, string? dateStart = null, string? dateEnd = null, int? type = null);
    Task<int> GetTotalCountAsync(string? dateStart = null, string? dateEnd = null, int? type = null);
}
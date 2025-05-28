using Microsoft.EntityFrameworkCore;

public class TransactionRepository : ITransactionRepository
{
  private readonly TransactionDbContext _context;

  public TransactionRepository(TransactionDbContext context)
  {
    _context = context;
  }
  public async Task<Transaction> CreateAsync(Transaction transaction)
  {
    _context.Transactions.Add(transaction);
    await _context.SaveChangesAsync();
    return transaction;
  }
  public async Task<Transaction?> GetByIdAsync(Guid id)
  {
    return await _context.Transactions.FindAsync(id);
  }
  public async Task<IEnumerable<Transaction>> GetAllAsync(int page, int pageSize, string? dateStart = null, string? dateEnd = null, int? type = null)
  {
    var query = _context.Transactions.AsQueryable();

    if (!string.IsNullOrEmpty(dateStart))
    {
      if (DateTime.TryParse(dateStart, out DateTime startDate))
      {
        query = query.Where(t => t.Date >= startDate);
      }
    }

    if (!string.IsNullOrEmpty(dateEnd))
    {
      if (DateTime.TryParse(dateEnd, out DateTime endDate))
      {
        endDate = endDate.AddDays(1);
        query = query.Where(t => t.Date < endDate);
      }
    }

    if (type.HasValue)
    {
      var transactionType = (TransactionType)type.Value;
      query = query.Where(p => p.Type.Equals(transactionType));
    }
    return await query
      .OrderByDescending(t => t.CreatedAt)
      .Skip((page - 1) * pageSize)
      .Take(pageSize)
      .ToListAsync();
  }
  public async Task<int> GetTotalCountAsync(string? dateStart = null, string? dateEnd = null, int? type = null)
  {
    var query = _context.Transactions.AsQueryable();

    if (!string.IsNullOrEmpty(dateStart))
    {
      if (DateTime.TryParse(dateStart, out DateTime startDate))
      {
        query = query.Where(t => t.Date >= startDate);
      }
    }

    if (!string.IsNullOrEmpty(dateEnd))
    {
      if (DateTime.TryParse(dateEnd, out DateTime endDate))
      {
        endDate = endDate.AddDays(1);
        query = query.Where(t => t.Date < endDate);
      }
    }

    if (type != null)
      query = query.Where(p => p.Type.Equals(type));

    return await query.CountAsync();
  }
}
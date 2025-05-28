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
}
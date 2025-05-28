using Microsoft.EntityFrameworkCore;

public class ProductRepository : IProductRepository
{
  private readonly ProductDbContext _context;

  public ProductRepository(ProductDbContext context)
  {
    _context = context;
  }
  public async Task<Product> CreateAsync(Product product)
  {
    _context.Products.Add(product);
    await _context.SaveChangesAsync();
    return product;
  }

  public async Task<Product?> GetByIdAsync(Guid id)
  {
    return await _context.Products.FindAsync(id);
  }

  public async Task<Product> UpdateAsync(Product product)
  {
    _context.Products.Update(product);
    await _context.SaveChangesAsync();
    return product;
  }

  public async Task DeleteAsync(Guid id)
  {
    var product = await _context.Products.FindAsync(id);
    if (product != null)
    {
      _context.Products.Remove(product);
      await _context.SaveChangesAsync();
    }
  }
  public async Task<bool> ExistsAsync(Guid id)
  {
    return await _context.Products.AnyAsync(p => p.Id == id);
  }

  public async Task UpdateStockAsync(Guid productId, int newStock)
  {
    var product = await _context.Products.FindAsync(productId);
    if (product != null)
    {
      product.Stock = newStock;
      product.UpdatedAt = DateTime.UtcNow;
      await _context.SaveChangesAsync();
    }
  }
  public async Task<IEnumerable<Product>> GetAllAsync(int page, int pageSize, string? category = null, string? name = null)
  {
    var query = _context.Products.AsQueryable();

    if (!string.IsNullOrEmpty(category))
      query = query.Where(p => p.Category.Contains(category));

    if (!string.IsNullOrEmpty(name))
      query = query.Where(p => p.Name.Contains(name));

    return await query
      .OrderBy(p => p.Name)
      .Skip((page - 1) * pageSize)
      .Take(pageSize)
      .ToListAsync();

  }
  public async Task<int> GetTotalCountAsync(string? category = null, string? name = null)
  {
    var query = _context.Products.AsQueryable();

    if (!string.IsNullOrEmpty(category))
      query = query.Where(p => p.Category.Contains(category));

    if (!string.IsNullOrEmpty(name))
      query = query.Where(p => p.Name.Contains(name));

    return await query.CountAsync();
  }
}
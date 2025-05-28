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
}
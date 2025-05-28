
using Microsoft.EntityFrameworkCore;

public class ProductDbContext : DbContext
{
  public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

  public DbSet<Product> Products { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<Product>(entity =>
    {
      entity.HasKey(e => e.Id);

      entity.Property(e => e.Name)
        .IsRequired()
        .HasMaxLength(100);

      entity.Property(e => e.Description)
        .IsRequired()
        .HasMaxLength(500);

      entity.Property(e => e.Category)
        .IsRequired()
        .HasMaxLength(50);

      entity.Property(e => e.ImageUrl)
        .HasMaxLength(255);

      entity.Property(e => e.Price)
        .HasColumnType("decimal(18,2)");
    });
  }
}
using Microsoft.EntityFrameworkCore;

public class TransactionDbContext : DbContext
{
    public TransactionDbContext(DbContextOptions<TransactionDbContext> options) : base(options)
    {
    }

    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Date)
                .IsRequired()
                .HasColumnType("datetime2");

            entity.Property(e => e.Type)
                .IsRequired()
                .HasConversion<int>()
                .HasComment("1 = Purchase, 2 = Sale");

            entity.Property(e => e.ProductId)
                .IsRequired();

            entity.Property(e => e.Quantity)
                .IsRequired()
                .HasComment("Quantity of products in the transaction");

            entity.Property(e => e.UnitPrice)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasComment("Price per unit");

            entity.Property(e => e.TotalPrice)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasComment("Total price = Quantity * UnitPrice");

            entity.Property(e => e.Detail)
                .HasMaxLength(500)
                .HasDefaultValue("")
                .HasComment("Additional details about the transaction");

            entity.Property(e => e.CreatedAt)
                .IsRequired()
                .HasColumnType("datetime2")
                .HasDefaultValueSql("GETUTCDATE()")
                .HasComment("When the transaction was created");

            entity.ToTable("Transactions");
        });
    }
}

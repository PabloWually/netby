public class Transaction
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public TransactionType Type { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
    public string Detail { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public enum TransactionType
{
    Purchase = 1,
    Sale = 2
}
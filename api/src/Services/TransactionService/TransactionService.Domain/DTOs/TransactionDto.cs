public class TransactionDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Type { get; set; } = string.Empty;
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
    public string Detail { get; set; } = string.Empty;
    
}

public class CreateTransactionDto
{
    public DateTime Date { get; set; }
    public TransactionType Type { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public string Detail { get; set; } = string.Empty;
}
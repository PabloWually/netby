using FluentValidation;

public class CreateTransactionValidator : AbstractValidator<CreateTransactionDto>
{
  public CreateTransactionValidator()
  {
    RuleFor(x => x.ProductId)
        .NotEmpty().WithMessage("El ID del producto es obligatorio.");

    RuleFor(x => x.Type)
        .IsInEnum().WithMessage("El tipo de transacción no es válido.");

    RuleFor(x => x.Quantity)
        .GreaterThan(0).WithMessage("La cantidad debe ser mayor que cero.");

    RuleFor(x => x.Detail)
        .MaximumLength(500).WithMessage("El detalle no puede exceder los 500 caracteres.");
  }
}
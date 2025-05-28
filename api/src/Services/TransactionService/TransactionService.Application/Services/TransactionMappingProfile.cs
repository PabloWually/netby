using AutoMapper;
public class TransactionMappingProfile : Profile
{
  public TransactionMappingProfile()
  {
    CreateMap<Transaction, TransactionDto>();

    CreateMap<CreateTransactionDto, Transaction>()
        .ForMember(dest => dest.Id, opt => opt.Ignore())
        .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

    CreateMap<PagedResult<Transaction>, PagedResult<TransactionDto>>();
  }
}
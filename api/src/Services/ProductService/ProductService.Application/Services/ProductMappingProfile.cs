using AutoMapper;

public class ProductMappingProfile : Profile
{
  public ProductMappingProfile()
  {
    CreateMap<Product, ProductDto>();

    CreateMap<CreateProductDto, Product>()
        .ForMember(dest => dest.Id, opt => opt.Ignore())
        .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
        .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());

    CreateMap<UpdateProductDto, Product>()
        .ForMember(dest => dest.Id, opt => opt.Ignore())
        .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
        .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
  }
}
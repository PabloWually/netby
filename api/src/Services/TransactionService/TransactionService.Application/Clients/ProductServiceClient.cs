using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text;

public class ProductServiceClient : IProductServiceClient
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ProductServiceClient> _logger;

    public ProductServiceClient(HttpClient httpClient, ILogger<ProductServiceClient> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<ProductDto?> GetProductByIdAsync(Guid productId)
    {
        try
        {
            var response = await _httpClient.GetAsync($"api/products/{productId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<ProductDto>(json, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
            }
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting product {ProductId}", productId);
            throw;
        }
    }

    public async Task<bool> HasSufficientStockAsync(Guid productId, int quantity)
    {
        try
        {
            var response = await _httpClient.GetAsync($"api/products/{productId}/check-stock?quantity={quantity}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<bool>(json);
            }
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking stock for product {ProductId}", productId);
            throw;
        }
    }

    public async Task UpdateStockAsync(Guid productId, int quantity, bool isAddition)
    {
        try
        {
            var request = new { Quantity = quantity, IsAddition = isAddition };
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PutAsync($"api/products/{productId}/stock", content);
            response.EnsureSuccessStatusCode();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating stock for product {ProductId}", productId);
            throw;
        }
    }
}
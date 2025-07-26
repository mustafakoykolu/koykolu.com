using System.Data;
using api.DTO;
using api.Requests;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<AboutController> _logger;
        private readonly IDbConnection _dbConnection;

        public ContactController(ILogger<AboutController> logger, IDbConnection dbConnection)
        {
            _logger = logger;
            _dbConnection = dbConnection;
        }

        [HttpGet("ContactInfo", Name = "GetContactInfo")]
        public async Task<IActionResult> GetContactInfo()
        {
            try
            {
                using (var dbConnection = _dbConnection)
                {
                    var contactInfo = (await dbConnection.QueryAsync<ContactInfoDTO>("SELECT id, phone FROM contact_info")).First();
                    return Ok(contactInfo);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Contact info alınırken sunucuda bir hata oluştu.");
                return StatusCode(500, "Contact info alınırken sunucuda bir hata oluştu.");
            }
        }
        [HttpPost("ContactRequest", Name = "PostContactRequest")]
        public async Task<IActionResult> PostContactRequest(ContactRequestModel contactRequestModel)
        {
            try
            {
                using (var dbConnection = _dbConnection)
                {
                    DynamicParameters dynamicParameters = new(
                        new
                        {
                            nameSurname = contactRequestModel.NameSurname,
                            email = contactRequestModel.Email,
                            phoneNumber = contactRequestModel.PhoneNumber,
                            sentMessage = contactRequestModel.SentMessage
                        });
                    await dbConnection.ExecuteAsync("INSERT INTO contact_requests (name_surname, email, phone_number, sent_message) VALUES (:nameSurname, :email, :phoneNumber, :sentMessage)", dynamicParameters);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "İletişim bilgisi eklenemedi.");
                return StatusCode(500, "İletişim bilginiz iletilemedi. Telefon ile arayabilirsiniz veya daha sonra tekrar deneyebilirsiniz.");
            }
        }
    }
}
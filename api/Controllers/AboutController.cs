using System.Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutController : ControllerBase
    {
        private readonly ILogger<AboutController> _logger;
        private readonly IDbConnection _dbConnection;

        public AboutController(ILogger<AboutController> logger, IDbConnection dbConnection)
        {
            _logger = logger;
            _dbConnection = dbConnection;
        }

        [HttpGet("roles", Name = "GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                using (var dbConnection = _dbConnection)
                {
                    var roles = (await dbConnection.QueryAsync<string>("SELECT role_name FROM about_roles ORDER BY id")).AsEnumerable();
                    return Ok(roles);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Roller alınırken sunucuda bir hata oluştu.");
                return StatusCode(500, "Roller alınırken sunucuda bir hata oluştu.");
            }
        }

        [HttpGet("summary", Name = "GetSummary")]
        public async Task<IActionResult> GetSummary()
        {
            try
            {
                using (var dbConnection = _dbConnection)
                {
                    var summaries = (await dbConnection.QueryAsync<string>("SELECT summary FROM about_summaries")).AsEnumerable();
                    return Ok(summaries);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Summary alınırken sunucuda bir hata oluştu.");
                return StatusCode(500, "Summary alınırken sunucuda bir hata oluştu.");
            }
        }
    }
}
using System.Data;
using System.Data.Common;
using api.DTO;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EducationController : ControllerBase
    {
        private readonly ILogger<AboutController> _logger;
        private readonly IDbConnection _dbConnection;

        public EducationController(ILogger<AboutController> logger, IDbConnection dbConnection)
        {
            _logger = logger;
            _dbConnection = dbConnection;
        }

        [HttpGet("educatinalBackgroundList", Name = "GetEducationalBackgorundList")]
        public async Task<IActionResult> GetEducationalBackgorundList()
        {
            try
            {
                using (var dbConnection = _dbConnection)
                {
                    var roles = (await dbConnection.QueryAsync<EducationalBackgroundDTO>("SELECT id, logo_path LogoPath, department_name DepartmentName, school_name SchoolName, education_degree EducationDegree, begin_date BeginDate, end_date EndDate FROM educational_backgrounds ORDER BY id")).AsEnumerable();
                    return Ok(roles);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Educational background alınırken sunucuda bir hata oluştu.");
                return StatusCode(500, "Educational background alınırken sunucuda bir hata oluştu.");
            }
        }
    }
}
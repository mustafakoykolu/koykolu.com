using System.Data;
using System.Text;
using api.DTO;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkController : ControllerBase
    {
        private readonly ILogger<AboutController> _logger;
        private readonly IDbConnection _dbConnection;

        public WorkController(ILogger<AboutController> logger, IDbConnection dbConnection)
        {
            _logger = logger;
            _dbConnection = dbConnection;
        }

        [HttpGet("workExperienceList", Name = "GetWorkExperienceList")]
        public async Task<IActionResult> GetWorkExperienceList()
        {
            try
            {
                using (var dbConnection = _dbConnection)
                {
                    var works = (await dbConnection.QueryAsync<WorkExperienceDTO>("SELECT id, title, company, begin_date BeginDate, end_date EndDate, description FROM work_experiences ORDER BY end_date DESC")).AsEnumerable();
                    return Ok(works);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Work experience alınırken sunucuda bir hata oluştu.");
                return StatusCode(500, "Work experience alınırken sunucuda bir hata oluştu.");
            }
        }
        [HttpGet("workExperienceTechonlogiesList", Name = "GetWorkExperienceTechnologiesList")]
        public async Task<IActionResult> GetWorkExperienceTechnologiesList(int workExperienceId)
        {
            try
            {
                using (var dbConnection = _dbConnection)
                {
                    StringBuilder queryBuilder = new("SELECT t.id, t.name FROM technologies t JOIN work_experience_technologies w on t.id = w.technology_id where 1=1");
                    DynamicParameters dynamicParameters = new();
                    if (workExperienceId != 0)
                    {
                        queryBuilder.Append(" AND w.work_experience_id = :workExperienceId");
                        dynamicParameters.Add("workExperienceId", workExperienceId);
                    }
                    var works = (await dbConnection.QueryAsync<TechnologyDTO>(queryBuilder.ToString(), dynamicParameters)).AsEnumerable();
                    return Ok(works);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Work experience technologies alınırken sunucuda bir hata oluştu.");
                return StatusCode(500, "Work experience technologies alınırken sunucuda bir hata oluştu.");
            }
        }
    }
}
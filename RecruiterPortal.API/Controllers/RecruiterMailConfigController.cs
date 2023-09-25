using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruiterMailConfigController : CustomControllerBase
    {
        public RecruiterMailConfigController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-by-recruiterid")]
        [HttpGet]
        public async Task<IActionResult> GetRecruiterMailConfigsByRecruiterId()
        {
            try
            {
                return StatusCode(200, await RecruiterMailConfigManager.GetRecruiterMailConfigsByRecruiterId(RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}

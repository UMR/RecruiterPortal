using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailTemplateController : CustomControllerBase
    {
        public MailTemplateController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-mail-template-types-by-recruiterid")]
        [HttpGet]
        public async Task<IActionResult> GetMailTemplateTypesByRecruiterId()
        {
            try
            {
                return StatusCode(200, await MailTemplateTypeManager.GetMailTemplateTypesByRecruiterId(RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-mail-template-type-by-recruiterid/{id}")]
        [HttpGet]
        public IActionResult GetMailTemplateTypeByRecruiterId(int id)
        {
            try
            {
                return StatusCode(200, MailTemplateTypeManager.GetMailTemplateTypeById(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }


        [Route("save-mail-template-type")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] MailTemplateTypeRequest request)
        {
            try
            {
                if (request.Id > 0)
                {
                    var result = await MailTemplateTypeManager.Update(request, RecruiterId);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    return StatusCode(200);
                }
                return StatusCode(200, await MailTemplateTypeManager.Create(request, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}

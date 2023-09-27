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

        [Route("get-mail-template-type-by-id/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetMailTemplateTypeById(int id)
        {
            try
            {
                return StatusCode(200, await MailTemplateTypeManager.GetMailTemplateTypeById(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-mail-template/{configId}/{mailTemplateTypeId}")]
        [HttpGet]
        public async Task<IActionResult> GetMailTemplateTypeById(int configId,int mailTemplateTypeId)
        {
            try
            {
                return StatusCode(200, await MailTemplateManager.GetMailTemplate(configId, mailTemplateTypeId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }


        [Route("save-mail-template-type")]
        [HttpPost]
        public async Task<IActionResult> SaveMailTemplateType([FromBody] MailTemplateTypeRequest request)
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

        [Route("save-mail-template")]
        [HttpPost]
        public async Task<IActionResult> SaveMailTemplateType([FromBody] MailTemplateRequest request)
        {
            try
            {
                if (request.Id > 0)
                {
                    var result = await MailTemplateManager.Update(request, RecruiterId);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    return StatusCode(200);
                }
                return StatusCode(200, await MailTemplateManager.Create(request, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("delete-mail-template-type/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMailTemplateType(int id)
        {
            try
            {
                bool? result = await MailTemplateTypeManager.Delete(id);
                if (result == null)
                {
                    return NotFound();
                }
                return StatusCode(200);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}

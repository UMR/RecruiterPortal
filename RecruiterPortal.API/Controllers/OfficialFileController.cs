using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.Models;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficialFileController : CustomControllerBase
    {
        public OfficialFileController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-by-agencyid")]
        [HttpGet]
        public async Task<IActionResult> GetByAgencyId(int page, int pageSize)
        {
            try
            {
                return StatusCode(200, await OfficialFileManager.GetOfficialFileByAgencyId(AgencyId, page, pageSize));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return StatusCode(200, await OfficialFileManager.GetOfficialFileById(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] OfficialFileRequest request)
        {
            try
            {
                return StatusCode(200, await OfficialFileManager.Create(request, RecruiterId, AgencyId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("update")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] OfficialFileRequest request)
        {
            try
            {
                var result = await OfficialFileManager.Update(request, RecruiterId);
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

        [Route("delete/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool? result = await OfficialFileManager.Delete(id);
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

        [HttpGet]
        [Route("download/{id}")]
        public async Task<IActionResult> Download(int id)
        {
            try
            {
                var officialFileData = await OfficialFileManager.GetOfficialFileDataById(id);
                return new FileContentResult(officialFileData, "application/octet-stream")
                {
                    FileDownloadName = string.Empty
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}

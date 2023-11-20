using Microsoft.AspNetCore.Mvc;
using RecruiterPortal.DAL.Models;
using RecruiterPortalDAL.Managers;

namespace RecruiterPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : CustomControllerBase
    {
        public PositionController(ILogger<CustomControllerBase> logger) : base(logger)
        {
        }

        [Route("get-all")]
        [HttpGet]
        public async Task<IActionResult> GetPositions(int page, int pageSize)
        {
            try
            {
                return Ok(await PositionManager.GetAllPosition(page, pageSize));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetPositionById(int id)
        {
            try
            {
                return Ok(await PositionManager.GetPositionById(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("is-exist-position-name")]
        [HttpGet]
        public async Task<IActionResult> IsExistPositionName(string name)
        {
            try
            {
                return Ok(await PositionManager.IsExistPositionName(name));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PositionRequestModel request)
        {
            try
            {
                return StatusCode(200, await PositionManager.Create(request, RecruiterId));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }

        [Route("update")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PositionRequestModel request)
        {
            try
            {
                var position = PositionManager.GetPositionById(request.Id);
                if (position == null)
                {
                    return NotFound();
                }
                return Ok(await PositionManager.Update(request, RecruiterId));
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
                int? result = await PositionManager.Delete(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, ex.Message);
            }
        }
    }
}

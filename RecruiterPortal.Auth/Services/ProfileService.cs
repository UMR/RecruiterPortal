using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using RecruiterPortal.Common;
using RecruiterPortal.DAL.Managers;
using System.Dynamic;
using System.Security.Claims;

namespace RecruiterPortal.Auth.Services
{
    public class ProfileService : IProfileService
    {
        private readonly ILogger<ProfileService> _logger;
        private readonly IConfiguration _configuration;

        public ProfileService(ILogger<ProfileService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                var claims = new ClaimsIdentity();
                var recruiter = RecruiterManager.GetRecruiterByLoginid(context.Subject.GetSubjectId());
                dynamic currentUserDynamic = new ExpandoObject();

                if (recruiter != null)
                {
                    currentUserDynamic.UserId = recruiter.UserId;
                    currentUserDynamic.FirstName = recruiter.FirstName;                    
                    currentUserDynamic.LastName = recruiter.LastName;
                    currentUserDynamic.Email = recruiter.Email;
                    currentUserDynamic.IsActive = recruiter.IsActive;
                    currentUserDynamic.CreatedDate = recruiter.CreatedDate;
                }

                if (currentUserDynamic != null)
                {
                    var currentUserJson = Newtonsoft.Json.JsonConvert.SerializeObject(currentUserDynamic);
                    claims.AddClaims(new[]
                    {
                        new Claim(_configuration.GetSection("RecruiterClaim").Value, currentUserJson)
                    });                
                }

                context.IssuedClaims = claims.Claims.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
            }

            return Task.FromResult(0);
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            try
            {
                var recruiter = RecruiterManager.GetRecruiterByLoginid(context.Subject.GetSubjectId());
                context.IsActive = recruiter != null;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
            }
        }
    }
}
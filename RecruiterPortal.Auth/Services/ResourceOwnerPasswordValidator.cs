using IdentityModel;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Http.Extensions;
using RecruiterPortal.DAL.Managers;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;

namespace ApplicantPortalAPI.AuthorizationServer.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<ResourceOwnerPasswordValidator> _logger;

        public ResourceOwnerPasswordValidator(IHttpContextAccessor httpContextAccessor, ILogger<ResourceOwnerPasswordValidator> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }

        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                long agencyId = GetAgencyIdByUrl(_httpContextAccessor.HttpContext);
                if (RecruiterManager.ValidateRecruiter(context.UserName, context.Password, agencyId, false))
                {
                    var recruiter = RecruiterManager.GetRecruiterByLoginid(context.UserName);
                    context.Result = new GrantValidationResult(context.UserName, OidcConstants.AuthenticationMethods.Password);
                    var v = RecruiterManager.InsertRecruiterEntry(recruiter.RecruiterId);
                    _logger.LogInformation($"Authentication Pass For User {context.UserName}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
            }

            return Task.FromResult(0);
        }

        private int GetAgencyIdByUrl(HttpContext context)
        {
            int agencyId = 0;
            string url = UriHelper.GetEncodedUrl(context.Request);
            Agency agency;

            if (!string.IsNullOrEmpty(url))
            {
                var splitUrl = url.Split('=');
                if (splitUrl.Length > 1)
                {
                    var subDomain = splitUrl[1].ToString();
                    agency = AgencyManager.GetAgencyByURLPrefix(subDomain.ToString());
                    if (agency != null)
                    {
                        agencyId = Convert.ToInt32(agency.AgencyId.ToString());
                    }
                }
            }

            return agencyId;
        }
    }
}

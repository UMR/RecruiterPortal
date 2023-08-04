using IdentityModel;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Http.Extensions;
using RecruiterPortal.DAL.SqlModels;
using RecruiterPortalDAL.Managers;

namespace ApplicantPortalAPI.AuthorizationServer.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ResourceOwnerPasswordValidator(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {                
                int agencyId = GetAgencyIdByFullUrl(_httpContextAccessor.HttpContext);
                if (UserManager.ValidateUser(context.UserName, context.Password))
                {
                    var user = UserManager.GetUserByName(context.UserName);
                    context.Result = new GrantValidationResult(user.Email, OidcConstants.AuthenticationMethods.Password);
                    //Log.Info("Validation Pass");
                }
            }
            catch (Exception ex)
            {
                //Log.Write(ex);
            }

            return Task.FromResult(0);
        }        

        private int GetAgencyIdByFullUrl(HttpContext context)
        {
            int agencyId = 0;
            string url = UriHelper.GetEncodedUrl(context.Request);
            Agency agencyData;

            if (!string.IsNullOrEmpty(url))
            {
                var splitUrl = url.Split('=');
                var subDomain = splitUrl[1].ToString();

                agencyData = AgencyManager.GetAgencyByURLPrefix(subDomain.ToString());
                if (agencyData != null)
                {
                    agencyId = Convert.ToInt32(agencyData.AgencyId.ToString());
                }
            }

            return agencyId;
        }       
    }
}

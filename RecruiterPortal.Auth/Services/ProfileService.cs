using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using RecruiterPortal.Common;
using RecruiterPortalDAL.Managers;
using System.Dynamic;
using System.Security.Claims;

namespace RecruiterPortal.Auth.Services
{
    public class ProfileService : IProfileService
    {
        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                var claims = new ClaimsIdentity();
                var user = UserManager.GetUserByName(context.Subject.GetSubjectId());
                dynamic currentUserDynamic = new ExpandoObject();

                if (user != null)
                {
                    currentUserDynamic.UserID = user.UserId;
                    currentUserDynamic.First_Name = user.FirstName;
                    currentUserDynamic.Middle_Name = user.MiddleName;
                    currentUserDynamic.Last_Name = user.LastName;
                    currentUserDynamic.Email = user.Email;
                    currentUserDynamic.IsVerified = user.IsVerified;
                    currentUserDynamic.CreatedDate = user.CreatedDate;
                }

                if (currentUserDynamic != null)
                {
                    var currentUserJson = Newtonsoft.Json.JsonConvert.SerializeObject(currentUserDynamic);
                    claims.AddClaims(new[]
                    {
                        new Claim(Constants.CurrentUserClaim, currentUserJson)
                });
                }

                context.IssuedClaims = claims.Claims.ToList();
            }
            catch (Exception ex)
            {
                //Log.Write(ex);
            }

            return Task.FromResult(0);
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            try
            {
                var user = UserManager.GetUserByName(context.Subject.GetSubjectId());
                context.IsActive = user != null;
            }
            catch (Exception ex)
            {
                //Log.Write(ex);
            }
        }
    }
}
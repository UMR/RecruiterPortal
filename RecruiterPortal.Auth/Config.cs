using IdentityServer4;
using IdentityServer4.Models;
using RecruiterPortal.Common;
using RecruiterPortalDAL.Managers;
using System.Data;

namespace RecruiterPortal.Auth
{
    public class Config
    {
        public static List<string> GetOrigins()
        {
            List<string> origins = new List<string>();
            var dtAgency = AgencyManager.GetAgencies();
            origins.Add(Constants.HttpConstant + Constants.MainDomain);

            if (dtAgency != null && dtAgency.Rows.Count > 0)
            {
                foreach (DataRow item in dtAgency.Rows)
                {
                    if (!string.IsNullOrEmpty(item["URLPrefix"].ToString()))
                    {
                        origins.Add(Constants.HttpConstant + item["URLPrefix"].ToString() + "." + Constants.MainDomain);
                    }
                }
            }
            
            return origins;
        }
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(Constants.ApplicantPortalScope)
                {
                    ApiSecrets =
                    {
                        new Secret(Constants.ApplicantPortalScopeSecret.Sha256())
                    }               
                }
            };
        }
        
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName="Applicant Portal Web Client",
                    ClientId = Constants.WebClientId,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    AccessTokenType = AccessTokenType.Jwt,
                    AccessTokenLifetime = Constants.AccessTokenLifetime,
                    UpdateAccessTokenClaimsOnRefresh = true,
                    SlidingRefreshTokenLifetime = Constants.SlidingRefreshTokenLifetime,
                    AllowOfflineAccess = true,
                    RefreshTokenExpiration = TokenExpiration.Absolute,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    AlwaysSendClientClaims = true,
                    Enabled = true,
                    ClientSecrets=  new List<Secret> { new Secret(Constants.ApplicantPortalScopeSecret.Sha256()) },                    
                    AllowedCorsOrigins = GetOrigins(),
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        Constants.ApplicantPortalScope
                    }
                },
                new Client
                {
                    ClientName="Applicant Portal Android Client",
                    ClientId = Constants.AndroidClientId,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    AccessTokenType = AccessTokenType.Reference,
                    AccessTokenLifetime = Constants.AccessTokenLifetime,
                    UpdateAccessTokenClaimsOnRefresh = true,
                    SlidingRefreshTokenLifetime = Constants.SlidingRefreshTokenLifetime,
                    AllowOfflineAccess = true,
                    RefreshTokenExpiration = TokenExpiration.Absolute,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    AlwaysSendClientClaims = true,
                    Enabled = true,
                    ClientSecrets=  new List<Secret> { new Secret(Constants.ApplicantAndroidScopeSecret.Sha256()) },                    
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        Constants.ApplicantPortalScope
                    }
                }
            };
        }
    }
}

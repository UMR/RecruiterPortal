using RecruiterPortal.DAL.Models;

namespace RecruiterPortal.API.Services
{
    public interface IMailConfigurationService
    {
        string GetAuthorizationUrl(MailConfigurationRequest mailConfig);
        Task<GoogleToken> GetTokenByCode(string code);
        string FetchExchangeAuthorizationCode(string code, out string accessToken);
    }
}

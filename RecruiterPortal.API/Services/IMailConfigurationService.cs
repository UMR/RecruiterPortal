using RecruiterPortal.DAL.Models;
using System.Net.Mail;

namespace RecruiterPortal.API.Services
{
    public interface IMailConfigurationService
    {
        string GetAuthorizationUrl(MailConfigurationRequest mailConfig);

        Task<GoogleToken> GetTokenByCode(string code);

        bool SendEmail(SendMailRequest request);

        bool SendEmail(string email, MailMessage mailMessage);
    }
}

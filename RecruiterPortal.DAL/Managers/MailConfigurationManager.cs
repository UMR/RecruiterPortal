using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using RecruiterPortal.DAL.Models;
using RecruiterPortal.DAL.Repository;
using RecruiterPortal.DAL.SqlModels;
using System.Text;

namespace RecruiterPortalDAL.Managers
{
    public interface IMailConfigurationManager
    {
        string GetAuthorizationUrl(MailConfigurationRequest mailConfig);
    }

    public class MailConfigurationManager : IMailConfigurationManager
    {
        public readonly string ApplicationName = string.Empty;
        public readonly string ClientId = string.Empty;
        public readonly string ClientSecret = string.Empty;
        public readonly string RedirectURI = string.Empty;
        public readonly string Oaut2URI = "https://accounts.google.com/o/oauth2/auth?";
        public readonly string TokenURI = "https://accounts.google.com/o/oauth2/token";
        public readonly string GmailScopes = "https://www.googleapis.com/auth/userinfo.email " +
            "https://www.googleapis.com/auth/gmail.compose " +
            "https://www.googleapis.com/auth/gmail.send " +
            "https://www.googleapis.com/auth/gmail.modify " +
            "https://www.googleapis.com/auth/calendar " +
            "https://www.googleapis.com/auth/calendar.readonly " +
            "https://www.googleapis.com/auth/drive " +
            "https://www.googleapis.com/auth/drive.file " +
            "https://www.googleapis.com/auth/drive.appdata " +
            "https://www.googleapis.com/auth/drive.apps.readonly " +
            "https://www.google.com/m8/feeds/contacts/default/full/";

        private readonly IConfiguration _configuration;

        public MailConfigurationManager(IConfiguration configuration)
        {
            _configuration = configuration;
            ApplicationName = _configuration["Google:ApplicationName"];
            ClientId = _configuration["Google:ClientId"];
            ClientSecret = _configuration["Google:ClientSecret"];
            RedirectURI = _configuration["Google:RedirectUrl"];
        }

        public string GetAuthorizationUrl(MailConfigurationRequest mailConfig)
        {
            string splitOperator = "|";
            string state = mailConfig.ProfileName + splitOperator + mailConfig.GmailAddress;
            StringBuilder UrlBuilder = new StringBuilder(Oaut2URI);
            UrlBuilder.Append("client_id=" + ClientId);
            UrlBuilder.Append("&redirect_uri=" + RedirectURI);
            UrlBuilder.Append("&response_type=" + "code");
            UrlBuilder.Append("&scope=" + GmailScopes);
            UrlBuilder.Append("&access_type=" + "offline");
            UrlBuilder.Append("&state=" + state);
            UrlBuilder.Append("&prompt=" + "select_account");
            UrlBuilder.Append("&login_hint=" + mailConfig.GmailAddress);
            return UrlBuilder.ToString();
        }

        public const string POP3USERNAME = "trahman@ael-bd.com";
        public static ViewMailConfiguration GetEailConfigByAdress(string p_POP3UserName)
        {
            string spName = "sp_GetMailConfigByPOP3UserName";
            SqlParameter[] sqlParameters = new GenericRepository<ViewMailConfiguration>().GetSqlParametersFromStoredProcedure(spName);

            foreach (SqlParameter sqlParameter in sqlParameters)
            {
                if ("@" + nameof(p_POP3UserName) == sqlParameter.ParameterName)
                {
                    sqlParameter.Value = p_POP3UserName;
                }
            }
            ViewMailConfiguration mailVerfication = null;
            try
            {

                mailVerfication = new GenericRepository<ViewMailConfiguration>().GetOne(spName, sqlParameters);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return mailVerfication;
        }
    }
}

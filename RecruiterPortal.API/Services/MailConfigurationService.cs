using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using MimeKit;
using Newtonsoft.Json;
using RecruiterPortal.API.Services;
using RecruiterPortal.DAL.Models;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace RecruiterPortalDAL.Managers
{
    public class MailConfigurationService : IMailConfigurationService
    {
        public readonly string ApplicationName;
        public readonly string ClientId;
        public readonly string ClientSecret;
        public readonly string RedirectURI;
        public readonly string Oaut2URI;
        public readonly string TokenURI;
        public readonly string Scopes;

        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMailConfigurationManager _mailConfigurationManager;

        public MailConfigurationService(IConfiguration configuration, IHttpClientFactory httpClientFactory, IMailConfigurationManager mailConfigurationManager)
        {
            _configuration = configuration;
            ApplicationName = _configuration["Google:ApplicationName"];
            ClientId = _configuration["Google:ClientId"];
            ClientSecret = _configuration["Google:ClientSecret"];
            RedirectURI = _configuration["Google:RedirectUrl"];
            Scopes = _configuration["Google:Scopes"];
            Oaut2URI = _configuration["Google:OAuth2"];
            TokenURI = _configuration["Google:TokenURI"];
            _httpClientFactory = httpClientFactory;
            _mailConfigurationManager =mailConfigurationManager;
        }

        public string GetAuthorizationUrl(MailConfigurationRequest mailConfig)
        {
            string splitOperator = "|";
            string state = mailConfig.ProfileName + splitOperator + mailConfig.EmailAddress + splitOperator + mailConfig.Id;
            StringBuilder UrlBuilder = new StringBuilder(Oaut2URI);
            UrlBuilder.Append("?client_id=" + ClientId);
            UrlBuilder.Append("&redirect_uri=" + RedirectURI);
            UrlBuilder.Append("&response_type=" + "code");
            UrlBuilder.Append("&scope=" + Scopes);
            UrlBuilder.Append("&access_type=" + "offline");
            UrlBuilder.Append("&state=" + state);
            UrlBuilder.Append("&prompt=" + "select_account");
            UrlBuilder.Append("&login_hint=" + mailConfig.EmailAddress);
            return UrlBuilder.ToString();
        }

        public async Task<GoogleToken> GetTokenByCode(string code)
        {
            GoogleToken googleToken = null;
            using (var httpClient = _httpClientFactory.CreateClient())
            {
                httpClient.BaseAddress = new Uri(TokenURI);
                var contentBody = $"code={code}&client_id={ClientId}&client_secret={ClientSecret}&redirect_uri={RedirectURI}&grant_type=authorization_code";
                var content = new StringContent(contentBody, Encoding.UTF8, "application/x-www-form-urlencoded");
                var response = await httpClient.PostAsync(string.Empty, content);
                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    var returnedToken = JsonConvert.DeserializeObject<GoogleToken>(responseBody);
                    if (returnedToken.access_token != null && returnedToken.refresh_token != null)
                    {
                        googleToken = returnedToken;
                    }
                }
            }

            return googleToken;
        }

        public MailMessage GetMailMessage(string fromAddress, string toAddress, string subject, string body) 
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromAddress);
            message.To.Add(new MailAddress(toAddress));
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = true;
            //message.Attachments.Add(new Attachment(new MemoryStream(resumeFileData), resumeFileName));
            return message;
        }

        public bool SendEmail(string email, MailMessage mailMessage) 
        {
            try
            {
                MimeMessage mimeMessage = MimeMessage.CreateFromMailMessage(mailMessage);
                Message gmailMessage = new Message();
                gmailMessage.Raw = base64UrlEncode(mimeMessage.ToString());

                GmailService gmailService = getGmailService(email);
                var result = gmailService.Users.Messages.Send(gmailMessage, "me").Execute();
                if (result != null && result.LabelIds.Count > 0 && result.LabelIds.Contains("SENT"))
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
            
            return false;

        }

        private GmailService getGmailService(string emailAddress)
        {
            var credential =  GetUserCredential(emailAddress).Result;
            if (credential != null)
            {
                return new GmailService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = ApplicationName
                });
            }

            return null;
        }

        private async Task<UserCredential> GetUserCredential(string email)
        {
            TokenResponse respnseToken = null;
            UserCredential credential = null;            
            IAuthorizationCodeFlow flow = AuthorizationCodeFlow();            
            var mailConfiguration = await _mailConfigurationManager.GetMailConfigByEmail(email);
            if (mailConfiguration != null)
            {                
                respnseToken = new TokenResponse() { RefreshToken = mailConfiguration.GoogleRefreshToken };
            }
            
            if (flow != null && respnseToken != null)
            {
                credential = new UserCredential(flow, "user", respnseToken);
            }
            
            if (credential.Token != null)
            {                
               await  _mailConfigurationManager.Update(email, credential.Token.RefreshToken);
            }

            return credential;
        }       

        private IAuthorizationCodeFlow AuthorizationCodeFlow()
        {
            return new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets()
                {
                    ClientId = ClientId,
                    ClientSecret = ClientSecret
                },
                Scopes = Scopes.Split(" ")
            });
        }

        private string fetchExchangeAuthorizationCode(string code, out string accessToken)
        {
            accessToken = string.Empty;
            string refreshToken = string.Empty;
            var contentBody = $"code={code}&client_id={ClientId}&client_secret={ClientSecret}&redirect_uri={RedirectURI}&grant_type=authorization_code";
            var request = WebRequest.Create(TokenURI);
            request.Method = "POST";
            byte[] byteArray = Encoding.UTF8.GetBytes(contentBody);
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = byteArray.Length;

            using (Stream dataStream = request.GetRequestStream())
            {
                dataStream.Write(byteArray, 0, byteArray.Length);
                dataStream.Close();
            }

            var response = (HttpWebResponse)request.GetResponse();
            Stream responseDataStream = response.GetResponseStream();
            StreamReader streamReader = new StreamReader(responseDataStream);
            string responseData = streamReader.ReadToEnd();
            streamReader.Close();
            responseDataStream.Close();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                var returnedToken = JsonConvert.DeserializeObject<GoogleToken>(responseData);
                if (returnedToken.refresh_token != null)
                {
                    accessToken = returnedToken.access_token;
                    refreshToken = returnedToken.refresh_token;
                }
            }

            return refreshToken;
        }

        private string base64UrlEncode(string input)
        {
            var inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
            return Convert.ToBase64String(inputBytes)
              .Replace('+', '-')
              .Replace('/', '_')
              .Replace("=", "");
        }

    }
}

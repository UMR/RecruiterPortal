using Azure.Core;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Ocsp;
using RecruiterPortal.API.Services;
using RecruiterPortal.DAL.Models;
using System.Net;
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

        public MailConfigurationService(IConfiguration configuration, IHttpClientFactory httpClientFactory)
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
        }

        public string GetAuthorizationUrl(MailConfigurationRequest mailConfig)
        {
            string splitOperator = "|";
            string state = mailConfig.ProfileName + splitOperator + mailConfig.EmailAddress;
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
                    if (returnedToken.access_token !=null && returnedToken.refresh_token != null)
                    {
                        googleToken= returnedToken;
                    }                    
                }                
            }

            return googleToken;
        }

        public string FetchExchangeAuthorizationCode(string code, out string accessToken)
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
    }
}

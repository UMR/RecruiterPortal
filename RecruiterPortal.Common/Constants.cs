namespace RecruiterPortal.Common
{
    public class Constants
    {
        //LocalHost
        public const string AuthorizationServerPath = "http://localhost:5191";
        public const string ResourceServerPath = "http://localhost:6001";        
        public const bool IsProductionBuild = false;
        public const int AccessTokenLifetime = 3600;
        public const int SlidingRefreshTokenLifetime = 1296000;
        public const string MainDomain = "localhost:4200";
        public const string HttpConstant = "http://";

        //umrtest.com
        //public const string AuthorizationServerPath = "http://www.umrtest.com/ApplicantPortalAPIAuthorizationServer";
        //public const string ResourceServerPath = "http://www.umrtest.com/ApplicantPortalAPIResourceServer";
        ////public static List<string> WebClientServerPaths = new List<string> { "http://www.umrtest.com", "http://umrtest.com", "http://localhost" };
        //public const bool IsProductionBuild = true;
        //public const int AccessTokenLifetime = 600;
        //public const int SlidingRefreshTokenLifetime = 1800;
        //public const string MainDomain = "umrtest.com";
        //public const string HttpConstant = "http://";

        //mechatronicssolutionscorp.com/
        //public const string AuthorizationServerPath = "https://www.mechatronicssolutionscorp.com/ApplicantPortalAPIAuthorizationServer";
        //public const string ResourceServerPath = "https://www.mechatronicssolutionscorp.com/ApplicantPortalAPIResourceServer";
        //public static List<string> WebClientServerPaths = new List<string> { "http://www.mechatronicssolutionscorp.com", "http://mechatronicssolutionscorp.com","https://www.mechatronicssolutionscorp.com", "https://mechatronicssolutionscorp.com", "http://localhost" };
        //public const bool IsProductionBuild = true;
        //public const int AccessTokenLifetime = 600;
        //public const int SlidingRefreshTokenLifetime = 1800;
        //public const string MainDomain = "mechatronicssolutionscorp.com";
        //public const string HttpConstant = "https://";

        ///////////////////// Grandel Rehab //////////////////////
        //public const string AuthorizationServerPath = "http://www.mechatronicssolutionscorp.com/GrandelRehabApplicantPortalAPIAuthorizationServer";
        //public const string ResourceServerPath = "http://www.mechatronicssolutionscorp.com/GrandelRehabApplicantPortalAPIResourceServer";
        //public static List<string> WebClientServerPaths = new List<string> { "http://www.mechatronicssolutionscorp.com", "http://mechatronicssolutionscorp.com", "http://localhost" };
        //public const bool IsProductionBuild = true;
        //public const int AccessTokenLifetime = 600;
        //public const int SlidingRefreshTokenLifetime = 1800;
        //public const string MainDomain = "mechatronicssolutionscorp.com";
        //public const string HttpConstant = "https://";

        //universalmedicalrecord.com
        //public const string AuthorizationServerPath = "https://www.universalmedicalrecord.com/ApplicantPortalAPIAuthorizationServer";
        //public const string ResourceServerPath = "https://www.universalmedicalrecord.com/ApplicantPortalAPIResourceServer";
        //public static List<string> WebClientServerPaths = new List<string> { "http://www.universalmedicalrecord.com", "http://universalmedicalrecord.com", "http://localhost","https://www.universalmedicalrecord.com", "https://universalmedicalrecord.com" };
        //public const bool IsProductionBuild = true;
        //public const int AccessTokenLifetime = 600;
        //public const int SlidingRefreshTokenLifetime = 1800;
        //public const string MainDomain = "universalmedicalrecord.com";
        //public const string HttpConstant = "https://";

        //SPIKE
        //public const string AuthorizationServerPath = "http://172.16.205.67/ApplicantPortalAPIAuthorizationServer";
        //public const string ResourceServerPath = "http://172.16.205.67/ApplicantPortalAPIResourceServer";
        //public static List<string> WebClientServerPaths = new List<string> { "http://172.16.205.67/ApplicantPortalSPA", "http://spike.com", "http://localhost" };
        //public const bool IsProductionBuild = true;
        //public const int AccessTokenLifetime = 600;
        //public const int SlidingRefreshTokenLifetime = 1800;
        //public const string MainDomain = "172.16.205.67";

        //192.168.1.12 New Server
        //public const string AuthorizationServerPath = "http://192.168.1.12/ApplicantPortalAPIAuthorizationServer";
        //public const string ResourceServerPath = "http://192.168.1.12/ApplicantPortalAPIResourceServer";
        //public static List<string> WebClientServerPaths = new List<string> { "http://192.168.1.12", "http://localhost" };
        //public const bool IsProductionBuild = true;
        //public const int AccessTokenLifetime = 600;
        //public const int SlidingRefreshTokenLifetime = 1800;
        //public const string MainDomain = "192.168.1.12";

        //Common
        public const string CurrentUserClaim = "currentUser";
        public const string TokenPath = "/connect/token";
        public const string UserinfoPath = "/connect/userinfo";
        public const string IntrospectPath = "/connect/introspect";
        public const string RevocationPath = "/connect/revocation";
        public const string ApplicantPortalScope = "umrapplicants";
        public const string ApplicantPortalScopeSecret = "apiSecret";
        public const string ApplicantAndroidScopeSecret = "androidApiSecret";
        public const string WebClientId = "apiclientid";
        public const string AndroidClientId = "androidApplicantClient";
        public const string CorsGlobalPolicy = "corsGlobalPolicy";
    }
}

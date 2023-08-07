using IdentityServer4.AccessTokenValidation;

namespace RecruiterPortal.API.Configurations
{
    public static class IdentityServerServicesRegistration
    {
        public static WebApplicationBuilder ConfigureIdentityServerServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                  .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, options =>
                  {
                      options.Authority = builder.Configuration["IdentityServer:Authority"];
                      options.RequireHttpsMetadata = false;
                      options.ApiName = builder.Configuration["IdentityServer:ApiName"];
                  });

            return builder;
        }
    }
}

using IdentityServer4.AccessTokenValidation;

namespace RecruiterPortal.API.Configurations
{
    public static class IdentityServerServicesRegistration
    {
        public static WebApplicationBuilder ConfigureIdentityServerServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                  .AddIdentityServerAuthentication(
                    IdentityServerAuthenticationDefaults.AuthenticationScheme, options =>
                  {
                      options.Authority = builder.Configuration["IdentityServer:Authority"];
                      options.RequireHttpsMetadata = false;
                      options.Audience = builder.Configuration["IdentityServer:ApiName"];
                      options.TokenValidationParameters.ValidateIssuer = false;
                  },
                  null
            );

            return builder;
        }
    }
}

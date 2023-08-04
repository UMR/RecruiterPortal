using RecruiterPortal.Auth.Extensions;
using System.Security.Cryptography.X509Certificates;

namespace RecruiterPortal.Auth.Configurations
{
    public static class IdentityServerServicesRegistration
    {
        public static IServiceCollection ConfigureIdentityServerServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentityServer()
            .AddSigningCredential(new X509Certificate2(Path.Combine("idsrv3test.pfx"), "idsrv3test"))
            .AddInMemoryApiResources(configuration.GetSection("IdentityServer:ApiResources"))
            .AddInMemoryApiScopes(configuration.GetSection("IdentityServer:ApiScopes"))
            .AddInMemoryClients(configuration.GetSection("IdentityServer:Clients"))
            .AddCustomUserStore();

            return services;
        }
    }
}

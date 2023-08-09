using IdentityServer4.Models;
using Newtonsoft.Json;
using RecruiterPortal.Auth.Extensions;
using System.Security.Cryptography.X509Certificates;

namespace RecruiterPortal.Auth.Configurations
{
    public static class IdentityServerServicesRegistration
    {
        public static IServiceCollection ConfigureIdentityServerServices(this IServiceCollection services, IConfiguration configuration)
        {
            //var clients = configuration.GetSection("IdentityServer").GetChildren().Select(x=>x.Value);

            services.AddIdentityServer()
            .AddSigningCredential(new X509Certificate2(Path.Combine("idsrv3test.pfx"), "idsrv3test"))
            .AddInMemoryApiResources(configuration.GetSection("IdentityServer:ApiResources"))
            .AddInMemoryApiScopes(configuration.GetSection("IdentityServer:ApiScopes"))
            .AddInMemoryClients(GetClients())
            .AddCustomUserStore();

            return services;
        }

        public static List<Client> GetClients() 
        {
            List<Client> clients = new List<Client>();

            using (StreamReader reader = new StreamReader("clients.json"))
            {
                clients = JsonConvert.DeserializeObject<List<Client>>(reader.ReadToEnd());
                foreach (dynamic client in clients)
                {
                    var corsOrigin = client.AllowedCorsOrigins;
                }
            }

            return clients;
        }
    }
    
}

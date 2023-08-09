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
            services.AddIdentityServer()
            .AddSigningCredential(new X509Certificate2(Path.Combine("idsrv3test.pfx"), "idsrv3test"))
            .AddInMemoryApiResources(configuration.GetSection("IdentityServer:ApiResources"))
            .AddInMemoryApiScopes(configuration.GetSection("IdentityServer:ApiScopes"))
            .AddInMemoryClients(GetClients(configuration))
            .AddCustomUserStore();

            return services;
        }

        public static List<Client> GetClients(IConfiguration configuration)
        {
            List<Client> clients = configuration.GetSection("IdentityServer:Clients").Get<List<Client>>();                        

            foreach (var client in clients)
            {
                List<string> allowedCorsOrigins = new List<string>();
                allowedCorsOrigins.Add("http://umrtest.com");

                foreach (var corsOrigin in client.AllowedCorsOrigins)
                {
                    allowedCorsOrigins.Add(corsOrigin);
                }

                client.AllowedCorsOrigins = allowedCorsOrigins;
            }
            

            return clients;
        }

        public static List<Client> GetClientsFromJson()
        {
            List<Client> clients = new List<Client>();

            using (StreamReader reader = new StreamReader("clients.json"))
            {
                clients = JsonConvert.DeserializeObject<List<Client>>(reader.ReadToEnd());
                List<string> allowedCorsOrigins = new List<string>();
                foreach (dynamic client in clients)
                {
                    client.AllowedCorsOrigins.Add("Http://localhost:7000");
                }
            }

            return clients;
        }
    }

}

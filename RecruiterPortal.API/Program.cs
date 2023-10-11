using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using RecruiterPortal.API.Configurations;
using RecruiterPortal.API.Services;
using RecruiterPortalDAL.Managers;
using Serilog;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

builder.ConfigureIdentityServerServices();
builder.Services.AddHttpClient();
builder.Services.AddScoped<IMailConfigurationManager, MailConfigurationManager>();
builder.Services.AddScoped<IMailConfigurationService, MailConfigurationService>();

builder.Services.AddCors(o =>
{
    o.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

builder.Services.AddControllers(config =>
{
    config.Filters.Add(new AuthorizeFilter(new AuthorizationPolicyBuilder().
        RequireAuthenticatedUser().
        RequireClaim(builder.Configuration["IdentityServer:ClaimType"], builder.Configuration["IdentityServer:ClaimValue"]).Build()));
}).AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.PropertyNamingPolicy = null;
     });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

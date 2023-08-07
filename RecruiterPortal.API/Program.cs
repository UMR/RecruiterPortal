using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using RecruiterPortal.API.Configurations;

var builder = WebApplication.CreateBuilder(args);
builder.ConfigureIdentityServerServices();

builder.Services.AddControllers(config =>
{
    config.Filters.Add(new AuthorizeFilter(new AuthorizationPolicyBuilder().
        RequireAuthenticatedUser().
        RequireClaim(builder.Configuration["IdentityServer:ClaimType"], builder.Configuration["IdentityServer:ClaimValue"]).Build()));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

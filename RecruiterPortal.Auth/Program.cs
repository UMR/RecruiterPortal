using RecruiterPortal.Auth.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureIdentityServerServices(builder.Configuration);
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseIdentityServer();

app.MapControllers();

app.Run();

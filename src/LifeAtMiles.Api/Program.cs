using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//TODO: flytt client-id fra appsettings.Development.json til Azure Key Vault

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { 
        Title = "Life at Miles API", 
        Version = "v1",
        Description = "Backend API for Life at Miles web application"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://*.miles.no")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://accounts.google.com";
        options.Audience = builder.Configuration["Authentication:Google:ClientId"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuers = new[] { 
                "https://accounts.google.com", 
                "accounts.google.com" 
            },
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

// Health check endpoint
app.MapGet("/health", () => Results.Ok("Healthy"))
    .WithName("Health")
    .WithOpenApi();

// Authentication test endpoint
app.MapGet("/auth/test", (HttpContext context) =>
{
    var email = context.User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
    return Results.Ok(new 
    { 
        message = "Authentication successful!",
        email,
        timestamp = DateTime.UtcNow
    });
})
.RequireAuthorization()
.WithName("AuthTest")
.WithOpenApi()
.WithDescription("Test endpoint to verify Google authentication is working");

app.Run();

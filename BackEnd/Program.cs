using System.Text;
using BackEnd;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddHttpContextAccessor();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("defaultConnection"));
            });

var fronEnd_url = builder.Configuration.GetValue<string>("Frontend_Url");

// builder.Services.AddCors(options =>
//             {
//                 options.AddDefaultPolicy(builder =>
//                 {
//                     builder.WithOrigins(fronEnd_url).AllowAnyMethod().AllowAnyHeader()
//                     .WithExposedHeaders(new string[] { "cantidadTotalRegistros" });
//                 });
//             });

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opciones =>
                opciones.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["llaveJwt"])
                    ),
                    ClockSkew = TimeSpan.Zero
                });

builder.Services.AddAuthorization(opciones =>
            {
                opciones.AddPolicy("EsAdmin", policy => policy.RequireClaim("role", "admin"));
            });

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .WithOrigins(fronEnd_url)
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithExposedHeaders(new string[] { "cantidadTotalRegistros" })
);

app.UseHttpsRedirection();

app.UseRouting();



app.UseAuthentication();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();

using BackEnd.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BackEnd;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>()
            .Property(u => u.PasswordReset)
            .HasDefaultValue(false);

        builder.Entity<ApplicationUser>()
            .Property(u => u.Active)
            .HasDefaultValue(true);

        builder.Entity<Pokemon>().Property(p => p.Pokedex).ValueGeneratedNever();

        builder.Entity<Pokemon>().Property(p => p.FechaCreacion).HasDefaultValueSql("GETDATE()");
    }

    public DbSet<Tipo> Tipos { get; set; }
    public DbSet<Pokemon> Pokemons { get; set; }
}
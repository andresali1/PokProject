using BackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackEnd;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Tipo> Tipos { get; set; }
}
using System;
using System.Collections.Generic;
using InventorymanagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventorymanagementSystem.InventoryDbContext;

public class InventoryManagementContext : DbContext
{
    public InventoryManagementContext()
    {
    }

    public InventoryManagementContext(DbContextOptions<InventoryManagementContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<Stock> Stocks { get; set; }

    public virtual DbSet<Store> Stores { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=DESKTOP-V0NPQLO;Database=Inventorysys;Trusted_Connection=True;Integrated Security=True;TrustServerCertificate=true;MultipleActiveResultSets=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>();

        modelBuilder.Entity<Stock>();

        modelBuilder.Entity<Store>();

        modelBuilder.Entity<User>();


    }


}

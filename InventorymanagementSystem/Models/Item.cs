using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventorymanagementSystem.Models;

public partial class Item
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ItemId { get; set; }

    public string ItemCode { get; set; } = null!;

    public string ItemName { get; set; } = null!;

    public string? BrandName { get; set; }

    public string UnitOfMeasurement { get; set; } = null!;

    public decimal PurchaseRate { get; set; }

    public decimal SalesRate { get; set; }

    public bool IsActive { get; set; } = true;

    
}

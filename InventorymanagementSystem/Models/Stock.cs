using System;
using System.Collections.Generic;

namespace InventorymanagementSystem.Models;

public partial class Stock
{
    public int StockId { get; set; }

    public int StoreId { get; set; }

    public int ItemId { get; set; }

    public int Quantity { get; set; }

    public DateTime? ExpiryDate { get; set; }



}

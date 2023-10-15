import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { StockService } from 'src/app/services/stock.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
})
export class StockAddComponent {
  stock: any = {};
  stores: any[] = [];
  items: any[] = [];

  quantity: number = 0;
  expiryDate!: Date;
  itemId: number = 0;
  storeId: number = 0;


  constructor(private inventoryService: InventoryService, private storeService: StoreService, private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    // Fetch store and item data from backend
    this.storeService.getStore().subscribe((data: any) => {
      this.stores = data;
    });
    this.inventoryService.getItems().subscribe((data: any) => {
      this.items = data;
    });
  }

  createStock() {
    const stock = {
      quantity: this.quantity,
      expiryDate: this.expiryDate,
      itemId: this.itemId,
      storeId: this.storeId
    };
    this.stockService.createStocks(this.stock).subscribe((response) => {
      console.log("stock added sucessfully");
      this.router.navigate(['/stocks']);
    });

  }
}

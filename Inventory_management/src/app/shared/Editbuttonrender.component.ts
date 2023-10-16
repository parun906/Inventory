import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { StockService } from '../services/stock.service';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-button',
  template: `
    
    <button (click)="onDeleteClick()">Delete</button>
  `,
})
export class DeleteButtonComponent {
  private params: any;
  constructor(private inventoryService: InventoryService, private stockService: StockService, private storeService: StoreService,private router: Router) { };

  agInit(params: any): void {
    this.params = params;
  }

  onDeleteClick(): void {
    if (this.params.data.itemId) {
      this.inventoryService.deleteItem(this.params.data.itemId).subscribe((response) => {
        if (response) {
          console.log("item deleted");
          this.router.navigate(['/item']);
        }
      });
    }
    else if (this.params.data.stockId) {
      this.stockService.deleteStock(this.params.data.stockId).subscribe((response) => {
        if (response) {
          console.log("stock deleted");
          this.router.navigate(['/stock']);
        }
      });
    }
    else if (this.params.data.storeId) {
      this.storeService.deleteStore(this.params.data.storeId).subscribe((response) => {
        if (response) {
          console.log("store deleted");
        }
        this.router.navigate(['/store']);
      });
    }
    else {
      console.log("param has no data");
    }
  }
}

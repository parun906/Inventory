import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { StockService } from 'src/app/services/stock.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
})
export class StockAddComponent {
  stockForm: FormGroup; // Define the form group
  stores: any[] = [];
  items: any[] = [];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private storeService: StoreService,
    private stockService: StockService,
    private router: Router
  ) {
    this.stockForm = this.fb.group({
      quantity: ['', Validators.required],
      expiryDate: ['', Validators.required],
      storeId: ['', Validators.required],
      itemId: ['', Validators.required],
    });
  }

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
    if (this.stockForm.valid) {
      const stock = this.stockForm.value;

      this.stockService.createStocks(stock).subscribe((response) => {
        console.log('Stock added successfully');
        this.router.navigate(['/stocks']);
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { StockService } from 'src/app/services/stock.service';
import { StoreService } from 'src/app/services/store.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
})
export class StockUpdateComponent {
  stockUpdateForm: FormGroup; // Define the form group
  stores: any[] = [];
  items: any[] = [];
  stocks: any[]=[];
  stockId: number=0;
  selectedStock: any;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private storeService: StoreService,
    private stockService: StockService,
    private datePipe: DatePipe,
    private router: Router,private route: ActivatedRoute
  ) {
    this.stockUpdateForm = this.fb.group({
      stockId: [''],
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
   
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.stockId = +idParam;
    
    this.stockService.getStocks().subscribe((data: any) => {
      this.stocks = data;
      this.selectedStock = this.stocks.find(stock => stock.stockId === this.stockId);       
      if (this.selectedStock) {
        this.stockUpdateForm.patchValue({
          stockId: this.stockId,
          quantity: this.selectedStock.quantity, 
          expiryDate: this.datePipe.transform(this.selectedStock.expiryDate, 'yyyy-MM-dd'),
          storeId: this.selectedStock.storeId,
          itemId: this.selectedStock.itemId
        });
      }
    });
    }
  }
  updateStock() {
    if (this.stockUpdateForm.valid) {
      const stockData = this.stockUpdateForm.value;
      this.stockService.updateStock(this.stockId, stockData).subscribe((response) => {
          console.log('stock updated successfully:', response);
          this.router.navigate(['stocks/list']);
        });
      
    }
  }
}

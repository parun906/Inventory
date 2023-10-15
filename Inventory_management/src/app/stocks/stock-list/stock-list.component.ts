import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { DeleteButtonComponent } from 'src/app/shared/Editbuttonrender.component';
import { EditButtonRendererComponent } from 'src/app/shared/edit-button-renderer/edit-button-renderer.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
})
export class StockListComponent {
  items: any[] = [];
  columnDefs = [
    { headerName: 'stock ID', field: 'stockId', width: 150 },
    { headerName: 'Quantity', field: 'quantity', width: 150 },
    { headerName: 'Expiry Date', field: 'expiryDate', width: 300 },

    { headerName: 'Store Name', field: 'storeName', width: 400 },
    { headerName: 'Item Name', field: 'itemName', width: 200 },
    {
      headerName: 'Edit',
      cellRenderer: 'editButtonRenderer', 
      
    },
    {
      headerName: 'Delete',
      cellRenderer: 'deleteButtonRenderer', 
      
    }
  ];
  gridOptions: any = {
    components: {
      deleteButtonRenderer: DeleteButtonComponent,
      editButtonRenderer: EditButtonRendererComponent 
    },
  };

  rowData: any[] = [];


  constructor(
    private stockService: StockService,private router:Router
  ) { }


  ngOnInit() {
    this.loadItems();

  }

  loadItems() {
    this.stockService.getStocks().subscribe((stocks) => {
      if (stocks) {
        this.rowData = stocks;

      }
    })
  };
  onEditButtonClick(itemId: any): void {
    
    this.router.navigate(['/update', itemId]);
  }
}

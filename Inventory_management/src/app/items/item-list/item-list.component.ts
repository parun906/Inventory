import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { DeleteButtonComponent } from 'src/app/shared/Editbuttonrender.component';
import { EditButtonRendererComponent } from 'src/app/shared/edit-button-renderer/edit-button-renderer.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent {
  items: any[] = [];
  columnDefs = [
    { headerName: 'Item ID', field: 'itemId', width: 150 },
    { headerName: 'Item Code', field: 'itemCode', width: 150 },
    { headerName: 'Item Name', field: 'itemName', width: 300 },
    {
      headerName: 'Brand Name',
      field: 'brandName', width: 300,
      valueGetter: (params: { data: { brandName: any; }; }) => params.data.brandName || 'N/A', // Provide a default value if brandName is null
    },
    { headerName: 'Unit of Measurement', field: 'unitOfMeasurement', width: 300 },
    { headerName: 'Purchase Rate', field: 'purchaseRate', width: 300 },
    { headerName: 'Sales Rate', field: 'salesRate', width: 100 },
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
      editButtonRenderer: EditButtonRendererComponent // Use lowercase 'editButtonRenderer'
    },
  };

  rowData: any[] = [];
  searchText: string = '';

  applyFilter() {
    if (this.searchText) {
      this.inventoryService.filterItemsByName(this.searchText).subscribe((filteredItems) => {
        this.rowData = filteredItems;
      });
    } else {
      this.loadItems();
    }
  }



  constructor(
    private inventoryService: InventoryService,private router: Router ) {}


    ngOnInit() {
      this.applyFilter(); 
    }
    

  loadItems() {
    if (!this.searchText) {
      this.inventoryService.getItems().subscribe((items) => {
        if (items) {
          this.rowData = items;
        }
      });
    }
  }
  
  // onEditButtonClick(itemId: any): void {
    
  //   this.router.navigate(['/update', itemId]); 
  // }
  // onDeleteButtonClick(id: any): void {
  //   this.inventoryService.deleteItem(id);
  //   this.router.navigate(['/items']);
  // }
}
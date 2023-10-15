import { Component, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { EditButtonRendererComponent } from '../edit-button-renderer/edit-button-renderer.component';
import { DeleteButtonComponent } from '../Editbuttonrender.component';

@Component({
  selector: 'app-inventory-grid',
  templateUrl: './inventory-grid.component.html',
})
export class InventoryGridComponent {
  @Input() rowData: any[]=[];
  @Input() columnDefs: any[]=[];
  gridOptions: GridOptions;

  constructor() {
    this.gridOptions = {
      components: {
        editButtonRenderer: EditButtonRendererComponent,
        deleteButtonRenderer: DeleteButtonComponent
      }
    };
  }

  ngOnInit() {
    // Set the provided rowData and columnDefs to the gridOptions
    this.gridOptions.rowData = this.rowData;
    this.gridOptions.columnDefs = this.columnDefs;
   
  }

 
}

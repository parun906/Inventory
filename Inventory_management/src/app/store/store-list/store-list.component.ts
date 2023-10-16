import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { DeleteButtonComponent } from 'src/app/shared/Editbuttonrender.component';
import { EditButtonRendererComponent } from 'src/app/shared/edit-button-renderer/edit-button-renderer.component';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
})
export class StoreListComponent {
  columnDefs = [
    { headerName: 'store ID', field: 'storeId', width: 150 },
    { headerName: 'Store Name', field: 'storeName', width: 150 },
    {
      headerName: 'Edit',
      cellRenderer: 'editButtonRenderer',

    },
    {
      headerName: 'Delete',
      cellRenderer: 'deleteButtonRenderer',

    }
  ]
  rowData: any[] = [];
  gridOptions: any = {
    components: {
      deleteButtonRenderer: DeleteButtonComponent,
      editButtonRenderer: EditButtonRendererComponent 
    },
  };
  constructor(
    private storeService: StoreService, private router: Router) { }


  ngOnInit() {
    this.loadItems();
  }

  loadItems() {

    this.storeService.getStore().subscribe((stores) => {
      if (stores) {
        this.rowData = stores;
      }
    });

  }
}

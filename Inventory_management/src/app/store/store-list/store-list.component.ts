import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
})
export class StoreListComponent {
  columnDefs = [
    { headerName: 'store ID', field: 'storeId', width: 150 },
    { headerName: 'Store Name', field: 'storeName', width: 150 },
  ]
  rowData: any[] = [];
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

import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
})
export class StoreComponent {
  response: any[]=[];
  constructor(private inventoryService: InventoryService){
    this.inventoryService.getAll().subscribe((items) => {
      if (items) {
        this.response=items;
        
      }
    });;
  }

  
}

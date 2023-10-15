import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
})
export class ItemUpdateComponent {
  itemData: any = {}; 
  

  constructor(private inventoryService: InventoryService,private router: Router,private route: ActivatedRoute) {
    
  }

  updateItem() {
    
    this.inventoryService.updateItem(this.itemData.itemId, this.itemData).subscribe(response => {
      console.log('Item added successfully:', response)});
    this.router.navigate(["items/list"]);
  }
}





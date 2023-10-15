import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-delete-button',
  template: `
    
    <button (click)="onDeleteClick()">Delete</button>
  `,
})
export class DeleteButtonComponent {
  private params: any;
  constructor(private inventoryService: InventoryService){};

  agInit(params: any): void {
    this.params = params;
  }

  onDeleteClick(): void {
    
      
      this.inventoryService.deleteItem(this.params.data.itemId).subscribe((response) => {
        if (response) {
         console.log("item deleted");
        }
      });
    
  }
}

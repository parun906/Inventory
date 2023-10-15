import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';

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
    if (this.params.onClick) {
      this.params.onClick(this.params.node.data.id);
      this.inventoryService.removeItem(this.params.node.data.id).subscribe((response) => {
        if (response) {
         console.log("item deleted");
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
constructor(private inventoryService: InventoryService){}
}

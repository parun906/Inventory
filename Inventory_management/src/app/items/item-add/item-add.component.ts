import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/inventory.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
})
export class ItemAddComponent {
  
  itemCode: string = "";
  itemName: string= "";
  brandName: string= "";
  unitOfMeasurement: string= "";
  purchaseRate: string= "";
  salesRate: string= "";
  itemData:any[]=[];
 



  constructor(private fb: FormBuilder,private inventoryService: InventoryService,private router:Router) {
    
  }


  onSubmit() {
   
    const itemData = {
      
      itemCode: this.itemCode,
      itemName: this.itemName,
      brandName: this.brandName,
      unitOfMeasurement: this.unitOfMeasurement,
      purchaseRate: this.purchaseRate,
      salesRate: this.salesRate
    };

    // Call the service to add the item
    this.inventoryService.addItem(itemData).subscribe(response => {
      console.log('Item added successfully:', response);
      this.router.navigate(['/items']); 
    });

  }
 
}

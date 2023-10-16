import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
})
export class ItemUpdateComponent {
  // itemData: any = {}; 
  

  // constructor(private inventoryService: InventoryService,private router: Router,private route: ActivatedRoute) {
    
  // }

  // updateItem() {
    
  //   this.inventoryService.updateItem(this.itemData.itemId, this.itemData).subscribe(response => {
  //     console.log('Item added successfully:', response)});
  //   this.router.navigate(["items/list"]);
  // }
  stockUpdateForm: FormGroup; // Define the form group
  itemData: any = {};

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stockUpdateForm = this.fb.group({
      itemId: ['',Validators.required], 
      itemCode: ['', Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      itemName: ['', Validators.required,Validators.pattern(/^[a-zA-Z]+$/)],
      brandName: ['',Validators.required,Validators.pattern(/^[a-zA-Z]+$/)],
      unitOfMeasurement: ['', Validators.required,Validators.pattern(/^[a-zA-Z]+$/)],
      purchaseRate: ['', Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      salesRate: ['', Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    });

   
  }

 

  updateItem() {
    if (this.stockUpdateForm.valid) {
      const updatedItemData = this.stockUpdateForm.value;

      this.inventoryService
        .updateItem(updatedItemData.itemId, updatedItemData)
        .subscribe((response) => {
          console.log('Item updated successfully:', response);
          this.router.navigate(['items/list']);
        });
    }
  }
}





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
  
  itemUpdateForm: FormGroup; // Define the form group
  itemData: any = {};
  itemId: number= 0;
  selectedItems: any;
  items: any[]= [];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemUpdateForm = this.fb.group({
      // itemId: [''], 
      itemCode: ['', Validators.required],
      itemName: ['', Validators.required],
      brandName: ['',Validators.required],
      unitOfMeasurement: ['', Validators.required],
      purchaseRate: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      salesRate: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });

   
  }

  ngOnInit(): void {
   
   
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.itemId = +idParam;
    
    this.inventoryService.getItems().subscribe((data: any) => {
      this.items = data;
      this.selectedItems = this.items.find(item => item.itemId === this.itemId);       
      if (this.selectedItems) {
        this.itemUpdateForm.patchValue({
        //  itemId: this.itemId,
         itemCode: this.selectedItems.itemCode,
         itemName: this.selectedItems.itemName,
         brandName: this.selectedItems.brandName,
         unitOfMeasurement: this.selectedItems.unitOfMeasurement,
         purchaseRate: this.selectedItems.purchaseRate,
         salesRate: this.selectedItems.salesRate
        });
      }
    });
    }
  }
 

  updateItem() {
    if (this.itemUpdateForm.valid) {
      const updatedItemData = this.itemUpdateForm.value;

      this.inventoryService
        .updateItem(this.itemId,updatedItemData)
        .subscribe((response) => {
          console.log('Item updated successfully:', response);
          this.router.navigate(['items/list']);
        });
    }
  }
}





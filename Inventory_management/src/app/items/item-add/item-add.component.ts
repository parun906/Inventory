import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
})
export class ItemAddComponent {
  
  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private router: Router) {
    this.itemForm = this.fb.group({
      itemCode: ['', Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      itemName: ['', Validators.required,Validators.pattern(/^[a-zA-Z]+$/)],
      brandName: ['', Validators.required,Validators.pattern(/^[a-zA-Z]+$/)],
      unitOfMeasurement: ['', Validators.required],
      purchaseRate: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      salesRate: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const itemData = this.itemForm.value;
      this.inventoryService.addItem(itemData).subscribe(response => {
        console.log('Item added successfully:', response);
        this.router.navigate(['/items']);
      });
    }
  }
 
}

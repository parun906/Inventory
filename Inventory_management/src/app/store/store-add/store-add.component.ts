import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
})
export class StoreAddComponent {
  storeForm: FormGroup;

  constructor(private storeService: StoreService, private router: Router, private fb: FormBuilder) {
    this.storeForm = this.fb.group({
      storeName: ['', [Validators.required]]
    });
  }

  addStore() {
    if (this.storeForm.valid) {
      const storeData = { storeName: this.storeForm.value.storeName };

      this.storeService.addStore(storeData).subscribe(response => {
        console.log('Store added successfully:', response);
        this.router.navigate(['/store']);
      });
    }
  }
}

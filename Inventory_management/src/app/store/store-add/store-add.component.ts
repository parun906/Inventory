import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
})
export class StoreAddComponent {
  storeName: string = '';
  constructor(private storeService: StoreService, private router: Router) { }

  addStore() {
    const storeData = { storeName: this.storeName };

    this.storeService.addStore(storeData).subscribe(response => {
      console.log('Store added successfully:', response);
      this.router.navigate(['/items']);
    });
  }
}

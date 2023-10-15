import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-button-renderer',
  templateUrl: './edit-button-renderer.component.html',
})
export class EditButtonRendererComponent {
  private params: any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  agInit(params: any): void {
    this.params = params;
  }

  handleEditClick(): void {
    if (this.params.data.itemId) {
      this.router.navigate(['items/update/', this.params.data.itemId]);
    }
    else if (this.params.data.stockId) {
      this.router.navigate(['stocks/update/', this.params.data.stockId]);
    }
    // else if (this.params.data.storeId) {
    //   this.router.navigate(['store/update/', this.params.data.storeId]); //later if needed use 
    // }
    else {
      console.log("param has no data");
    }

  }
}

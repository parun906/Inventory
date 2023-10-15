import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-button-renderer',
  templateUrl: './edit-button-renderer.component.html',
})
export class EditButtonRendererComponent {
  private params: any;
  constructor(private router: Router){}

  agInit(params: any): void {
    this.params = params;
  }

  handleEditClick(): void {
    this.router.navigate(['items/update', this.params.data.itemId]);
  }
}

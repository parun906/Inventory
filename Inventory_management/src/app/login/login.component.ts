import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';


  constructor(private authService: AuthService,private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        response => {
          this.router.navigate(['/home']);
          console.log('Authentication successful', response);

        },
        error => {
          console.error('Authentication failed', error);
        }
      );
  }
}

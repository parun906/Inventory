

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7066';
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginModel = { username, password };
    return this.http.post(`${this.baseUrl}/api/user/login`, loginModel).pipe(
      map((response: any) => {
        if (response.message=="Authentication successful") {
          this.isLoggedIn = true; // Set to true if login is successful
        } else {
          this.isLoggedIn = false; // Set to false if login fails
        }
        return response;
      })
    );
  }
}


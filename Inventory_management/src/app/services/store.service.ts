import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
 

  private apiUrl = 'https://localhost:7066/api/Store'; 

  constructor(private http: HttpClient) {}

  
  getStore(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  addStore(storeData: any) {
    return this.http.post(this.apiUrl, storeData);
  }

}

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
    return this.http.get<any[]>(`${this.apiUrl}`); //get store 
  }
  addStore(storeData: any) {
    return this.http.post(this.apiUrl, storeData);
  }
  deleteStore(storeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${storeId}`);
  }
}

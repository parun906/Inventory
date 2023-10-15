

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'https://localhost:7066/api/Stock/'; 

  constructor(private http: HttpClient) {} 

  // Get a list of all items
  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  // Add new stock
  createStocks(stock: any) {
    return this.http.post(this.apiUrl,stock);
  }
  deleteStock(stockId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${stockId}`);
  }

}


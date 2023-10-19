import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://localhost:7066/api/Items/'; 

  constructor(private http: HttpClient) {}

  addItem(itemData: any) {
    return this.http.post(this.apiUrl, itemData);
  }
  updateItem(itemId: number, updatedItemData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${itemId}`, updatedItemData);
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${itemId}`);
  }

  // Get a list of all items
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
 //general get for test
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}allData`);
  }

  //for searching items
  filterItemsByName(itemNameFilter: string): Observable<any[]> {
    
    const url = `${this.apiUrl}filter-items?itemNameFilter=${itemNameFilter}`;
    return this.http.get<any[]>(url);
  }
}

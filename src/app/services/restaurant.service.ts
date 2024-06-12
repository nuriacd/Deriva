// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
    private apiUrl = 'http://localhost:8001/restaurant';

    constructor(private _http: HttpClient) { }

    getRestaurantDelivery(ciudad: string) {
        return this._http.get(`${this.apiUrl}/delivery/${ciudad}`);
    }

    getRestaurantName(id: any): Observable<string> {
      return this._http.get<string>(`${this.apiUrl}/name/${id}`);
    } 
}
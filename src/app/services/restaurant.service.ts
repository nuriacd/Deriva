// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
    private apiUrl = 'http://localhost:8001/restaurant';

    constructor(private _http: HttpClient) { }

    getRestaurantDelivery(ciudad: string) {
        return this._http.get(`${this.apiUrl}/delivery/${ciudad}`);
    }
}
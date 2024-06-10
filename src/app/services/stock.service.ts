import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class StockService {
  private URL_API = `http://localhost:8001`

  constructor(private _http: HttpClient) { }

  listRestaurantDrinks(restaurantId: string): Observable<any> {
    return this._http.get(`${this.URL_API}/product/drink/restaurant/${restaurantId}`);
  }
  
  updateRestaurantDrink(restaurantId: string, drinkId: number, quantity: number): Observable<any> {
    return this._http.put(`${this.URL_API}/product/drink/restaurant/${restaurantId}/update`, { drinkId, quantity });
  }
  
  listRestaurantIngredients(restaurantId: string): Observable<any> {
    return this._http.get(`${this.URL_API}/ingredient/restaurant/${restaurantId}`);
  }
  
  updateRestaurantIngredient(restaurantId: string, ingredientId: number, quantity: number): Observable<any> {
    return this._http.put(`${this.URL_API}/ingredient/restaurant/${restaurantId}/update`, { ingredientId, quantity });
  }

}
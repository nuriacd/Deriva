import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { DishModel } from '../models/dish.model';
import { DrinkModel } from '../models/drink.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8001/product'; // Asegúrate de cambiar esto a la URL de tu API

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<ProductModel> {
    return this._http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductModel): Observable<ProductModel> {
    return this._http.post<ProductModel>(`${this.apiUrl}/new`, product);
  }

  updateProduct(id: number, product: ProductModel): Observable<ProductModel> {
    return this._http.put<ProductModel>(`${this.apiUrl}/${id}/edit`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDishes(): Observable<DishModel[]> {
    return this._http.get<DishModel[]>(`${this.apiUrl}/dishes/get`);
  }

  getDrinks(): Observable<DrinkModel[]> {
    return this._http.get<DrinkModel[]>(`${this.apiUrl}/drinks/get`);
  }
}
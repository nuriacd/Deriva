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
  private apiUrl = 'http://localhost:8000/product'; // Asegúrate de cambiar esto a la URL de tu API

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.apiUrl}/new`, product);
  }

  updateProduct(id: string, product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.apiUrl}/${id}/edit`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDishes(): Observable<DishModel[]> {
    return this.http.get<DishModel[]>(this.apiUrl).pipe(
      map(products => products.filter(product => product instanceof DishModel))
    );
  }

  getDrinks(): Observable<DrinkModel[]> {
    return this.http.get<DrinkModel[]>(this.apiUrl).pipe(
      map(products => products.filter(product => product instanceof DrinkModel))
    );
  }
}
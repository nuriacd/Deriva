import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:8001/order';

    constructor(private _http: HttpClient) { }

    getOrders(): Observable<OrderModel[]> {
        return this._http.get<OrderModel[]>(`${this.apiUrl}`);
    }

    placeOrder(data: OrderModel): any {
        return this._http.post(`${this.apiUrl}/new`, data);
    }

    getOrder(id: string): Observable<OrderModel> {
        return this._http.get<OrderModel>(`${this.apiUrl}/${id}/show`);
    }

    updateOrder(id: string, data: OrderModel): any {
        return this._http.put(`${this.apiUrl}/${id}/edit`, data);
    }

    updateStatus(id: string, status: string): any {
        return this._http.put(`${this.apiUrl}/${id}/status`, { status: status });
    }

    deleteOrder(id: string): any {
        return this._http.delete(`${this.apiUrl}/${id}`);
    }

    getPendingOrders(restaurantId: string): Observable<OrderModel[]> {
        return this._http.get<OrderModel[]>(`${this.apiUrl}/pending/${restaurantId}`);
    }

    getCancelledOrders(restaurantId: string): Observable<OrderModel[]> {
        return this._http.get<OrderModel[]>(`${this.apiUrl}/cancelled/${restaurantId}`);
    }

    getCompleteOrders(restaurantId: string): Observable<OrderModel[]> {
        return this._http.get<OrderModel[]>(`${this.apiUrl}/complete/${restaurantId}`);
    }

    getRestaurantOrders(restaurantId: string): Observable<OrderModel[]> {
        return this._http.get<OrderModel[]>(`${this.apiUrl}/restaurant/${restaurantId}`);
    }

    getUserOrders(id: string): Observable<OrderModel[]> {
        let data = { id: id };
        return this._http.post<OrderModel[]>(`${this.apiUrl}/user`, data);
    }
}
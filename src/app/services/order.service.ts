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

    createOrder(data: OrderModel): any {
        return this._http.post(`${this.apiUrl}/new`, data);
    }

    getOrder(id: string): Observable<OrderModel> {
        return this._http.get<OrderModel>(`${this.apiUrl}/${id}`);
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

    getPendingOrders(restaurantId: string): Observable<any> {
        return this._http.get(`${this.apiUrl}/pending/${restaurantId}`);
    }
}
import { Component } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-employee-area',
  templateUrl: './employee-area.component.html',
  styleUrls: ['./employee-area.component.css']
})
export class EmployeeAreaComponent {
  pendingOrders: OrderModel[] = [];
  cancelledOrders: OrderModel[] = [];
  completeOrders: OrderModel[] = [];
  allOrders: OrderModel[] = [];

  restaurantId = '1';
  selectedOpc = 'pending'

  constructor(
    private _orderService: OrderService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.restaurantId = sessionStorage.getItem('derivaRestaurant')!;
    
    this.getPendingOrders();
    this.getCancelledOrders();
    this.getCompleteOrders();
    this.getAllOrders();
  }

  getPendingOrders() {
    const subscription = this._orderService.getPendingOrders(this.restaurantId).subscribe({
      next: (orders) => {
        this.pendingOrders = orders;
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: console.log
    });
  }

  getCancelledOrders() {
    const subscription = this._orderService.getCancelledOrders(this.restaurantId).subscribe({
      next: (orders) => {
        this.cancelledOrders = orders;
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: console.log
    });
  }

  getCompleteOrders() {
    const subscription = this._orderService.getCompleteOrders(this.restaurantId).subscribe({
      next: (orders) => {
        this.completeOrders = orders;
      },
      complete: () => {
        console.log(this.completeOrders)
        subscription.unsubscribe();
      },
      error: console.log
    });
  }

  getAllOrders() {
    const subscription = this._orderService.getRestaurantOrders(this.restaurantId).subscribe({
      next: (orders) => {
        this.allOrders = orders;
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: console.log
    });
  }

  changeStatus(event:Event) {
    let id = (event.target as HTMLSelectElement).id;
    let status = (event.target as HTMLSelectElement).value;

    const subscription = this._orderService.updateStatus(id, status).subscribe({
      next: () => {
        this.getPendingOrders();
        this.getCancelledOrders();
        this.getCompleteOrders();
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: console.log
    });
  }
  /*
  filteredOrders: any[] = []; // Esta será la lista filtrada que mostrarás en la UI

  // Función para buscar en la lista existente de pedidos
  searchOrders(event: Event) {
    let searchTerm = (event.target as HTMLInputElement).value;

    if (!searchTerm.trim()) {
      this.filteredOrders = this.allOrders; // Muestra todos los pedidos si no hay término de búsqueda
      return;
    }

    this.filteredOrders = this.allOrders.filter(order =>
      order.client!.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id!.toString().includes(searchTerm)
    );

  }

  clearSearch() {
    this.filteredOrders = this.allOrders;
    (document.getElementById('search') as HTMLInputElement).value = '';
  }
  */

}
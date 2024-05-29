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

  constructor(
    private _orderService: OrderService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    const restaurantId = this._cookieService.get('derivaRestaurantId');
    const subscription = this._orderService.getPendingOrders(restaurantId).subscribe({
      next: (orders) => {
        this.pendingOrders = orders;
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: console.log
    });
  }
}
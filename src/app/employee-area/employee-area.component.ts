import { Component } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-employee-area',
  templateUrl: './employee-area.component.html',
  styleUrl: './employee-area.component.css'
})
export class EmployeeAreaComponent {
  pendingOrders: OrderModel[] = [];

  constructor(
    private _orderService: OrderService
  ) { }

  ngOnInit() {
    const subscripcion = this._orderService.getPendingOrders().subscribe({
      next: (orders) => {
        this.pendingOrders = orders;
      },
      complete: () => {
        subscripcion.unsubscribe();
      },
      error: console.log
    });
  }
}

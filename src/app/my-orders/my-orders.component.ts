import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderModel } from '../models/order.model';

import * as jwt_decode from 'jwt-decode';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orders: OrderModel[] = [];

  constructor(
    private _orderService: OrderService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    let token = this._cookieService.get('derivaUserToken');
    let tokenPayload: any = jwt_decode.jwtDecode(token)
    const email = tokenPayload.username;

    const subscription = this._orderService.getUserOrders(email).subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      complete: () => {
        subscription.unsubscribe();
        this.orders = this.orders.sort((a, b) => {
          const dateA = new Date(a.date!);
          const dateB = new Date(b.date!);
        
          return dateB.getTime() - dateA.getTime();
        });
      },
      error: console.log
    });
  }

  downloadInvoice(order: OrderModel) {
    const doc = new jsPDF();

    doc.setFont('Courier');

    // Título de la factura
    doc.setFontSize(18);
    doc.text(`Factura nº ${order.id}`, 105, 20, { align: 'center' });

    // Información del pedido
    doc.setFontSize(12);
    doc.text(`Fecha: ${order.date}`, 10, 40);
    doc.text(`Dirección de envío: ${order.address}`, 10, 50);
    doc.text(`Cliente: ${order.client}`, 10, 60);

    // Productos del pedido
    autoTable(doc, {
      startY: 70,
      head: [['Cantidad', 'Producto', 'Precio']],
      body: order.products.map(p => [p.quantity.toString(), p.product.name, p.product.price.toString() + '€']),
      styles: { fillColor: [255, 255, 255], textColor: 0, lineColor: 0, lineWidth: 0.1, font: 'courier'},
      headStyles: { fillColor: [255, 255, 255], textColor: 0, lineColor: 0, lineWidth: 0.1, font: 'courier' },
      bodyStyles: { fillColor: [255, 255, 255], textColor: 0, lineColor: 0, lineWidth: 0.1, font: 'courier' },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      theme: 'plain'
    });

    // Total del pedido
    const finalY = (doc as any).lastAutoTable.finalY; // Obtener la posición Y final de la tabla
    doc.setFontSize(14);
    doc.text(`Total: ${order.price}€`, 10, finalY + 20);

    // Descargar el PDF
    doc.save(`Factura_Pedido_${order.id}.pdf`);
  }

}
   

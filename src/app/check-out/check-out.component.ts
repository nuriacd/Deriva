import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { OrderModel } from '../models/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{
  deliveryForm: FormGroup;
  provinces: string[] = [];
  cities: string[] = [];
  allData: any;
  selectedProvince: string | null = null;

  shoppingList: { id: number, quantity: number }[] = [];
  productList: { id: number, model: ProductModel }[] = [];

  constructor(
    private _orderService: OrderService,
    private _productService: ProductService,
    private _cookieService: CookieService,
    private fb: FormBuilder, 
    private http: HttpClient,
    private _restaurantService: RestaurantService,
    private _snackBar: SnackBarService,
    private _router: Router
  ) {
    this.getList();
    this.getModel();

    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[9867][0-9]{8}$')]]
    });
  }

  ngOnInit(): void {
    this.loadProvinces();
  }

  loadProvinces(): void {
    const subscription = this.http.get<any>('assets/json/provinces.json').subscribe({
      next: (data) => {
        this.allData = data.provinces;
        this.provinces = Object.keys(this.allData);
      },
      complete: () => {
        subscription.unsubscribe();
        this.selectedProvince = sessionStorage.getItem('province')
        this.cities = this.allData[this.selectedProvince!];

        this.deliveryForm.get('province')?.setValue(this.selectedProvince);
        this.deliveryForm.get('city')?.setValue(sessionStorage.getItem('city'));

      },
      error: console.log
    });
  }

  onProvinceChange(event: Event): void {
    let province = (event.target as HTMLSelectElement).value;

    this.selectedProvince = province;
    this.cities = this.allData[province];
  }

  getList() 
  {
    let cart = sessionStorage.getItem('cart');

    if (cart){
      for (let item in JSON.parse(cart)){
        let id = parseInt(item);
        
        this.shoppingList.push({ id: id, quantity: parseInt(JSON.parse(cart)[id]) });
      }
    }
  }

  getModel() 
  {
    for (let item of this.shoppingList) {
      let subscription = this._productService.getProduct(item.id).subscribe({
        next: product => {
          if (Array.isArray(product)) {
            product = product[0];
          }

          this.productList.push({ id: item.id, model: product });
        },
        complete: () => {
          subscription.unsubscribe();
        },
        error: console.log
      });
    }
  }

  getTotal() 
  {
    let total = 0;
    for (let item of this.shoppingList) {
      let product = this.productList.find(product => product.id === item.id);
      if (product) {
        total += parseFloat(product.model.price) * item.quantity;
      }
    }
    return total.toFixed(2);
  }

  getProduct(id: number): ProductModel | undefined 
  {
    let product = this.productList.find(product => product.id === id);
    let model = product?.model;

    return model;
  }

  getPrice(price: string | undefined, quantity: number) 
  {
    if (!price) {
      return 0;
    }
    return (parseFloat(price) * quantity).toFixed(2);
  }

  checkOut() 
  {
    let restaurant:any;

    if (this.deliveryForm.valid) {
      const subscription = this._restaurantService.getRestaurantDelivery(this.deliveryForm.get('city')?.value).subscribe({
        next: (data: any) => {
          restaurant = data['id']; 
        },
        complete: () => {
          subscription.unsubscribe();

          let orderItems: { quantity: number, product: ProductModel }[] = [];
          let cart = sessionStorage.getItem('cart');
          let token = this._cookieService.get('derivaUserToken');
          let address = this.deliveryForm.get('address')?.value;

          if (cart && restaurant && token)
            {
              let tokenPayload: any = jwt_decode.jwtDecode(token)
              const id = tokenPayload.id;  
        
              for (let item of this.shoppingList) {
                let product = this.productList.find(product => product.id === item.id)?.model;
                if (product) {
                  orderItems.push({ quantity: item.quantity, product: product });
                }
              }
        
              let order = new OrderModel(
                null, 
                'Pendiente', 
                address, 
                parseFloat(this.getTotal()), 
                id,
                orderItems, 
                new Date().toISOString(),
                parseInt(restaurant)
              );
        
              this.placeOrder(order);
            } else {
              console.log('Error: No token or cart or restaurant');
            }
        },
        error: console.log
      });
    }
  }

  placeOrder(order: OrderModel) 
  {
    let subscription = this._orderService.placeOrder(order).subscribe({
      next: (response: any) => {
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('restaurant');
        this.shoppingList = [];
        this.productList = [];
      },
      complete: () => {
        subscription.unsubscribe();
        this._snackBar.openSnackBar('Pedido realizado con éxito')
        this._router.navigate(['/my-orders']);
      },
      error: console.log
    });
  }
}

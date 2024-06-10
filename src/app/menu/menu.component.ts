import { Component, OnInit } from '@angular/core';
import { DishModel } from '../models/dish.model';
import { DrinkModel } from '../models/drink.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  selectedTab = 'starters';
  dishes: DishModel[] = [];
  drinks: DrinkModel[] = [];

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    let subscription = this._productService.getDishes().subscribe({
      next: dishes => {
        this.dishes = dishes;
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: console.log
    });

    let subscription2 = this._productService.getDrinks().subscribe({
      next: drinks => {
        this.drinks = drinks
      },
      complete: () => {
        subscription2.unsubscribe();
      },
      error: console.log
    });
  }

  addToCart(id: number) {
    let cart = sessionStorage.getItem('cart');
    let cartObject = cart ? JSON.parse(cart) : {};

    if (cartObject[id]) {
      cartObject[id] += 1;
    } else {
      cartObject[id] = 1;
    }

    sessionStorage.setItem('cart', JSON.stringify(cartObject));
  }
  
  isLogged() {
    return this._cookieService.get("derivaUserToken") ? true: false;
  }

  isOrder() {
    return this._route.snapshot.paramMap.get('type') === 'order';
  }

  hasRestaurant() {
    return sessionStorage.getItem("derivaRestaurant") ? true: false;
  }

  downCart(id: number) 
  {
    let cart = sessionStorage.getItem('cart');
    let cartObject = cart ? JSON.parse(cart) : {};

    if (cartObject[id] > 1) {
      cartObject[id] -= 1;
    } else {
      delete cartObject[id];
    }

    sessionStorage.setItem('cart', JSON.stringify(cartObject));
  }

  getQty(id: number) {
    let cart = sessionStorage.getItem('cart');
    let cartObject = cart ? JSON.parse(cart) : {};

    return cartObject[id] ? cartObject[id] : 0;
  }

  inCart(id: number) {
    let cart = sessionStorage.getItem('cart');
    let cartObject = cart ? JSON.parse(cart) : {};

    return cartObject[id] ? true : false;
  }

}

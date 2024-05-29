import { Component } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  shoppingList: { id: number, quantity: number }[] = [];
  productList: { id: number, model: ProductModel }[] = [];

  constructor(private _productService: ProductService) {
    this.getList();
    this.getModel();
  }

  getList() {
    let cart = sessionStorage.getItem('cart');

    if (cart){
      for (let item in JSON.parse(cart)){
        let id = parseInt(item);
        
        this.shoppingList.push({ id: id, quantity: parseInt(JSON.parse(cart)[id]) });
      }
    }
  }

  getModel() {
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

  removeFromCart(id: number) {
    this.shoppingList = this.shoppingList.filter(item => item.id !== id);

    let cart = sessionStorage.getItem('cart');
    if (cart) {
      let cartObj = JSON.parse(cart);
      delete cartObj[id];
      sessionStorage.setItem('cart', JSON.stringify(cartObj));
    }
  }

  downCart(id: number) {
    let item = this.shoppingList.find(item => item.id === id);

    if (item && item.quantity > 1) {
      item.quantity--;

      let cart = sessionStorage.getItem('cart');
      if (cart) {
        let cartObj = JSON.parse(cart);
        cartObj[id]--;
        sessionStorage.setItem('cart', JSON.stringify(cartObj));
      }

    } else {
      this.removeFromCart(id);
    }
  }

  upCart(id: number) {
    let item = this.shoppingList.find(item => item.id === id);
    if (item) {
      item.quantity++;

      let cart = sessionStorage.getItem('cart');
      if (cart) {
        let cartObj = JSON.parse(cart);
        cartObj[id]++;
        sessionStorage.setItem('cart', JSON.stringify(cartObj));
      }
      
    }
  }

  getTotal() {
    let total = 0;
    for (let item of this.shoppingList) {
      let product = this.productList.find(product => product.id === item.id);
      if (product) {
        total += parseFloat(product.model.price) * item.quantity;
      }
    }
    return total.toFixed(2);
  }

  getProduct(id: number): ProductModel | undefined {
    let product = this.productList.find(product => product.id === id);
    let model = product?.model;

    return model;
  }

  getPrice(price: string | undefined, quantity: number) {
    if (!price) {
      return 0;
    }
    return (parseFloat(price) * quantity).toFixed(2);
  }
}
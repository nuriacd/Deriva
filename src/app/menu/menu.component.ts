import { Component, OnInit } from '@angular/core';
import { DishModel } from '../models/dish.model';
import { DrinkModel } from '../models/drink.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  dishes: DishModel[] = [];
  drinks: DrinkModel[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    let subscription = this.productService.getDishes().subscribe({
      next: dishes => {
        this.dishes = dishes;
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: console.log
    });

    let subscription2 = this.productService.getDrinks().subscribe({
      next: drinks => {
        this.drinks = drinks
      },
      complete: () => {
        subscription2.unsubscribe();
      },
      error: console.log
    });
  }
}

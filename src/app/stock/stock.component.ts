import { Component } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { DrinkModel } from '../models/drink.model';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  selectedOpc = 'ingredients';
  restaurantId: string | null;

  ingredientList: IngredientModel[] = [];
  drinkList: DrinkModel[] = [];

  constructor(
    private _stockService: StockService,
  ) {
    this.restaurantId = sessionStorage.getItem('derivaRestaurant');
    this.loadIngredients();
    this.loadDrinks();
  }

  loadIngredients() {
    const subscription = this._stockService.listRestaurantIngredients(this.restaurantId!).subscribe({
      next: (response) => {
        this.ingredientList = response;
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: (error) => {
        console.log('Error loading ingredients', error);
      }
    });
  }

  loadDrinks() {
    const subscription = this._stockService.listRestaurantDrinks(this.restaurantId!).subscribe({
      next: (response) => {
        this.drinkList = response;
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: (error) => {
        console.log('Error loading drinks', error);
      }
    });
  }
  
  addIngredient(id: number) {
    let input = document.getElementById(`input-${id}`) as HTMLInputElement;
    let quantity = input.value;
    input.value = (parseInt(quantity) + 1).toString();

    this.changeIngredient(id);
  }

  substractIngredient(id: number) {
    let input = document.getElementById(`input-${id}`) as HTMLInputElement;
    let quantity = input.value;

    if(parseInt(quantity) === 0 ) return;

    input.value = (parseInt(quantity) - 1).toString();
    this.changeIngredient(id);
  }

  changeIngredient(id: number) {
    let quantity = (document.getElementById(`input-${id}`) as HTMLInputElement).value;
    
    const subscription = this._stockService.updateRestaurantIngredient(this.restaurantId!, id, parseInt(quantity)).subscribe({
      next: (response) => {
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: (error) => {
        console.log('Error updating ingredient', error);
      }
    });
  }

  addDrink(id: number) {
    let input = document.getElementById(`input-${id}`) as HTMLInputElement;
    let quantity = input.value;
    input.value = (parseInt(quantity) + 1).toString();

    this.changeDrink(id);
  }

  substractDrink(id: number) {
    let input = document.getElementById(`input-${id}`) as HTMLInputElement;
    let quantity = input.value;

    if(parseInt(quantity) === 0 ) return;

    input.value = (parseInt(quantity) - 1).toString();
    this.changeDrink(id);
  }

  changeDrink(id: number) {
    let quantity = (document.getElementById(`input-${id}`) as HTMLInputElement).value;
    
    const subscription = this._stockService.updateRestaurantDrink(this.restaurantId!, id, parseInt(quantity)).subscribe({
      next: (response) => {
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: (error) => {
        console.log('Error updating ingredient', error);
      }
    });
  }
}

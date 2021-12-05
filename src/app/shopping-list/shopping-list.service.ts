import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../model/recipes.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient(`apple`, 5),
    new Ingredient(`tomato`, 10),
  ];
  // ingredientsChange = new EventEmitter<ingredients[]>();
  ingredientsChange = new Subject<Ingredient[]>();
  ingredientEdit = new Subject<number>();

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  addIngredients(item: Ingredient) {
    this.ingredients.push(item);
    // this.ingredientsChange.emit(this.ingredients.slice());
    this.ingredientsChange.next(this.ingredients.slice());
  }

  updateIngredient(id: number, newIgredient: Ingredient) {
    this.ingredients[id] = newIgredient;
    this.ingredientsChange.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  addIngredientToSL(list: Ingredient[]) {
    let listIngrdientName = this.ingredients.map((item) => item.name);
    list.forEach((item) => {
      console.log(listIngrdientName.indexOf(item.name));
      let index = listIngrdientName.indexOf(item.name);
      if (index == -1) {
        this.ingredients.push(item);
      } else {
        this.ingredients[index].amount += item.amount;
      }
    });
    this.ingredientsChange.next(this.ingredients.slice());
  }
}

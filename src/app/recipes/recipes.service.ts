import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient, Recipe } from '../model/recipes.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      name: 'recipe_1',
      description: 'recipe_1',
      imgPath:
        'https://www.pizzaexpress.vn/wp-content/uploads/2018/08/shutterstock_657998458-780x490.jpg',
      ingredientList: [new Ingredient('beef', 10)],
    },
  ];

  recipeChange = new Subject<Recipe[]>();

  constructor(private SLService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChange.next(this.recipes.slice());
  }

  addIngredientToSl(list: Ingredient[]) {
    this.SLService.addIngredientToSL(list);
  }

  addRecipe(item: Recipe) {
    this.recipes.unshift(item);
    this.recipeChange.next(this.recipes.slice());
  }

  updateRecipe(id: number, item: Recipe) {
    this.recipes[id] = item;
    this.recipeChange.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChange.next(this.recipes.slice());
  }
}

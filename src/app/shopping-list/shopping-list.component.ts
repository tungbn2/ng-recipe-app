import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../model/recipes.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$!: Observable<{ ingredients: Ingredient[] }>;
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription | undefined;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients().slice();
    this.igChangeSub = this.shoppingListService.ingredientsChange.subscribe(
      (list: Ingredient[]) => (this.ingredients = list)
    );
  }

  ngOnDestroy() {
    if (this.igChangeSub) this.igChangeSub.unsubscribe();
  }

  onEditItem(i: number) {
    this.shoppingListService.ingredientEdit.next(i);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/recipes.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('myForm') slForm!: NgForm;
  subscription: Subscription | undefined;
  editMode = false;
  editedItemId: number = 0;
  editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientEdit.subscribe(
      (index: number) => {
        this.editedItemId = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);

        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredients: Ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemId,
        newIngredients
      );
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredients(newIngredients);
    }

    form.reset();
  }

  onDelete() {
    this.slForm.reset();
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemId);
    }
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number = 0;
  editMode = false;
  recipeForm!: FormGroup;

  newIngredient(name: string | null, amount: number | null) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDes = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      let recipeEdit: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipeEdit.name;
      recipeImg = recipeEdit.imgPath;
      recipeDes = recipeEdit.description;

      if (recipeEdit['ingredientList']) {
        for (let ingredient of recipeEdit.ingredientList) {
          recipeIngredients.push(
            this.newIngredient(ingredient.name, ingredient.amount)
          );
        }
      }
    } else {
      recipeIngredients.push(this.newIngredient(null, null));
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDes, Validators.required),
      imgPath: new FormControl(recipeImg, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onAddIngredient() {
    if (this.ingredients.valid) {
      this.ingredients.push(this.newIngredient(null, null));
    } else {
      alert('please input ingredient');
    }
  }

  onDeleteIngredient(index: number) {
    if (this.ingredients.length == 1) {
      this.ingredients.setValue([
        {
          name: '',
          amount: null,
        },
      ]);
      return;
    }

    this.ingredients.removeAt(index);
  }

  onSubmit() {
    let formValue = this.recipeForm.value;

    let newRecipe: Recipe = {
      name: formValue.name,
      description: formValue.description,
      imgPath: formValue.imgPath,
      ingredientList: formValue.ingredients,
    };
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.router.navigate(['/recipes']);
      return;
    }

    this.recipeService.addRecipe(newRecipe);
    this.recipeForm.reset();
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  onDeleteItem() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../']);
  }
}

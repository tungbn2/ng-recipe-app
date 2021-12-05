export class Ingredient {
  constructor(public name: string, public amount: number) {}
}

export class Recipe {
  public name: string;
  public description: string;
  public imgPath: string;
  public ingredientList: Ingredient[];

  constructor(
    name: string,
    description: string,
    imgPath: string,
    ingredientList: Ingredient[]
  ) {
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.ingredientList = ingredientList;
  }
}

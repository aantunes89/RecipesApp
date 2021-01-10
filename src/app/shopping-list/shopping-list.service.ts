import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/model/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  constructor() {}

  public getIngredients(): Ingredient[] {
    const ingredientsCopy = [...this.ingredients];
    return ingredientsCopy;
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit([...this.ingredients]);
  }

  public addMultipleIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
  }
}

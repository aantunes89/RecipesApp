import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/model/ingredient.model";
@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  startEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  constructor() {}

  public getIngredients(): Ingredient[] {
    const ingredientsCopy = [...this.ingredients];
    return ingredientsCopy;
  }

  public getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next([...this.ingredients]);
  }

  public addMultipleIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
  }

  public updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next([...this.ingredients]);
  }

  public deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.emitNewIngredientList(this.ingredients);
  }

  private emitNewIngredientList(ingredients: Ingredient[]): void {
    this.ingredientsChanged.next([...ingredients]);
  }
}

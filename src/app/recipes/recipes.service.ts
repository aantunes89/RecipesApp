import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ingredient } from "../shared/model/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: "root" })
export class RecipesService {
  public selectedRecipe: Recipe;

  private recipes = [];

  recipesChanged = new BehaviorSubject<Recipe[]>(this.recipes);

  recipesChanged$ = this.recipesChanged.asObservable();

  constructor(private shoppingListService: ShoppingListService) { }

  public getRecipes() {
    return [...this.recipes];
  }

  public onSelectRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  public getRecipesById(id: number): Recipe {
    return this.recipes[id];
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addMultipleIngredients(ingredients);
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes = [...this.recipes, recipe];
    this.recipesChanged.next(this.recipes);
  }

  public updateRecipe(id: number, newRecipe: Recipe): void {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  public setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}


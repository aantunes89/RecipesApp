import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/model/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: "root" })
export class RecipesService {
  public recipeSelected = new EventEmitter<Recipe>();
  public selectedRecipe: Recipe;

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      "A super tasty Schnitzel",
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
      [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
    ),
    new Recipe(
      "Big Fat Burguer",
      "What else you need to say",
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
      [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    const recipesCopy = [...this.recipes];
    return recipesCopy;
  }

  onSelectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

  public getRecipesById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addMultipleIngredients(ingredients);
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { Ingredient } from "src/app/shared/model/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  @Input()
  public recipe: Recipe;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {}

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.recipesService.addIngredientsToShoppingList(ingredients);
  }
}

import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipes.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
  providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  public selectedRecipe: Recipe;

  constructor(private recipeService: RecipesService) {}

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => (this.selectedRecipe = recipe)
    );
  }
}

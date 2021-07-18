import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Ingredient } from "src/app/shared/model/ingredient.model";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public id: number;
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params["id"]);
      this.recipe = this.recipesService.getRecipesById(this.id);
    });
  }

  public onAddToShoppingList(ingredients: Ingredient[]): void {
    this.recipesService.addIngredientsToShoppingList(ingredients);
  }

  public onEditRecipe(): void {
    this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(["../", this.id, "edit"], { relativeTo: this.route });
  }

  public onDeleteRecipe(): void {
    this.recipesService.deleteRecipe(this.id)
    this.router.navigate(["/recipes"], { relativeTo: this.route });
    
  }
}

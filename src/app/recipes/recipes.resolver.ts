import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/services/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipes.service";

@Injectable({
  providedIn: "root",
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();

    return !recipes.length ? this.dataStorageService.fetchRecipes() : recipes;
  }
}

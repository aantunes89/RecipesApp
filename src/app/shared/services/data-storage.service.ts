import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipesService } from "src/app/recipes/recipes.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  private readonly BASE_URL =
    "https://ng-course-recipe-book-52e76-default-rtdb.firebaseio.com/recipes.json";

  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<void>(this.BASE_URL, recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.BASE_URL).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes: Recipe[]) => this.recipeService.setRecipes(recipes))
    );
  }
}

/*
  exaustMap => espera o primeiro observable da cadeia emitir um valor e então pode utilizar
  este valor para realizar outra ação e retornar um novo observable, continuando assim a cadeia e alterando
  o tipo de retorno como o novo obsevable
*/

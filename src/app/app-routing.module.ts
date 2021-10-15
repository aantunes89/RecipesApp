import { NgModule } from "@angular/core";
import { PreloadAllModules, Route, RouterModule } from "@angular/router";

const routes: Route[] = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("src/app/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "recipes",
    loadChildren: () =>
      import("src/app/recipes/recipes.module").then((m) => m.RecipesModule),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("src/app/shopping-list/shopping-list.module").then(
        (m) => m.ShoppingListModule
      ),
  },
];

// Preload, respeita o lazyload, mas assim que a primeira carga é finalizada começa a carregar as outras
// melhora a usabilidade

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes: Route[] = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
  },
  { path: "shopping-list", component: ShoppingListComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

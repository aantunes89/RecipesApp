import { Component } from "@angular/core";

export interface DisplayHandler {
  showRecipes: boolean;
  showShoppingList: boolean;
}

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"],
})
export class HeaderComponent {}

import { EventEmitter, Output } from "@angular/core";
import { Component } from "@angular/core";

export interface DisplayHandler {
  showRecipes: boolean;
  showShoppingList: boolean;
}

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
})
export class HeaderComponent {
  @Output()
  tabHandler = new EventEmitter<string>();

  onSelect(term: string) {
    this.tabHandler.emit(term);
  }
}

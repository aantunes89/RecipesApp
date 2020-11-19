import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Recipe } from "../../recipe.model";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent {
  @Input()
  public recipe: Recipe;

  @Output("onSelect")
  public select = new EventEmitter<void>();

  constructor() {}

  public onSelect(): void {
    this.select.emit();
  }
}

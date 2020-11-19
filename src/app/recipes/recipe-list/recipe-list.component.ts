import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  @Output("onSelect")
  public select = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      "A test recipe",
      "This is simply a test",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"
    ),
    new Recipe(
      "Another test recipe",
      "This is simply a test",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"
    ),
  ];

  constructor() {}

  ngOnInit() {}

  onSelect(selectedRecipe: Recipe) {
    this.select.emit(selectedRecipe);
  }
}

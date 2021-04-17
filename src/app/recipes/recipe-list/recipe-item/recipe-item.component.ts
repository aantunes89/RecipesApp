import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Recipe } from "../../recipe.model";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent {
  @Input()
  public recipe: Recipe;

  @Input()
  public index: number;

  constructor(private route: ActivatedRoute) {}

  public ngOnint(): void {
    console.log(this.route);
  }
}

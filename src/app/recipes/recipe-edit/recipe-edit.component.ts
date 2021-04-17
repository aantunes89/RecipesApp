import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { RecipesService } from "../recipes.service";

interface RecipeParams extends Params {
  id: string;
}

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params["id"] ? true : false;

      if (this.editMode) {
        this.id = params["id"];
        this.recipesService.getRecipesById(this.id);
      }
    });
  }
}

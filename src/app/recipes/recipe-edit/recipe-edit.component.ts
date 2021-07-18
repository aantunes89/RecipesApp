import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
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
  public recipeForm: FormGroup;

  get controls(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params["id"]);
      this.editMode = params["id"] ? true : false;
      this.initForm();
    });
  }

  public onSubmit(event: Event): void {
    if (!this.editMode) this.recipesService.addRecipe(this.recipeForm.value);
    else this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    this.navigateToDetails();
  }

  public onCancel(): void {
    this.navigateToDetails();
  }

  public onAddIngredient(): void {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  public onDeleteIngredient(index: number): void {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    const recipe = this.recipesService.getRecipesById(this.id);

    if (this.editMode && recipe) {
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        recipe.ingredients.forEach(({ name, amount }) => {
          const newIngredient = new FormGroup({
            name: new FormControl(name, [Validators.required]),
            amount: new FormControl(amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          });
          recipeIngredients.push(newIngredient);
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  private navigateToDetails(): void {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}

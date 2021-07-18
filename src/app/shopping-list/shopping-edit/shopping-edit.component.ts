import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/model/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

interface RecipeForm extends NgForm {
  name: string;
  amount: string
}
@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('formValue', {static: false}) slForm: NgForm;

  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true
        this.editItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSubmit(form: RecipeForm): void {
    const { name, amount } = form.value
    const newIngredient = new Ingredient(name, amount);

    this.editMode ?
    this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient) :
    this.shoppingListService.addIngredient(newIngredient)

    this.onClear();
  }

  public onClear(): void {
    this.slForm.resetForm();
    this.editMode = false
  }

  public onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}

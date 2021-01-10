import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Ingredient } from "src/app/shared/model/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", { static: false }) nameTextField: ElementRef;
  @ViewChild("amountInput", { static: false }) amountTextField: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  onAddRecipe(event) {
    const name = this.nameTextField.nativeElement.value;
    const amount = this.amountTextField.nativeElement.value;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}

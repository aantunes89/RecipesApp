import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", { static: false }) nameTextField: ElementRef;
  @ViewChild("amountInput", { static: false }) amountTextField: ElementRef;

  @Output() public onCreate = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit() {}

  onAddRecipe(event) {
    const name = this.nameTextField.nativeElement.value;
    const amount = this.amountTextField.nativeElement.value;
    const newIngredient = new Ingredient(name, amount);
    this.onCreate.emit(newIngredient);
  }
}

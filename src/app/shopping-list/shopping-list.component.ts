import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { LoggingService } from "../logging.service";
import { Ingredient } from "../shared/model/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[];
  public subscription: Subscription;
  public ingredients$: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService,
    
    private store: Store<{shoppingList: { ingredients: Ingredient[] }}>,
  ) {}

  public ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList')      
    this.loggingService.printLog("Hello from ngOnInit last login");
  }

  public ngOnDestroy(): void {
    // 
  }

  public onEditItem(index: number): void {
    this.shoppingListService.startEditing.next(index);
  }
}

import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/model/ingredient.model";
import * as ShoppingListActions from '../store/shopping-list.actions';




interface ShoppingListState {
  ingredients: Ingredient[];
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ]
}



export function shoppingListReducer(
  state = initialState, 
  { type, payload }: ShoppingListActions.AddIngredient
): ShoppingListState {

  switch (type) {
    // uppercas is convention
    case ShoppingListActions.ADD_INGREDIENT: 
      return {
        ...state,
        ingredients: [ ...state.ingredients, payload ]
      };
    default:
      return state;
  }
}

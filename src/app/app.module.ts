import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";

import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    AuthModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

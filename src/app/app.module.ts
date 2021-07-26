import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DropDownDirective } from "./shared/directives/dropdown.directive";
import { AppRoutingModule } from "./app-routing.module";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/components/loading-spinner/loading-spinner.component";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { AlertComponent } from "./shared/components/alert/alert.component";
import { PlaceholderDirective } from "./shared/directives/placeholder.directive";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    PlaceholderDirective,
    DropDownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
})
export class AppModule {}

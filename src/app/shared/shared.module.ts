import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./components/alert/alert.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { DropDownDirective } from "./directives/dropdown.directive";
import { PlaceholderDirective } from "./directives/placeholder.directive";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropDownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropDownDirective,
    //-------------Modules-------------//
    CommonModule,
  ],
  entryComponents: [AlertComponent],
})
export class SharedModule {}

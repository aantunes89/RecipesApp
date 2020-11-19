import { Component } from "@angular/core";
import { DisplayHandler } from "./header/header.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  loadedFeature = "recipes";

  onNavigate(term: string) {
    this.loadedFeature = term;
  }
}

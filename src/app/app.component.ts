import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedFeature = "recipes";

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.autoLogin();
  }
}

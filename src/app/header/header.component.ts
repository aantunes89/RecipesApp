import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/services/data-storage.service";

export interface DisplayHandler {
  showRecipes: boolean;
  showShoppingList: boolean;
}

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;

  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  public ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  public onLogout() {
    this.authService.logout();
  }
}

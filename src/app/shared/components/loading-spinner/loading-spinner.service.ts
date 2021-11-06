import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingSpinnerService {
  private showSpinner = new BehaviorSubject<boolean>(false);
  public showSpinner$ = this.showSpinner.asObservable();

  public toggleSpinner(isLoading: boolean) {
    this.showSpinner.next(isLoading);
  }
}

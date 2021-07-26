import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewRef,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { AlertComponent } from "../shared/components/alert/alert.component";
import { PlaceholderDirective } from "../shared/directives/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  auth$: Observable<AuthResponseData>;
  subscriptions: Subscription[] = [];

  authForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public ngOnInit(): void {
    this.authForm = this.setupForm();
  }

  public ngOnDestroy(): void {
    if (this.subscriptions.length)
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.isLoading = true;
    const { email, password } = form.value;
    const auth$ = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.signUp(email, password);

    this.setupAuthSubscription(auth$);
    form.reset();
  }

  public onHandleError() {
    this.error = null;
  }

  private setupAuthSubscription(authObs: Observable<AuthResponseData>) {
    const authSub = authObs
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (res) => this.router.navigate(["/recipes"]),
        (errorMsg) => {
          this.error = errorMsg;
          this.showErrorAlert(errorMsg);
        }
      );

    this.subscriptions.push(authSub);
  }

  private setupForm(): FormGroup {
    return this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    this.alertHost;

    const hostViewCointainerRef = this.alertHost.viewConteinerRef;

    hostViewCointainerRef.clear();

    const componentRef = hostViewCointainerRef.createComponent(
      alertComponentFactory
    );

    componentRef.instance.message = message;

    const alertErrorSub = componentRef.instance.close.subscribe(() => {
      alertErrorSub.unsubscribe();
      hostViewCointainerRef.clear();
    });
  }
}

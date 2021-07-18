import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken?: string;
  email?: string;
  refreshToke?: string;
  expiresIn?: string;
  localId?: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user$ = new BehaviorSubject<User>(null);

  public token: string | null = null;

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, public router: Router) {}

  public signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(environment.SIGN_UP_URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(({ email, localId, idToken, expiresIn }) =>
          this.handleAuthentication(
            email,
            localId,
            idToken,
            parseInt(expiresIn)
          )
        )
      );
  }

  public login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(environment.SIGN_IN_URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap(({ email, localId, idToken, expiresIn }) =>
          this.handleAuthentication(
            email,
            localId,
            idToken,
            parseInt(expiresIn)
          )
        ),
        catchError(this.handleError)
      );
  }

  public logout() {
    this.user$.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("user");

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  public autoLogin() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const { email, id, _token, _tokenExpirationDate } = user;

    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.autoLogout(
        new Date(_tokenExpirationDate).getTime() - new Date().getTime()
      );
      this.user$.next(loadedUser);
    }
  }

  public autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user$.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("user", JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An uknown error ocurred!";

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email doesn't exists";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct";
        break;
    }

    return throwError(errorMessage);
  }
}

/*
  clearTimeout => esta função recebe como parametro qualquer função setimeout, impedindo esta função
  de ser executada
*/

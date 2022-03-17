import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  signInFail,
  signInSuccess,
  signUpRequest,
  signInRequest,
  signUpFail,
  signUpSuccess,
} from './auth.action';
import { AuthenticationService } from '../shared/authentication.service';
import { catchError, map, switchMap, of } from 'rxjs';

@Injectable()
export default class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authservice: AuthenticationService
  ) {}

  SignupEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpRequest),
      switchMap((data) =>
        this.authservice.SignUp(data).pipe(
          map((data) => {
            this.router.navigate(['login']);
            return signUpSuccess({ data });
          }),
          catchError((error) => {
            return of(signUpFail({data : error}))
          })
        )
      )
    )
  );

  SignInEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInRequest),
      switchMap((data) =>
        this.authservice.signIn(data).pipe(
          map((data) => {
            this.authservice.saveDataInLocalStorage(data)
            this.router.navigate(['home']);
            return signInSuccess({data});
          }),
          catchError((error) => {
            return of(signInFail({data : error}))
          })
        )
      )
    )
  );
}

import { createAction , props } from "@ngrx/store";


export const signUpRequest = createAction('SignUp Request' , props<{data : any}>());

export const signUpSuccess = createAction('SignUp Success' , props<{data : any}>());

export const signUpFail = createAction('SignUp Fail' , props<{data : any}>());

export const signInRequest = createAction('SignIn Request' , props<{data : any}>());

export const signInSuccess = createAction('SignIn Success' , props<{data : any}>());

export const signInFail = createAction('SignIn Fail' , props<{data : any}>());


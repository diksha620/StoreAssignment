import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signInRequest } from 'src/app/store/auth.action';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
      email : new FormControl('' , [Validators.required , Validators.email]),
      password: new FormControl('' ,[Validators.required])
    })
    error$ = this.store.select((state) => state.Authentication.error)
  constructor(private store : Store<{Authentication : any}> , private _snackbar : MatSnackBar) { }

  ngOnInit(): void {
   this.error$.subscribe((err) => {
     if(err){
       this.openSnackBar(err)
     }
   })
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }
  
  onSubmitLogin(){
     if(this.loginForm.valid){
       this.store.dispatch(signInRequest(this.loginForm.value))
     }
  }

  openSnackBar(err:any){
    this._snackbar.open(err , 'OK' , {duration : 2000})
  }
}

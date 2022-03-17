import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signUpRequest } from 'src/app/store/auth.action';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstname : new FormControl('' ,[Validators.required]),
    lastname : new FormControl('' , Validators.required),
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('',[Validators.required]),
    cpassword : new FormControl('' ,[Validators.required])
  })
   passwordnotMatch = false
   error$ = this.store.select((state) => state.Authentication.error)
  constructor(private store : Store<{Authentication : any}> , private _snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.isPasswordMatch();
    this.error$.subscribe((err) => {
      if(err){
        this.openSnackBar(err)
      }
    })
  }

  get firstname() {
    return this.registerForm.get('firstname')
  }
  
  get lastname() {
    return this.registerForm.get('lastname')
  }

  get email() {
    return this.registerForm.get('email')
  }
  
  get password() {
    return this.registerForm.get('password')
  }

  get cpassword() {
    return this.registerForm.get('cpassword')
  }

  isPasswordMatch(){
    this.registerForm.get('cpassword')?.valueChanges.subscribe((val) => {
      if(val !== this.cpassword?.value){
        this.passwordnotMatch = true;
      }
      else{
        this.passwordnotMatch = false;
      }
    });
  }

  openSnackBar(err:any){
    this._snackbar.open(err , 'OK' , {duration : 2000})
  }
  onSubmit(){
    // console.log(this.registerForm.value)
    if(this.registerForm.valid){
      if(this.password?.value === this.cpassword?.value){
          this.store.dispatch(signUpRequest(this.registerForm.value))
      }
    }
  }
}

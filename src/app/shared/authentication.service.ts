import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient , private router : Router ) { }

  signIn(data : any ){
     const payload = data
    return this.http.post('https://pointwork.herokuapp.com/users/auth/login' , { payload })
  }

  SignUp(data : any){
    const payload = data
    return this.http.post('https://pointwork.herokuapp.com/users/signup' , {payload})
  }

  saveDataInLocalStorage(data:any){
    localStorage.setItem('userdata' , JSON.stringify(data));
  }
  revomeDataInLocalStorage(){
    localStorage.removeItem('userdata');
    this.router.navigate(['register'])
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './authentication/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { PagenotFoundComponent } from './authentication/pagenot-found/pagenot-found.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ProtectedGuard } from './shared/guard/protected.guard';

const routes: Routes = [
  {path : '' , component : RegisterComponent},
  {path: 'login' , component : LoginComponent ,canActivate: [ProtectedGuard]},
  {path: 'register' , component : RegisterComponent, canActivate: [ProtectedGuard]},
  {path : 'home'  , component : HomeComponent , canActivate: [AuthGuard]},
  {path : "**" ,component : PagenotFoundComponent }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

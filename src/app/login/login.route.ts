import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    {
        path:'',
        component:HomeComponent ,
    },
    {
        path:'signin',
        component:SignInComponent
    },
    {
        path:'reset_password',
        component:ResetPasswordComponent
    }

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule] 
  }) 
  export class LoginRouterModule { }      



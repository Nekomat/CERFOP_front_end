import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginRouterModule } from './login.route';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from './login-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoginInterceptor } from './login.interceptor';


@NgModule({
  declarations: [HomeComponent , SignInComponent , ResetPasswordComponent],
  imports: [
    CommonModule,
    LoginRouterModule ,
    NzInputModule ,
    NzButtonModule ,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule ,
    NzIconModule
  ],
  providers:[LoginServiceService , 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true,
    },
  ]
})
export class LoginModule {}

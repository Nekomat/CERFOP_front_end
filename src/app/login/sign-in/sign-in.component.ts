import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  constructor(
    private formCtl : FormBuilder ,
    private loginService:LoginServiceService ,
    private router : Router
  ){}
  loginForm : FormGroup = this.formCtl.group({
    email:["",[Validators.required , Validators.email]] ,
    password:["",[Validators.required , Validators.minLength(4)]] 
  })
  passwordVisible = false;
  password?: string; 
  loader = false 
  login(){
    this.loader=true 
    this.loginService.login(this.loginForm.value).subscribe({
      next:(result)=>{ 
        const decode:any = jwtDecode(result.token) 
         localStorage.setItem('token',result.token) 
        if(decode.first_login == 1){
          this.loginService.decode = result.token 
          this.router.navigateByUrl("/reset_password")
        }else{
          if(decode.role=="admin"){
            this.router.navigateByUrl('/admin_portail/utilisateurs')
          }else{  
            this.router.navigateByUrl('/user_portail/formations') 
          } 
        }
        this.loader = false
      },
      error:(err)=>{
        Swal.fire('Erreur',err.error.message,"error") 
        this.loader = false
      }
    })
  }
}

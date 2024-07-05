import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  passwordVisible = false;
  password?: string;
  constructor(
    private formCtl : FormBuilder ,
    private loginService : LoginServiceService ,
    private router : Router
  ){} 
   resetForm:FormGroup = this.formCtl.group({
    oldPassword:["",Validators.required] ,
    newPassword:["" , [Validators.required , Validators.minLength(4)] ] ,
    confirmPassword:["" ,[Validators.required , Validators.minLength(4)]], 
   })
  loader = false
 changePassword(){
  if(this.resetForm.value.newPassword == this.resetForm.value.confirmPassword){
    this.loader=true
    this.loginService.resetPassword(this.resetForm.value).subscribe({
      next:()=>{ 
        const decode:any = jwtDecode(this.loginService.decode)
        localStorage.setItem('token',this.loginService.decode)
         if(decode.role=="admin"){
          this.router.navigateByUrl('/admin_portail/utilisateurs')
         }else{
          this.router.navigateByUrl("/user_portail/formations") 
         }
      },
      error:(err)=>{ 
        Swal.fire("Erreur",err.error.message,"error") 
        this.loader = false 
      } 
    })
  }
 }
}

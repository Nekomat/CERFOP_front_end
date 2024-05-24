import { Routes } from '@angular/router';
import { DashbordComponent } from './user-portail/dashbord/dashbord.component';

export const routes: Routes = [
    {
        path:'',
        loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)
    },
    {
        path:'user_portail',
        loadChildren:()=>import('./user-portail/user-portail.module').then((m)=>m.UserPortailModule)
    },
    {
        path:"admin_portail",
        loadChildren:()=>import('./admin-dashbord/admin-dashbord.module').then((m)=>m.AdminDashbordModule)
    }
   
];

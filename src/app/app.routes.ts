import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)
    },
    {
        path:"admin_portail",
        loadChildren:()=>import('./admin-dashbord/admin-dashbord.module').then((m)=>m.AdminDashbordModule)
    }
];

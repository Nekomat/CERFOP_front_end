import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashbordComponent } from "./dashbord/dashbord.component";
import { FormationComponent } from "./formation/formation.component";
import { CoursComponent } from "./cours/cours.component";
import { CoursDetailComponent } from "./cours-detail/cours-detail.component";
import { MonCompteComponent } from "./mon-compte/mon-compte.component";
import { CertificatComponent } from "./certificat/certificat.component";

const routes:Routes = [
    {
        path:'',
        component:DashbordComponent,
        children:[
            {
             path:'formations',
             component:FormationComponent
            },
            {
                path:'cours_suivis',
                component:CoursComponent
            },
            {
                path:'cours_detail' ,
                component:CoursDetailComponent
            },
            {
                path:'mon_compte',
                component:MonCompteComponent
            },
            {
                path:'certificat',
                component:CertificatComponent
            }
        ]
    }
]









@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class UserPortailRouterModule{}
 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { CoursComponent } from './cours/cours.component';
import { EntityComponent } from './entity/entity.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { AjoutCoursComponent } from './ajout-cours/ajout-cours.component';
import { CoursDetailComponent } from './cours-detail/cours-detail.component';
import { CoursListeComponent } from './cours-liste/cours-liste.component';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';

const routes :Routes = [
    {
        path:'',
        component:DashbordComponent,
        children:[
            {
                path:"cours",
                component:CoursComponent
            },
            {
                path:'organisation',
                component:EntityComponent
            },
            {
                path:'utilisateurs',
                component:UtilisateursComponent
            },
            {
                path:'ajoute_cours',
                component:AjoutCoursComponent
            },
            {
                path:'cours_detail',
                component:CoursDetailComponent
            },
            {
                path:'liste_cours',
                component:CoursListeComponent
            },
            {
                path:'organisation_detail/:id',
                component:EntityDetailComponent
            },
            {
               path:"add_course",
               component:CoursComponent 
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule] 
  }) 

  export class adminRouter {}
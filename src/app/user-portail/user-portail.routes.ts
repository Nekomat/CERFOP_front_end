import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { FormationComponent } from './formation/formation.component';
import { CoursComponent } from './cours/cours.component';
import { CoursDetailComponent } from './cours-detail/cours-detail.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { CertificatComponent } from './certificat/certificat.component';
import { CertiComponent } from './certi/certi.component';
import { EventsComponent } from './events/events.component';
import { BiblioComponent } from './biblio/biblio.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'formations',
        component: FormationComponent,
      },
      {
        path: 'cours_suivis',
        component: CoursComponent,
      },
      {
        path: 'cours_detail/:id',
        component: CoursDetailComponent,
      },
      {
        path: 'mon_compte',
        component: MonCompteComponent,
      },
      {
        path: 'certificat',
        component: CertificatComponent,
      },
      {
        path: 'certi',
        component: CertiComponent,
      },

      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'bibliotheque',
        component: BiblioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPortailRouterModule {}

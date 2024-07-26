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
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { BiblioComponent } from './biblio/biblio.component';
import { CertificatsComponent } from './certificats/certificats.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cours',
        component: CoursComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'bibliotheque',
        component: BiblioComponent,
      },
      {
        path: 'certificats',
        component: CertificatsComponent,
      },
      {
        path: 'organisation',
        component: EntityComponent,
      },
      {
        path: 'utilisateurs',
        component: UtilisateursComponent,
      },
      {
        path: 'ajoute_cours',
        component: AjoutCoursComponent,
      },
      {
        path: 'cours_detail',
        component: CoursDetailComponent,
      },
      {
        path: 'liste_cours',
        component: CoursListeComponent,
      },
      {
        path: 'organisation_detail/:id',
        component: EntityDetailComponent,
      },
      {
        path: 'add_course',
        component: CoursComponent,
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
      {
        path: 'mon-compte',
        component: MonCompteComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class adminRouter {}

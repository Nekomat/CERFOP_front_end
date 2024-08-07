import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminRouter } from './admin-dashbord.routes';
import { AjoutCoursComponent } from './ajout-cours/ajout-cours.component';
import { CoursComponent } from './cours/cours.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { EntityComponent } from './entity/entity.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { CoursDetailComponent } from './cours-detail/cours-detail.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CoursListeComponent } from './cours-liste/cours-liste.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { adminInterceptor } from './admin.interceptor';
import { AdminService } from './admin.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCardModule } from 'ng-zorro-antd/card';
import { QuizComponent } from './quiz/quiz.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { EventsComponent } from './events/events.component';
import { CertificatsComponent } from './certificats/certificats.component';
import { BiblioComponent } from './biblio/biblio.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';

import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AjoutCoursComponent,
    CoursComponent,
    DashbordComponent,
    EntityComponent,
    UtilisateursComponent,
    CoursDetailComponent,
    CoursListeComponent,
    EntityDetailComponent,
    QuizComponent,
    EventsComponent,
    CertificatsComponent,
    BiblioComponent,
    MonCompteComponent,
  ],
  imports: [
    CommonModule,
    adminRouter,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule,
    HttpClientModule,
    NzSkeletonModule,
    FormsModule,
    ReactiveFormsModule,
    NzStepsModule,
    NzCardModule,
    NzDividerModule,
    NzInputNumberModule,
    NzRadioModule,
    NzFormModule,
    ReactiveFormsModule,

    QuillModule,
    QuillModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: adminInterceptor,
      multi: true,
    },
    AdminService,
  ],
})
export class AdminDashbordModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FormationComponent } from './formation/formation.component';
import { CoursComponent } from './cours/cours.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { EventsComponent } from './events/events.component';
import { CertificatComponent } from './certificat/certificat.component';
import { UserPortailRouterModule } from './user-portail.routes';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { userInterceptor } from './user.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { CoursDetailComponent } from './cours-detail/cours-detail.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashbordComponent,
    FormationComponent,
    CoursComponent,
    CertificatComponent,
    CoursDetailComponent,
    EventsComponent,
    MonCompteComponent,
  ],
  imports: [
    CommonModule,
    UserPortailRouterModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzCardModule,
    NzButtonModule,
    NzListModule,
    NzTabsModule,
    HttpClientModule,
    NzSkeletonModule,
    NzCollapseModule,
    NzModalModule,
    NzRadioModule,
    FormsModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzProgressModule,
    NzInputModule,
    NzBadgeModule,
    NzCardModule,
    NzPopoverModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzMessageModule,
    NzSelectModule,
    NzStepsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: userInterceptor,
      multi: true,
    },
    UserService,
  ],
})
export class UserPortailModule {}

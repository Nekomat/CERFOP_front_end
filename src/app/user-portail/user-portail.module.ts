import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FormationComponent } from './formation/formation.component';
import { CoursComponent } from './cours/cours.component';
import { CertificatComponent } from './certificat/certificat.component';
import { UserPortailRouterModule } from './user-portail.routes';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';


@NgModule({
  declarations: [DashbordComponent , FormationComponent ,CoursComponent,CertificatComponent ],
  imports: [  
    CommonModule ,
    UserPortailRouterModule ,
    NzLayoutModule ,
    NzIconModule,
    NzMenuModule ,
    NzCardModule,
    NzButtonModule,
    NzListModule,
    
   
  ] 
})
export class UserPortailModule { }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { cours } from '../interfaces/cours';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-cours-liste',
  templateUrl: './cours-liste.component.html',
  styleUrl: './cours-liste.component.scss'
})
export class CoursListeComponent implements OnInit {
   constructor(
    private http:HttpClient,
    private adminService : AdminService
   ){}
  coursList : cours[]=[]
  skeleton = true
 ngOnInit(): void {
   this.adminService.allCourse().subscribe({
    next:(result)=>{
       this.coursList=result
       this.skeleton = false
    } 
   })
 }
}

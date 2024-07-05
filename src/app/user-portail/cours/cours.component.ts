import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { selectdeCourse } from '../../admin-dashbord/interfaces/selectedCourse';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss'
})
export class CoursComponent implements OnInit {
  constructor(
    private userService : UserService ,
    private router:Router
  ){}
  userHisCourse:selectdeCourse[]=[]
  skeleton = true
  ngOnInit(): void { 
    this.userService.followersCour().subscribe({
      next:(result)=>{
        this.userHisCourse = result 
        this.skeleton=false
      },
      error:(err)=>{
          
      }
    })
  }

  gotoCourseDetail(id){
    this.router.navigateByUrl(`/user_portail/cours_detail/${id}`)
  }
}

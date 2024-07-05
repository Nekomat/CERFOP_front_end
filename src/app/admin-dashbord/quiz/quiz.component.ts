import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cours } from '../interfaces/cours';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  constructor(
    private adminService : AdminService,
    private formCtl:FormBuilder
  ){}
  section:FormGroup=this.formCtl.group({
    coursId:["",Validators.required],
    question:["",Validators.required] ,
    correct:["",Validators.required],
    incorrect:["",Validators.required]
  })
  allCours:cours[]=[]
  ngOnInit(): void {
    this.adminService.allCourse().subscribe({
      next:(result)=>{
        this.allCours=result
      }
    })
  }

  // add quiz 
  loader = false
  addQuiz(){
  this.loader=true
   this.adminService.addQuiz(this.section.value).subscribe({
    next:()=>{
      Swal.fire('Success',"Quiz ajoutées avec succes",'success')
      this.loader=false
      this.section.reset()
    },
    error:()=>{
      Swal.fire('Erreur',"Erreur veuillez reessayer","error")
    }
   })
  }
}

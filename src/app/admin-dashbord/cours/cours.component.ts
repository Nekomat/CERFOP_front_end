import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { cours } from '../interfaces/cours';
import { chapitre } from '../interfaces/chapitres';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss'
})
export class CoursComponent {
  constructor(
    private formCtrl : FormBuilder ,
     private adminService : AdminService
  ){}

  section1:FormGroup = this.formCtrl.group({
    name:["",Validators.required] ,
    description:["",Validators.required] ,
    duree:["",Validators.required],
    photo:["",Validators.required] 
  }) 

  sectionVideo : FormGroup = this.formCtrl.group({
    chapitreId : ["",Validators.required] ,
    video:["",Validators.required] ,
    name:["",Validators.required],
    duration:["",Validators.required]
  })

  allCourseData = new FormData
  saveCoursPicture(event){
   this.allCourseData.set("picture", event.target.files[0]) 
   this.section1.patchValue({photo:"okok"}) 
  }


  current = 0;
  courseLoader = false 
  savedCour:cours
 async saveCourse(){
  this.courseLoader = true
   this.allCourseData.set('courDetail' , JSON.stringify(this.section1.value)) 
    this.adminService.addCourse(this.allCourseData).subscribe({
      next:(result)=>{
        this.current += 1;
        this.courseLoader = false 
        this.savedCour = result
      },
      error:()=>{
        this.courseLoader=false
        Swal.fire('Erreur',"Erreur veuillez reessayer","error")
      }
    })
  }
  chapitreName = ""
  loaderChapitre = false
  saveChapitre(){
   if(this.chapitreName){
     this.loaderChapitre = true
     this.adminService.addChapter({name:this.chapitreName , coursId:this.savedCour.id}).subscribe({
      next:()=>{
        this.chapitreName = "" 
        Swal.fire('Success',"Chapitre enrégistré","success") 
        this.getAllChapiter()
        this.loaderChapitre=false 
      } 
     })
   }else{
    Swal.fire('Erreur',"Veuillez bien remplir le formulaire","error")
   }
  } 
  allChapiter : chapitre[]=[]
  getAllChapiter(){
    this.adminService.getAllChapiter().subscribe({
      next:(value)=>{
          this.allChapiter = value 
      }
    })
  }
videoByChapiter = new FormData
saveFileVideo(event){
  this.videoByChapiter.set('video',event.target.files[0]) 
  this.sectionVideo.patchValue({video:"okok"}) 
}

 chapiterSelected="" 
 videoLoader = false
 addVideoBYChapiter(){
   if(this.sectionVideo.valid){
    this.videoLoader = true
    this.videoByChapiter.set('videoDetail',JSON.stringify(this.sectionVideo.value))
      this.adminService.addVideo(this.videoByChapiter).subscribe({
        next:()=>{
          Swal.fire("Succes","Video ajoutée avec succes","success")
          this.videoLoader=false 
          this.sectionVideo.reset()
        },
        error:()=>{
          Swal.fire('Erreur',"Erreur veuillez reessayer","error")
          this.videoLoader=false
        }
      })
   }else{
    Swal.fire('Error','Veuillez bien remplir le formulaire','error')
   }
  }

  // ajout des quiz 

  sectionQuiz:FormGroup = this.formCtrl.group({
    question:["", Validators.required],
    correct:["", Validators.required],
    incorrect:["", Validators.required],
  })
   quizLoader=false
  addQuiz(){
    this.quizLoader = true 
    this.adminService.addQuiz({quizData : this.sectionQuiz.value , coursId:this.savedCour.id}).subscribe({
      next:()=>{
        Swal.fire('Succes','Quiz ajoutés avec succes','success')
        this.quizLoader=false 
        this.sectionQuiz.reset()  
      },
      error:(err)=>{
      Swal.fire('Erreur',err.error.message , "error") 
      this.quizLoader = false
      } 
    })
  }
 




  // pre(): void {
  //   this.current -= 1;
  //   this.changeContent();
  // }

  // next(): void {
  //   this.current += 1;
  //   this.changeContent();
  // }

  // done(): void {
  //   console.log('done');
  // }

  // changeContent(): void {
  //   switch (this.current) {
  //     case 0: { 
         
  //       this.index = 'First-content';
  //       break;
  //     }
  //     case 1: {
  //       this.index = 'Second-content';
  //       break;
  //     }
  //     case 2: {
  //       this.index = 'third-content';
  //       break;
  //     }
  //     default: {
  //       this.index = 'error';
  //     }
  //   }
  // }
}

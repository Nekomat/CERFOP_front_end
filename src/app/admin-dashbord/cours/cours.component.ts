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
  
 chapiterSelected=""
 addVideoBYChapiter(){
  if(this.chapiterSelected){
    
  }
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

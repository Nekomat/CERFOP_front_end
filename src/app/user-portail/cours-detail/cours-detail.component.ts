import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { selectdeCourse } from '../../admin-dashbord/interfaces/selectedCourse';
import Swal from 'sweetalert2';
import { quiz } from '../../admin-dashbord/interfaces/quiz';

@Component({
  selector: 'app-cours-detail',
  templateUrl: './cours-detail.component.html',
  styleUrl: './cours-detail.component.scss'
})
export class CoursDetailComponent  implements OnInit{ 
  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef<HTMLVideoElement>;
  constructor(
    private http : HttpClient ,
    private userService : UserService ,
    private  route : ActivatedRoute
  ){
  }
  skeleton=true
  oneCourse:selectdeCourse 
  videoLink=""
  selectedVideo:any
   ngOnInit(): void {
    this.skeleton=true
    this.videoLink = ""
    const getId = this.route.snapshot.paramMap.get('id') 
    this.userService.getOneCourse(getId).subscribe({
      next:(result)=>{
        this.oneCourse=result 
        console.log(this.oneCourse.userCourse.courseCompleted) 
      for (let index = 0; index < this.oneCourse.userCourse.chapiter.length; index++) {
        const element =  this.oneCourse.userCourse.chapiter[index]; 
       for (let index2 = 0; index2 < element.videos.length; index2++) {
        const elementVideo = element.videos[index2]; 
          elementVideo.active = false
          elementVideo.disable = true
         if(elementVideo.is_completed == false){
             this.videoLink = elementVideo.path 
             this.selectedVideo = elementVideo.id
             elementVideo.active = true 
             break 
         }else{
          elementVideo.disable = false
         }
         console.log(elementVideo)
       }
        
      }
        this.skeleton = false  
      }
    })
  }

  videoEnded(){
    this.oneCourse.userCourse.chapiter.forEach(element=>{
      element.videos.forEach(elementVideo=>{
        if(elementVideo.id == this.selectedVideo){
          elementVideo.is_completed=true
        }
      })
    }) 
    console.log(this.oneCourse.userCourse.chapiter)
    this.userService.updateUserCourse(this.route.snapshot.paramMap.get('id') , this.oneCourse.userCourse.chapiter).subscribe({
      next:()=>{
        this.ngOnInit() 
      },
      error:()=>{
        Swal.fire('Erreur',"Erreur d'enregistrement de votre session","error")
        this.ngOnInit()
      }
    })
  } 

  clickOneCourse(data){
   data.active = true 
   this.videoLink = data.path
   this.oneCourse.userCourse.chapiter.forEach(element=>{
    element.videos.forEach(elelmentvideo=>{
      if(elelmentvideo.id !=data.id){
        elelmentvideo.active = false 
      }
    })
   })
  }
  // gestion de quiz 
  isVisible = false
  handleCancel(){
    this.isVisible = false
  }
  
  getResponse = []    
  chosedResponse:any 
  disableNextBtn=false
  compteTrueResponse = 0
  handleOk(){ 
    this.allQuiz[this.indexQuiz].active = false  
    this.getResponse.push({question:this.allQuiz[this.indexQuiz].question , response : this.chosedResponse})
    this.chosedResponse=undefined
    this.allQuiz.forEach((value, index) => {
      if (index == this.indexQuiz ) this.allQuiz.splice(index, 1); 
      if(index == this.allQuiz.length-1){  
        this.allQuiz[0].active = true 
      }  
    }); 
    if(!this.allQuiz[0]){
      this.getResponse.forEach(element=>{
        console.log(element.response)
        if(element.response == true){
          this.compteTrueResponse++
        }
      })
    }





    //   
    //  
    //   if(this.indexQuiz == this.allQuiz.length){
    //      console.log('quiz') 
    //   }
     
   
  }
  loader=false 
  allQuiz : quiz[]=[]
  indexQuiz=0
  
  openQuizModal(){ 
    this.loader = true
    this.userService.getQuizForCourse(this.route.snapshot.paramMap.get('id') ).subscribe({
      next:(result)=>{ 
      result.map((e)=>e.active = false)
      result[0].active = true 
        this.allQuiz = result
        this.loader = false 
        this.isVisible=true 
      },
      error:()=>{
        Swal.fire('Erreur',"Erreur veuillez reessayer","error")
        this.loader=false
      }
    })
  }
  
}

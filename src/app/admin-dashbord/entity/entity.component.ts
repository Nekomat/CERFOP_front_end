import { Component, OnInit } from '@angular/core';
import { entity } from '../interfaces/entity';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss'
})
export class EntityComponent  implements  OnInit{
  constructor(
    private service : AdminService
  ){}
  organisation : Array<entity> = [] 
  skeleton=true
  entityName=""
  ngOnInit(): void {
    this.organisation = [] 
    this.skeleton = true
    this.service.getAllEntity().subscribe({
       next:(result)=>{
        result.forEach(element=>{
          element.createdAt = new Date(element.createdAt)
        })
        this.organisation = result
        this.skeleton=false 
       } ,
       error:()=>{  
       }
    })
  }
  
  isVisible = false

  handleCancel(){
    this.isVisible=false
  }
  loader = false
  handleOk(){
  if(this.entityName){
    this.loader = true
    this.service.createEntity({name:this.entityName}).subscribe({
      next:()=>{
        Swal.fire('Succes',"Organisation ajoutée avec succes","success") 
        this.loader = false
        this.entityName = ""
          this.isVisible = false
         this.ngOnInit() 
      },
      error:()=>{
        this.loader = false
        Swal.fire("Error","Erreur d'ajout d'une organisation","error")
      }
    })
  }else{
    Swal.fire('Error',"Veuillez mettre le nom de l'organisation","error")
  }
  }
}

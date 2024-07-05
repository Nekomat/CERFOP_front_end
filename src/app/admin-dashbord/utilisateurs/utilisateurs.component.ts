import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from '../interfaces/user';
import { entity } from '../interfaces/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import readXlsxFile from 'read-excel-file'

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent implements OnInit{
  constructor(
    private adminService : AdminService ,
    private formCtl : FormBuilder
  ){}
  dataSet:Array<User>=[]
  UaddModal=false 
  importModal=false 
  skeleton = true 
  allEntity : Array<entity> = [] 

  addForm : FormGroup = this.formCtl.group({
    first_name:["" , Validators.required], 
    last_name : ["" , Validators.required] ,
    email:["",[Validators.required , Validators.email]] ,
    phone_number:["" ,Validators.required] ,
    entityId:["" , Validators.required ]
  })

  ngOnInit(): void { 
    this.dataSet = []
    this.adminService.getAllUser().subscribe({
      next:(result)=>{
        this.dataSet = result 
        this.skeleton=false 
        result.forEach(element=>{
          console.log(element.entity)
        })
      }, 
    })
    this.adminService.getAllEntity().subscribe({
      next:(result)=>{
        this.allEntity = result
      }
    })
  }
  UCancel(){ 
    this.UaddModal=false
  }
  loader=false
  UOk(){
   this.loader=true
   this.adminService.addUser(this.addForm.value).subscribe({
    next:()=>{
      Swal.fire("Succces","Utilisateur ajouté","success")
      this.UaddModal=false
      this.loader=false
      this.ngOnInit() 
    },
    error:(err)=>{
      Swal.fire("Erreur",err.error.message,'error') 
      this.loader=false
    }
   })
  }
  handleCancelImport(){
    this.importModal=false
  }
  loader2 = false
  handleOkImport(){
    if(this.entityId && this.bulkData[0]){
      this.loader2=true
      this.adminService.bulkAddUser(this.bulkData).subscribe({
        next:()=>{ 
           this.importModal = false
           this.ngOnInit() 
           this.loader2 = false
           Swal.fire("Succes","Utilisateur ajoutés avec succes","success")
        },
        error:(err)=>{
          this.loader2=false
      this.importModal=false
      Swal.fire("Erreur",err.error.message,"error")
        }
       })
    }else{
      
      Swal.fire('Erreur',"Veuillez bien remplir le formulaire",'error')
    }
     
  }
   entityId=""
   bulkData = []
  handleChangeImport(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      rows.forEach((element,index)=>{
         if(index!=0){
            this.bulkData.push({
              first_name:element[0],
              last_name:element[1],
              email:element[2],
              phone_number:element[3],
              entityId:this.entityId
            })
         }
      })
      console.log(this.bulkData) 
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { cours } from '../../admin-dashbord/interfaces/cours';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss',
})
export class FormationComponent implements OnInit {
  constructor(private userService: UserService) {}
  skeleton = false;
  position: 'left' = 'left';

  allCours: cours[] = [
    {
      name: 'Le Parlement',
      description: 'Introduction au parlements et les objectifs',
      duree: '12h15min',
      photo:
        'https://www.communautesaintmartin.org/wp-content/uploads/2018/04/Justice-Photo.jpg',
      id: 2,
      loader: false,
    },
  ];
  ngOnInit() {}

  //  allCours:cours[]=[]
  //  ngOnInit(): void {
  //     this.userService.getAllCourse().subscribe({
  //       next:(result)=>{
  //         result.forEach(element=>{
  //           element.loader=false
  //         })
  //       this.allCours = result
  //       this.skeleton=false
  //       }
  //     })
  //  }

  //  addCours(cours:cours){
  //   Swal.fire({
  //     title:'Avertissement',
  //     text:"Souhaitez-vous vraiment suivre ce cours ?",
  //     confirmButtonText:'Oui',
  //     showCancelButton:true,
  //     cancelButtonText:'Non',
  //     icon:"question"
  //   }).then((result)=>{
  //     if(result.isConfirmed){
  //       cours.loader = true
  //       this.userService.followCours(cours.id).subscribe({
  //         next:(result)=>{
  //          this.allCours = this.allCours.filter(e=>e.id != cours.id)
  //          Swal.fire('Succses',"Cours ajouté ","success")
  //          cours.loader = false
  //         },
  //         error:(err)=>{
  //           Swal.fire("Erreur",err.error.message,"error")
  //           cours.loader=false
  //         }
  //       })
  //     }
  //   })

  //  }

  addCours(i) {}
}

import { Component, OnInit } from '@angular/core';
import { entity } from '../interfaces/entity';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss',
})
export class EntityComponent implements OnInit {
  constructor(private service: AdminService) {}
  organisation: Array<entity> = [];
  skeleton = true;
  entityName = '';
  ngOnInit(): void {
    this.organisation = [];
    this.skeleton = true;
    this.service.getAllEntity().subscribe({
      next: (result) => {
        result.forEach((element) => {
          element.createdAt = new Date(element.createdAt);
        });
        this.organisation = result;
        this.skeleton = false;
      },
      error: () => {},
    });
  }

  isVisible = false;

  handleCancel() {
    this.isVisible = false;
  }
  loader = false;
  handleOk() {
    if (this.entityName) {
      this.loader = true;
      this.service.createEntity({ name: this.entityName }).subscribe({
        next: () => {
          Swal.fire(
            'Ajout réussi !',
            'Le groupe a été ajouté avec succès',
            'success'
          );
          this.loader = false;
          this.entityName = '';
          this.isVisible = false;
          this.ngOnInit();
        },
        error: () => {
          this.loader = false;
          Swal.fire(
            'Oups !',
            "Il y a eu une erreur lors de l'ajout du groupe",
            'error'
          );
        },
      });
    } else {
      Swal.fire(
        'Oups !',
        'Veuillez saisir le nom du groupe dans le champ.',
        'error'
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrl: './biblio.component.scss',
})
export class BiblioComponent implements OnInit {
  validateForm!: FormGroup;
  biblio: any[] = [];
  isVisible = false;
  isEditing = false;
  currentBiblioId: string | null = null;
  loader = false;
  skeleton = true;
  filteredBiblio: any[] = [];
  searchTerm = '';

  listOfItem: string[] = [
    'Textes et Lois adoptées',
    'Articles',
    'Rapports',
    'Livres',
  ];

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      category: ['', [Validators.required]],
      title: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });

    this.getAllBiblio();
  }

  getAllBiblio(): void {
    this.adminService.getAllBiblio().subscribe({
      next: (result) => {
        this.biblio = result;
        this.skeleton = false;
        this.filteredBiblio = this.biblio;
      },
      error: () => {
        this.skeleton = false;
        Swal.fire(
          'Erreur',
          'Erreur lors de la récupération des documents',
          'error'
        );
      },
    });
  }

  openModal(biblio?: any): void {
    this.isVisible = true;
    if (biblio) {
      this.isEditing = true;
      this.currentBiblioId = biblio.id;
      this.validateForm.patchValue(biblio);
    } else {
      this.isEditing = false;
      this.currentBiblioId = null;
      this.validateForm.reset();
    }
  }

  closeModal(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.loader = true;
      if (this.isEditing && this.currentBiblioId) {
        this.adminService
          .updateBiblio(this.currentBiblioId, this.validateForm.value)
          .subscribe({
            next: () => {
              Swal.fire('Succès', 'Document mis à jour avec succès', 'success');
              this.getAllBiblio();
              this.closeModal();
              this.loader = false;
            },
            error: () => {
              this.loader = false;
              Swal.fire(
                'Erreur',
                'Erreur lors de la mise à jour du document',
                'error'
              );
            },
          });
      } else {
        this.adminService.createBiblio(this.validateForm.value).subscribe({
          next: () => {
            Swal.fire('Succès', 'Document créé avec succès', 'success');
            this.getAllBiblio();
            this.closeModal();
            this.loader = false;
          },
          error: () => {
            this.loader = false;
            Swal.fire(
              'Erreur',
              'Erreur lors de la création du document',
              'error'
            );
          },
        });
      }
    } else {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs requis', 'error');
    }
  }

  deleteBiblio(biblioId: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteBiblio(biblioId).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'Le document a été supprimé.', 'success');
            this.getAllBiblio();
          },
          error: () => {
            Swal.fire(
              'Erreur',
              'Erreur lors de la suppression du document',
              'error'
            );
          },
        });
      }
    });
  }

  filterBiblio() {
    if (this.searchTerm) {
      this.filteredBiblio = this.biblio.filter(
        (doc) =>
          doc.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          doc.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredBiblio = this.biblio;
    }
  }

  addItem(inputElement: HTMLInputElement): void {
    const value = inputElement.value.trim();
    if (value && !this.listOfItem.includes(value)) {
      this.listOfItem.push(value);
      inputElement.value = '';
    }
  }

  handleChangepdf(info: any): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.validateForm.patchValue({ file: info.file.response });
      Swal.fire(
        'Succès',
        `${info.file.name} fichier ajouté avec succès`,
        'success'
      );
    } else if (info.file.status === 'error') {
      Swal.fire('Erreur', `${info.file.name} le chargement a échoué`, 'error');
    }
  }
}

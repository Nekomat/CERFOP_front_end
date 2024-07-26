import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  validateForm!: FormGroup;
  events: any[] = [];
  isVisible = false;
  isEditing = false;
  currentEventId: string | null = null;
  loader = false;
  skeleton = true;
  filteredEvents: any[] = [];
  searchTerm = '';

  listOfItem: string[] = ['Forum', 'Atélier', 'Conférence', 'Colloque'];

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      category: ['', [Validators.required]],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });

    this.getAllEvents();
  }

  getAllEvents(): void {
    this.adminService.getAllEvents().subscribe({
      next: (result) => {
        this.events = result;
        this.skeleton = false;
        this.filteredEvents = result;
      },
      error: () => {
        this.skeleton = false;
        Swal.fire(
          'Erreur',
          'Erreur lors de la récupération des événements',
          'error'
        );
      },
    });
  }

  openModal(event?: any): void {
    this.isVisible = true;
    if (event) {
      this.isEditing = true;
      this.currentEventId = event.id;
      this.validateForm.patchValue(event);
    } else {
      this.isEditing = false;
      this.currentEventId = null;
      this.validateForm.reset();
    }
  }

  closeModal(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.loader = true;
      if (this.isEditing && this.currentEventId) {
        this.adminService
          .updateEvent(this.currentEventId, this.validateForm.value)
          .subscribe({
            next: () => {
              Swal.fire(
                'Succès',
                'Événement mis à jour avec succès',
                'success'
              );
              this.getAllEvents();
              this.closeModal();
              this.loader = false;
            },
            error: () => {
              this.loader = false;
              Swal.fire(
                'Erreur',
                "Erreur lors de la mise à jour de l'événement",
                'error'
              );
            },
          });
      } else {
        this.adminService.createEvent(this.validateForm.value).subscribe({
          next: () => {
            Swal.fire('Succès', 'Événement créé avec succès', 'success');
            this.getAllEvents();
            this.closeModal();
            this.loader = false;
          },
          error: () => {
            this.loader = false;
            Swal.fire(
              'Erreur',
              "Erreur lors de la création de l'événement",
              'error'
            );
          },
        });
      }
    } else {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs requis', 'error');
    }
  }

  deleteEvent(eventId: string): void {
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
        this.adminService.deleteEvent(eventId).subscribe({
          next: () => {
            Swal.fire('Supprimé!', "L'événement a été supprimé.", 'success');
            this.getAllEvents();
          },
          error: () => {
            Swal.fire(
              'Erreur',
              "Erreur lors de la suppression de l'événement",
              'error'
            );
          },
        });
      }
    });
  }

  filterEvents() {
    if (this.searchTerm) {
      this.filteredEvents = this.events.filter(
        (event) =>
          event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          event.category
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEvents = this.events;
    }
  }

  // Function to add new categories
  addItem(inputElement: HTMLInputElement): void {
    const value = inputElement.value.trim();
    if (value && !this.listOfItem.includes(value)) {
      this.listOfItem.push(value);
      this.validateForm.patchValue({ category: value });
      inputElement.value = '';
    }
  }
}

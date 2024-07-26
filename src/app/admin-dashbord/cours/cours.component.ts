import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { cours } from '../interfaces/cours';
import { chapitre } from '../interfaces/chapitres';
import { Location } from '@angular/common';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss',
})
export class CoursComponent {
  constructor(
    private formCtrl: FormBuilder,
    private adminService: AdminService,
    private location: Location,
    private msg: NzMessageService
  ) {}

  goBack(): void {
    this.location.back();
  }

  section1: FormGroup = this.formCtrl.group({
    name: ['', Validators.required],
    courteDescription: ['', Validators.required],
    longueDescription: ['', Validators.required],
    categorie: ['', Validators.required],
    duree: ['', Validators.required],
    photo: ['', Validators.required],
  });

  /* select category */
  listOfItem: string[] = [
    'Processus Légistlatif et Gouvernance',
    'Leadership',
    'Communication et Leadership',
    'Relations internationales et Diplomatie',
  ];

  addItem(inputElement: HTMLInputElement): void {
    const value = inputElement.value.trim();
    if (value && !this.listOfItem.includes(value)) {
      this.listOfItem.push(value);
      this.section1.patchValue({ categorie: value });
      inputElement.value = '';
    }
  }

  sectionVideo: FormGroup = this.formCtrl.group({
    chapitreId: ['', Validators.required],
    video: ['', Validators.required],
    name: ['', Validators.required],
    duration: ['', Validators.required],
  });

  allCourseData = new FormData();
  saveCoursPicture(event) {
    this.allCourseData.set('picture', event.target.files[0]);
    this.section1.patchValue({ photo: 'okok' });
  }

  current = 0;
  courseLoader = false;
  savedCour: cours;
  async saveCourse() {
    this.courseLoader = true;
    this.allCourseData.set('courDetail', JSON.stringify(this.section1.value));
    this.adminService.addCourse(this.allCourseData).subscribe({
      next: (result) => {
        this.current += 1;
        this.courseLoader = false;
        this.savedCour = result;
      },
      error: () => {
        this.courseLoader = false;
        Swal.fire('Erreur', 'Erreur veuillez reessayer', 'error');
      },
    });
  }
  chapitreName = '';
  loaderChapitre = false;
  saveChapitre() {
    if (this.chapitreName) {
      this.loaderChapitre = true;
      this.adminService
        .addChapter({ name: this.chapitreName, coursId: this.savedCour.id })
        .subscribe({
          next: () => {
            this.chapitreName = '';
            Swal.fire('Success', 'Chapitre enrégistré', 'success');
            this.getAllChapiter();
            this.loaderChapitre = false;
          },
        });
    } else {
      Swal.fire('Erreur', 'Veuillez bien remplir le formulaire', 'error');
    }
  }
  allChapiter: chapitre[] = [];
  getAllChapiter() {
    this.adminService.getAllChapiter().subscribe({
      next: (value) => {
        this.allChapiter = value;
      },
    });
  }
  videoByChapiter = new FormData();
  saveFileVideo(event) {
    this.videoByChapiter.set('video', event.target.files[0]);
    this.sectionVideo.patchValue({ video: 'okok' });
  }

  chapiterSelected = '';
  videoLoader = false;
  addVideoBYChapiter() {
    if (this.sectionVideo.valid) {
      this.videoLoader = true;
      this.videoByChapiter.set(
        'videoDetail',
        JSON.stringify(this.sectionVideo.value)
      );
      this.adminService.addVideo(this.videoByChapiter).subscribe({
        next: () => {
          Swal.fire('Succes', 'Video ajoutée avec succes', 'success');
          this.videoLoader = false;
          this.sectionVideo.reset();
        },
        error: () => {
          Swal.fire('Erreur', 'Erreur veuillez reessayer', 'error');
          this.videoLoader = false;
        },
      });
    } else {
      Swal.fire('Error', 'Veuillez bien remplir le formulaire', 'error');
    }
  }

  // ajout des quiz

  sectionQuiz: FormGroup = this.formCtrl.group({
    question: ['', Validators.required],
    correct: ['', Validators.required],
    incorrect: ['', Validators.required],
  });
  quizLoader = false;
  addQuiz() {
    this.quizLoader = true;
    this.adminService
      .addQuiz({ quizData: this.sectionQuiz.value, coursId: this.savedCour.id })
      .subscribe({
        next: () => {
          Swal.fire('Succes', 'Quiz ajoutés avec succes', 'success');
          this.quizLoader = false;
          this.sectionQuiz.reset();
        },
        error: (err) => {
          Swal.fire('Erreur', err.error.message, 'error');
          this.quizLoader = false;
        },
      });
  }

  // Quill Editor
  editorContent: string = '';
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline' /* 'strike' */],
      ['blockquote' /* 'code-block' */],
      /* [{ header: 1 }, { header: 2 }],  */
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      /* [{ direction: 'rtl' }], */ // text direction
      /* [{ size: ['small', false, 'large', 'huge'] }],  */
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      /* [{ color: [] }, { background: [] }], */
      /* [{ font: [] }], */
      [{ align: [] }],
      ['clean'],
      ['link', 'image' /* 'video' */],
    ],
  };

  onEditorCreated(event) {
    console.log('L"éditeur est prêt !');
  }

  onContentChanged(event) {
    console.log('Description modifiée:', event);
  }

  /* generate */

  chapitres: any[] = [];
  chapterCount: number = 1;
  showAddChapterButton = false;

  /* generate chapters */
  generateChapitres(count: number) {
    this.chapitres = Array.from({ length: count }, () => ({
      chapitreName: '',
      contenus: [{ sousChapitreName: '', video: null }],
    }));
    this.showAddChapterButton = true;
  }

  /* Ajouter du contenu */
  addContenu(index: number) {
    this.chapitres[index].contenus.push({ sousChapitreName: '', video: null });
  }

  /* Ajotuer un autre chapitre */
  addAnotherChapitre() {
    this.chapitres.push({
      chapitreName: '',
      contenus: [{ sousChapitreName: '', video: null }],
    });
  }

  /* upload file video */

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} Vidéo ajoutée avec succès`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} Le chargement de la vidéo échoué.`);
    }
  }

  /* upload file pdf */
  handleChangepdf(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} pdf ajoutée avec succès`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} Le chargement du pdf a échoué.`);
    }
  }

  /* Questions pour le quiz */
  questions: any[] = [];
  selectedChapitre: string = '';

  /* Ajouter une question Vrai/Faux */
  addVraiFauxQuestion() {
    this.questions.push({ type: 'vrai-faux', question: '', correctAnswer: '' });
  }

  /* Ajouter une question à choix */
  addChoixQuestion() {
    this.questions.push({
      type: 'choix',
      question: '',
      correctAnswer: '',
      incorrectAnswers: ['', '', ''],
    });
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

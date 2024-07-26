import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { selectdeCourse } from '../../admin-dashbord/interfaces/selectedCourse';
import Swal from 'sweetalert2';
import { quiz } from '../../admin-dashbord/interfaces/quiz';

@Component({
  selector: 'app-cours-detail',
  templateUrl: './cours-detail.component.html',
  styleUrl: './cours-detail.component.scss',
})
export class CoursDetailComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true })
  videoPlayer: ElementRef<HTMLVideoElement>;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  skeleton = true;
  oneCourse: selectdeCourse;
  videoLink = '';
  selectedVideo: any;
  ngOnInit(): void {
    this.skeleton = true;
    this.videoLink = '';
    const getId = this.route.snapshot.paramMap.get('id');
    this.userService.getOneCourse(getId).subscribe({
      next: (result) => {
        this.oneCourse = result;
        console.log(this.oneCourse.userCourse.courseCompleted);
        for (
          let index = 0;
          index < this.oneCourse.userCourse.chapiter.length;
          index++
        ) {
          const element = this.oneCourse.userCourse.chapiter[index];
          for (let index2 = 0; index2 < element.videos.length; index2++) {
            const elementVideo = element.videos[index2];
            elementVideo.active = false;
            elementVideo.disable = true;
            if (elementVideo.is_completed == false) {
              this.videoLink = elementVideo.path;
              this.selectedVideo = elementVideo.id;
              elementVideo.active = true;
              break;
            } else {
              elementVideo.disable = false;
            }
            console.log(elementVideo);
          }
        }
        this.skeleton = false;
      },
    });
  }

  videoEnded() {
    this.oneCourse.userCourse.chapiter.forEach((element) => {
      element.videos.forEach((elementVideo) => {
        if (elementVideo.id == this.selectedVideo) {
          elementVideo.is_completed = true;
        }
      });
    });
    console.log(this.oneCourse.userCourse.chapiter);
    this.userService
      .updateUserCourse(
        this.route.snapshot.paramMap.get('id'),
        this.oneCourse.userCourse.chapiter
      )
      .subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: () => {
          Swal.fire(
            'Erreur',
            "Erreur d'enregistrement de votre session",
            'error'
          );
          this.ngOnInit();
        },
      });
  }

  clickOneCourse(data) {
    data.active = true;
    this.videoLink = data.path;
    this.oneCourse.userCourse.chapiter.forEach((element) => {
      element.videos.forEach((elelmentvideo) => {
        if (elelmentvideo.id != data.id) {
          elelmentvideo.active = false;
        }
      });
    });
  }
  // gestion de quiz
  isVisible = false;
  handleCancel() {
    this.isVisible = false;
  }

  getResponse = [];
  chosedResponse: any;
  disableNextBtn = false;
  compteTrueResponse = 0;
  handleOk() {
    this.allQuiz[this.indexQuiz].active = false;
    this.getResponse.push({
      question: this.allQuiz[this.indexQuiz].question,
      response: this.chosedResponse,
    });
    this.chosedResponse = undefined;
    this.allQuiz.forEach((value, index) => {
      if (index == this.indexQuiz) this.allQuiz.splice(index, 1);
      if (index == this.allQuiz.length - 1) {
        this.allQuiz[0].active = true;
      }
    });
    if (!this.allQuiz[0]) {
      this.getResponse.forEach((element) => {
        console.log(element.response);
        if (element.response == true) {
          this.compteTrueResponse++;
        }
      });
    }

    //
    //
    //   if(this.indexQuiz == this.allQuiz.length){
    //      console.log('quiz')
    //   }
  }
  loader = false;
  allQuiz: quiz[] = [];
  indexQuiz = 0;

  openQuizModal() {
    this.loader = true;
    this.userService
      .getQuizForCourse(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (result) => {
          result.map((e) => (e.active = false));
          result[0].active = true;
          this.allQuiz = result;
          this.loader = false;
          this.isVisible = true;
        },
        error: () => {
          Swal.fire('Erreur', 'Erreur veuillez reessayer', 'error');
          this.loader = false;
        },
      });
  }

  /* quiz */

  openQuizModal2() {
    this.loader = true;
    const getId = this.route.snapshot.paramMap.get('id');
    this.userService.getQuizForCourse(getId).subscribe({
      next: (result) => {
        this.allQuiz = result.map((quiz) => ({
          ...quiz,
          userAnswer: '',
          feedback: '',
          feedbackMessage: '',
        }));
        this.loader = false;
        this.isVisible = true;
      },
      error: () => {
        Swal.fire(
          'Erreur',
          'Erreur lors du chargement du quiz. Veuillez réessayer.',
          'error'
        );
        this.loader = false;
      },
    });
  }

  chapitre1 = {
    mcq: [
      {
        id: 'q1',
        text: 'Quelle est la première étape dans le processus législatif ?',
        options: [
          { value: 'a', text: 'La promulgation' },
          { value: 'b', text: 'La première lecture' },
          { value: 'c', text: "L'initiation d'un projet de loi" },
          { value: 'd', text: 'Le contrôle de constitutionnalité' },
        ],
        correctAnswer: 'c',
        userAnswer: '',
        feedback: '',
        feedbackMessage: '',
      },
      {
        id: 'q2',
        text: "Qui signe les lois pour qu'elles soient promulguées ?",
        options: [
          { value: 'a', text: 'Le Premier Ministre' },
          { value: 'b', text: "Le Président de l'Assemblée Nationale" },
          { value: 'c', text: 'Le Président de la République' },
          { value: 'd', text: 'Le Ministre de la Justice' },
        ],
        correctAnswer: 'c',
        userAnswer: '',
        feedback: '',
        feedbackMessage: '',
      },
    ],
    trueFalse: [
      {
        id: 'q3',
        text: "La première lecture d'un projet de loi est la dernière étape du processus législatif.",
        correctAnswer: 'false',
        userAnswer: '',
        feedback: '',
        feedbackMessage: '',
      },
      {
        id: 'q4',
        text: 'Le Conseil Constitutionnel est responsable de la promulgation des lois.',
        correctAnswer: 'false',
        userAnswer: '',
        feedback: '',
        feedbackMessage: '',
      },
    ],
  };

  chapitre2 = {
    mcq: [
      {
        id: 'q5',
        text: 'Quel est le rôle principal des commissions parlementaires ?',
        options: [
          { value: 'a', text: 'Voter les lois' },
          { value: 'b', text: 'Exécuter les lois' },
          { value: 'c', text: 'Examiner les projets de loi en détail' },
          { value: 'd', text: 'Promulguer les lois' },
        ],
        correctAnswer: 'c',
        userAnswer: '',
        feedback: '',
        feedbackMessage: '',
      },
    ],
    trueFalse: [
      {
        id: 'q6',
        text: 'Les citoyens peuvent influencer le processus législatif par des pétitions.',
        correctAnswer: 'true',
        userAnswer: '',
        feedback: '',
        feedbackMessage: '',
      },
    ],
  };

  chapitre3 = {
    mcq: [
      {
        id: 'q7',
        text: 'Quelle est la particularité des lois constitutionnelles ?',
        options: [
          { value: 'a', text: 'Elles régissent les finances publiques' },
          { value: 'b', text: 'Elles peuvent être modifiées par décret' },
          { value: 'c', text: 'Elles modifient ou protègent la Constitution' },
          {
            value: 'd',
            text: 'Elles sont rédigées par des commissions parlementaires',
          },
        ],
        correctAnswer: 'c',
        userAnswer: '',
        feedback: '',
        feedbackMessage: '',
      },
    ],
    trueFalse: [
      {
        id: 'q8',
        text: 'Les lois organiques sont supérieures aux lois ordinaires.',
        correctAnswer: 'true',
        userAnswer: '',
        feedback: '',
        feedbackMessage: '',
      },
    ],
  };

  submitQuiz() {
    this.checkAnswers(this.chapitre1.mcq);
    this.checkAnswers(this.chapitre1.trueFalse);
    this.checkAnswers(this.chapitre2.mcq);
    this.checkAnswers(this.chapitre2.trueFalse);
    this.checkAnswers(this.chapitre3.mcq);
    this.checkAnswers(this.chapitre3.trueFalse);

    const hasErrors = this.checkForErrors();
    if (!hasErrors) {
      alert('Quiz soumis avec succès !');
    } else {
      alert(
        'Certaines réponses sont incorrectes. Veuillez corriger les erreurs et soumettre à nouveau.'
      );
    }
  }

  checkAnswers(questions: any[]) {
    questions.forEach((question) => {
      if (question.userAnswer === question.correctAnswer) {
        question.feedback = 'correct';
        question.feedbackMessage = 'Bonne réponse !';
      } else {
        question.feedback = 'incorrect';
        question.feedbackMessage = 'Mauvaise réponse. Veuillez réessayer.';
      }
    });
  }

  checkForErrors(): boolean {
    return (
      this.chapitre1.mcq.some((q) => q.feedback === 'incorrect') ||
      this.chapitre1.trueFalse.some((q) => q.feedback === 'incorrect') ||
      this.chapitre2.mcq.some((q) => q.feedback === 'incorrect') ||
      this.chapitre2.trueFalse.some((q) => q.feedback === 'incorrect') ||
      this.chapitre3.mcq.some((q) => q.feedback === 'incorrect') ||
      this.chapitre3.trueFalse.some((q) => q.feedback === 'incorrect')
    );
  }
}

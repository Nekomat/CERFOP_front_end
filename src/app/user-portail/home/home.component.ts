import {
  Component,
  AfterViewInit,
  ElementRef,
  Renderer2,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzProgressModule } from 'ng-zorro-antd/progress';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NzProgressModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('events', { static: false }) events!: ElementRef;
  @ViewChild('formations', { static: false }) formations!: ElementRef;
  @ViewChild('dernieresFormations', { static: false })
  dernieresFormations!: ElementRef;

  formationsDisponibles: number = 0;
  formationsEncours: number = 0;
  formationsTerminees: number = 0;
  inscription: number = 0;
  certificatsObtenus: number = 0;
  evenementsDisponibles: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /* Animation du nombre pour la statistique*/
  ngOnInit() {
    /* la durée est égale à la valeur x 100 */
    this.animateCount('formationsDisponibles', 20, 2000);
    this.animateCount('formationsEncours', 3, 300);
    this.animateCount('inscription', 15, 1500);
    this.animateCount('formationsTerminees', 2, 200);
    this.animateCount('certificatsObtenus', 2, 200);
    this.animateCount('evenementsDisponibles', 2, 200);
  }

  animateCount(property: string, end: number, duration: number) {
    const start = 0;
    const range = end - start;
    const increment = range / (duration / 100);
    let current = start;
    const stepTime = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
      current += increment;
      (this as any)[property] = Math.floor(current);
      if (current >= end) {
        clearInterval(timer);
        (this as any)[property] = end;
      }
    }, stepTime);
  }

  /* couper le text */

  ngAfterViewInit(): void {
    const titleElement =
      this.el.nativeElement.querySelector('.formation-title');
    const descriptionElement = this.el.nativeElement.querySelector(
      '.formation-description'
    );

    this.truncateText(titleElement, 2);
    this.truncateText(descriptionElement, 4);
  }

  truncateText(element: HTMLElement, lineLimit: number): void {
    const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * lineLimit;

    while (element.scrollHeight > maxHeight) {
      element.innerText = element.innerText.replace(/\W*\s(\S)*$/, '...');
    }
  }

  /* events */

  scrollLeft() {
    this.events.nativeElement.scrollBy({
      left: -464,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.events.nativeElement.scrollBy({
      left: 464,
      behavior: 'smooth',
    });
  }
  /* formation en cours */

  scrollLeft2() {
    this.formations.nativeElement.scrollBy({
      left: -380,
      behavior: 'smooth',
    });
  }

  scrollRight2() {
    this.formations.nativeElement.scrollBy({
      left: 380,
      behavior: 'smooth',
    });
  }
  /* dernieres formations */

  scrollLeft3() {
    this.dernieresFormations.nativeElement.scrollBy({
      left: -380,
      behavior: 'smooth',
    });
  }

  scrollRight3() {
    this.dernieresFormations.nativeElement.scrollBy({
      left: 380,
      behavior: 'smooth',
    });
  }
}

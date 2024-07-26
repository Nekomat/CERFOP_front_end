import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-certi',
  standalone: true,
  imports: [],
  templateUrl: './certi.component.html',
  styleUrl: './certi.component.scss',
})
export class CertiComponent {
  @ViewChild('certificat', { static: false }) certificatElement: ElementRef;

  constructor(private renderer: Renderer2, private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  /* Utiise ceci pour forcer une lettre majuscule à chaque début des mots du nom du user */

  capitalizeWords(str: string): string {
    return str
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/\B\w/g, (char) => char.toLowerCase());
  }

  ngOnInit(): void {}

  downloadAsPDF() {
    const element = this.certificatElement.nativeElement;

    this.setScale(1);
    html2canvas(element, { scale: 2 }).then((canvas) => {
      this.setScaleAuto();
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'px', [1125, 795]);
      pdf.addImage(imgData, 'PNG', 0, 0, 1125, 795);
      pdf.save('certificat-de-réussite.pdf');
    });
  }

  downloadAsImage() {
    const element = this.certificatElement.nativeElement;

    this.setScale(1);
    html2canvas(element, { scale: 2 }).then((canvas) => {
      this.setScaleAuto();
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'certificat-de-réussite.png';
      link.click();
    });
  }

  private setScale(scale: number): void {
    if (scale === 1) {
      this.renderer.addClass(this.certificatElement.nativeElement, 'scale-1');
    } else {
      this.renderer.removeClass(
        this.certificatElement.nativeElement,
        'scale-1'
      );
    }
  }

  private setScaleAuto(): void {
    this.renderer.removeClass(this.certificatElement.nativeElement, 'scale-1');
    this.renderer.addClass(this.certificatElement.nativeElement, 'scale');
  }
}

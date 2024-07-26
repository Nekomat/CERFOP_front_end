import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-biblio',
  standalone: true,
  imports: [CommonModule, NzTabsModule],
  templateUrl: './biblio.component.html',
  styleUrl: './biblio.component.scss',
})
export class BiblioComponent {}

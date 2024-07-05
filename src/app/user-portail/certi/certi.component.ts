import { Component } from '@angular/core';

@Component({
  selector: 'app-certi',
  standalone: true,
  imports: [],
  templateUrl: './certi.component.html',
  styleUrl: './certi.component.scss'
})
export class CertiComponent {

  certi = [
    {
      cours: 'Gouvernance Parlementaire',
      user: 'Richard Sagno',
      date: '12/05/2024'

    }
  ]

}

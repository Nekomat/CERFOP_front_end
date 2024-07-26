import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss',
})
export class DashbordComponent {
  isCollapsed = false;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /* sticky */

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const header = document.getElementById('stickyHeader');
    if (window.scrollY > 0) {
      header?.classList.add('shrink');
    } else {
      header?.classList.remove('shrink');
    }
  }
}

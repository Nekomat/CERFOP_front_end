import { Component, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd/drawer';

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

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('drawerFooterTemplate', { static: false })
  drawerFooterTemplate?: TemplateRef<{}>;

  constructor(private router: Router, private drawerService: NzDrawerService) {}

  /* modal de notification */
  openTemplate(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Notification',
      nzExtra: '03  non lues',
      nzFooter: this.drawerFooterTemplate as TemplateRef<{}>,
      nzContent: this.drawerTemplate,
    });
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

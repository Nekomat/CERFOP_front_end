import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrl: './entity-detail.component.scss',
})
export class EntityDetailComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  dataSet: Array<User> = [];
  sekeleton = true;
  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.adminService
      .getUserByEntity(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (result) => {
          this.dataSet = result;
          this.sekeleton = false;
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Admin } from '../../models/homeservices';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-list',
  standalone: false,
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css',
})
export class AdminListComponent implements OnInit{
  admins: Admin[] = [];
    userID: number = Number(localStorage.getItem('userId'));
    error: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
  
    constructor(private userservice: UserService, private router: Router) {}
  
    ngOnInit(): void {
      this.loadAdmins();
    }
  
    loadAdmins(): void {
      this.userservice.getAdmins()
        .subscribe({
          next: (data) => {
            this.admins = data;
            this.error = '';
          },
          error: (err) => {
            this.error = 'Failed to load admins.';
            console.error(err);
          }
        });
    }
    sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.admins.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.userId - b.userId;
      } else {
        return b.userId - a.userId;
      }
    });
  }
    sortByEmail(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.admins.sort((a, b) => {
      const emailA = a.email.toLowerCase();
      const emailB = b.email.toLowerCase();

      if (emailA < emailB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (emailA > emailB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  viewAdminDetails(admins: Admin): void {
    this.router.navigate(['/admin-dashboard/admin-detail', admins.userId]);
  }
    editAdmin(userId: number): void {
      this.router.navigate(['/admin-dashboard/admin-edit', userId]);
    }
    addAdmin(): void {
      this.router.navigate(['/admin-dashboard/admin-add']);
    }
}

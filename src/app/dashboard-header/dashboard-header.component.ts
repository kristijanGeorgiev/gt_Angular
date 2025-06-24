import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: false,
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {
  firstName: string = '';
  lastName: string = '';

  constructor(private router: Router) {
  this.firstName = localStorage.getItem('firstName') ?? '';
  this.lastName = localStorage.getItem('lastName') ?? '';
}

  logout() {
    localStorage.clear();
    window.location.href = '/home';
  }
}

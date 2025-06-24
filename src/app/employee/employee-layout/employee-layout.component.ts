import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-layout',
  standalone: false,
  templateUrl: './employee-layout.component.html',
  styleUrl: './employee-layout.component.css'
})
export class EmployeeLayoutComponent {
  firstName = localStorage.getItem('firstName') ?? '';

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}

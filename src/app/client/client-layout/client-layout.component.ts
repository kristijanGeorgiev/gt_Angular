import { Component } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  standalone: false,
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent {
  firstName = localStorage.getItem('firstName') ?? '';

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}

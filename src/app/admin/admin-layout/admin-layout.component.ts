import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  userMenuOpen = false;

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }
}
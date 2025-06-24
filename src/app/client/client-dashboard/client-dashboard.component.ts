import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/homeservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  standalone: false,
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  firstName = localStorage.getItem('firstName') ?? '';
  lastName = localStorage.getItem('lastName') ?? '';
  currentYear = new Date().getFullYear();

  services: Service[] = [];

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe({
      next: (res) => this.services = res,
      error: (err) => console.error('Failed to load services', err)
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/home';
  }
  goToAddBooking(serviceID: number): void {
    this.router.navigate(['/client-dashboard/booking-add', serviceID]);
  }
}

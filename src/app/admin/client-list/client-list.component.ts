import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/homeservices';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit{
    clients: Client[] = [];
  filteredClients: Client[] = [];

  emailFilter: string = '';
  firstNameFilter: string = '';
  lastNameFilter: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.userservice.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load clients.', err);
      }
    });
  }

applyFilters(): void {
  this.filteredClients = this.clients.filter(client =>
    (this.emailFilter === '' || client.email.toLowerCase().includes(this.emailFilter.toLowerCase())) &&
    (this.firstNameFilter === '' || client.firstName.toLowerCase().includes(this.firstNameFilter.toLowerCase())) &&
    (this.lastNameFilter === '' || client.lastName.toLowerCase().includes(this.lastNameFilter.toLowerCase()))
  );
}


  clearFilters(): void {
    this.emailFilter = '';
    this.firstNameFilter = '';
    this.lastNameFilter = '';
    this.applyFilters();
  }

  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredClients.sort((a, b) =>
      this.sortDirection === 'asc' ? a.userId - b.userId : b.userId - a.userId
    );
  }

  sortByEmail(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredClients.sort((a, b) =>
      this.sortDirection === 'asc'
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email)
    );
  }

  viewClientDetails(client: Client): void {
    this.router.navigate(['/admin-dashboard/client-detail', client.userId]);
  }

  editClient(userId: number): void {
    this.router.navigate(['/admin-dashboard/client-edit', userId]);
  }

  addClient(): void {
    this.router.navigate(['/admin-dashboard/client-add']);
  }
}

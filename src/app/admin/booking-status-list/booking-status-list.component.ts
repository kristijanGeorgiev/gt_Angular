import { Component } from '@angular/core';
import { BookingStatus } from '../../models/homeservices';
import { BookingStatusService } from '../../services/booking-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-status-list',
  standalone: false,
  templateUrl: './booking-status-list.component.html',
  styleUrl: './booking-status-list.component.css'
})
export class BookingStatusListComponent {
   statuses: BookingStatus[] = [];
    userID: number = Number(localStorage.getItem('userId'));
    error: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
  
    constructor(private bookingstatusservice: BookingStatusService, private router: Router) {}
  
    ngOnInit(): void {
      this.loadStatuses();
    }
  
    loadStatuses(): void {
      this.bookingstatusservice.getBookingStatuses()
        .subscribe({
          next: (data) => {
            this.statuses = data;
            this.error = '';
          },
          error: (err) => {
            this.error = 'Failed to load statuses.';
            console.error(err);
          }
        });
    }
    sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.statuses.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id- b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
    sortByName(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.statuses.sort((a, b) => {
      const nameA = a.statusName.toLowerCase();
      const nameB = b.statusName.toLowerCase();

      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
    editBookingStatus(id: number): void {
      this.router.navigate(['/admin-dashboard/bookingStatus-edit', id]);
    }
    addBookingStatus(): void {
      this.router.navigate(['/admin-dashboard/bookingStatus-add']);
    }
    deleteBookingStatus(status: BookingStatus): void {
    if (confirm('Do you want to delete the booking status')) {
      this.bookingstatusservice.deleteBookingStatus(status.id).subscribe(() => {
        this.loadStatuses();
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-employee-booking-list',
  standalone: false,
  templateUrl: './employee-booking-list.component.html',
  styleUrl: './employee-booking-list.component.css'
})
export class EmployeeBookingListComponent implements OnInit {
  bookings: Booking[] = [];
  userID: number = Number(localStorage.getItem('userId'));
  selectedStatus: string = '';
  error: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private bookingService: BookingService, private noteservice: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookingsByAssignedEmployee(this.userID, this.selectedStatus)
      .subscribe({
        next: (data) => {
          this.bookings = this.sortBookings(data);
          this.error = '';
        },
        error: (err) => {
          this.error = 'Failed to load bookings.';
          console.error(err);
        }
      });
  }

  filterByBookingStatus(): void {
    this.loadBookings();
  }

  clearFilter(): void {
    this.selectedStatus = '';
    this.loadBookings();
  }

  sortByServiceDate(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.bookings = this.sortBookings(this.bookings);
  }

  sortBookings(data: Booking[]): Booking[] {
    return data.sort((a, b) => {
      const dateA = new Date(a.serviceDate).getTime();
      const dateB = new Date(b.serviceDate).getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
  checknote(booking: Booking): void {
  this.noteservice.getNoteByBookingId(booking.bookingID).subscribe({
    next: (note) => {
      if (note) {
        this.router.navigate(['/employee-dashboard/note-edit', note.notesId]);
      } else {
        this.router.navigate(['/employee-dashboard/note-add', booking.bookingID]);
      }
    },
    error: (error) => {
      console.warn('Note not found for booking:', booking.bookingID);
      this.router.navigate(['/employee-dashboard/note-add', booking.bookingID]);
    }
  });
}

  completeBooking(booking: Booking): void {
    const confirmed = window.confirm(`Mark booking #${booking.bookingID} as Completed?`);
    if (confirmed) {
      const updatedBooking: Booking = {
        ...booking,
        bookingStatusId: 4,
        bookingStatusName: 'Completed'
      };

      this.bookingService.updateBooking(updatedBooking).subscribe({
        next: () => {
          alert(`Booking #${booking.bookingID} marked as Completed.`);
          this.loadBookings();
        },
        error: () => alert('Failed to mark booking as completed.')
      });
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking, Notes } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-assigned-bookings',
  standalone: false,
  templateUrl: './assigned-bookings.component.html',
  styleUrl: './assigned-bookings.component.css'
})
export class AssignedBookingsComponent {
   bookings: Booking[] = [];
   notes: Notes[] = [];
  statusIdFilter: string = '';
  bookingId: number = 0;
  constructor(
    private bookingservice: BookingService,
    private noteservice: NoteService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }
  loadBookings(): void {
    const params: any = {};
    params.statusId = 2;

    this.bookingservice.getBookingsWithFilters(params).subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => console.error('Failed to load bookings.', err)
    });
  }

  checknote(booking: Booking): void {
  this.noteservice.getNoteByBookingId(booking.bookingID).subscribe({
    next: (note) => {
      if (note) {
        this.router.navigate(['/admin-dashboard/admin-note-edit', note.notesId]);
      } else {
        this.router.navigate(['/admin-dashboard/admin-note-add', booking.bookingID]);
      }
    },
    error: (error) => {
      console.warn('Note not found for booking:', booking.bookingID);
      this.router.navigate(['/admin-dashboard/admin-note-add', booking.bookingID]);
    }
  });
}
edit(bookingId: number): void {
      this.router.navigate(['/admin-dashboard/assigned-booking-edit', bookingId]);
}

  completeBooking(booking: Booking): void {
    const confirmed = window.confirm(`Mark booking #${booking.bookingID} as Completed?`);
    if (confirmed) {
      const updatedBooking: Booking = {
        ...booking,
        bookingStatusId: 4,
        bookingStatusName: 'Completed'
      };

      this.bookingservice.updateBooking(updatedBooking).subscribe({
        next: () => {
          alert(`Booking #${booking.bookingID} marked as Completed.`);
          this.loadBookings();
        },
        error: () => alert('Failed to mark booking as completed.')
      });
    }
  }
}

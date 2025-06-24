import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-pending-bookings',
  standalone: false,
  templateUrl: './pending-bookings.component.html',
  styleUrl: './pending-bookings.component.css'
})
export class PendingBookingsComponent {
   bookings: Booking[] = [];
  statusIdFilter: string = '';
  constructor(
    private bookingservice: BookingService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }
  loadBookings(): void {
    const params: any = {};
    params.statusId = 1;

    this.bookingservice.getBookingsWithFilters(params).subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => console.error('Failed to load bookings.', err)
    });
  }

  viewBookingDetails(booking: Booking): void {
    this.router.navigate(['/admin-dashboard/pending-booking-detail', booking.bookingID]);
  }
   cancelBooking(booking: Booking): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const updatedBooking: Booking = {
        ...booking,
        bookingStatusId: 5
      };
      this.bookingservice.updateBooking(updatedBooking).subscribe({
        next: () => this.loadBookings(),
        error: () => alert('Failed to cancel booking.')
      });
    }
  }
}

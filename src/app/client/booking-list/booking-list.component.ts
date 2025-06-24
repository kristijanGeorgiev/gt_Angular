import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  standalone: false,
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  userID: number = Number(localStorage.getItem('userId'));
  fromDate: string = '';
  toDate: string = '';
  error: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    this.toDate = today.toISOString().substring(0, 10);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 3);
    this.fromDate = oneMonthAgo.toISOString().substring(0, 10);
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookingByUserId(this.userID, this.fromDate, this.toDate)
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

  applyDateFilter(): void {
    this.loadBookings();
  }

  clearFilter(): void {
    const today = new Date();
    this.toDate = today.toISOString().substring(0, 10);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 3);
    this.fromDate = oneMonthAgo.toISOString().substring(0, 10);
    this.loadBookings();
  }

  sortByBookingDate(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.bookings = this.sortBookings(this.bookings);
  }

  sortBookings(data: Booking[]): Booking[] {
    return data.sort((a, b) => {
      const dateA = new Date(a.bookingDate).getTime();
      const dateB = new Date(b.bookingDate).getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  editBooking(bookingId: number, bookingStatusId: number): void {
    if(bookingStatusId == 1) {
       this.router.navigate(['/client-dashboard/booking-edit', bookingId]);
    }
   else {
    alert('Booking is already approved, edit is not allowed')
   }
  }

  cancelBooking(booking: Booking): void {
    if(booking.bookingStatusId == 1) {
      if (confirm('Are you sure you want to cancel this booking?')) {
      const updatedBooking: Booking = {
        ...booking,
        bookingStatusId: 5
      };
      this.bookingService.updateBooking(updatedBooking).subscribe({
        next: () => this.loadBookings(),
        error: () => alert('Failed to cancel booking.')
      });
    }
    }
    else {
    alert('Booking is already approved, cancel is not allowed')
   }
  }
}

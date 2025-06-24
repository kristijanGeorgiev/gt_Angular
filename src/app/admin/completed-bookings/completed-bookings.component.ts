import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-completed-bookings',
  standalone: false,
  templateUrl: './completed-bookings.component.html',
  styleUrl: './completed-bookings.component.css'
})
export class CompletedBookingsComponent {
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
    params.statusId = 4;

    this.bookingservice.getBookingsWithFilters(params).subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => console.error('Failed to load bookings.', err)
    });
  }

  createInvoice(booking: Booking): void {
    this.router.navigate(['/admin-dashboard/create-invoice', booking.bookingID]);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { BookingStatus } from '../../models/homeservices';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-booking-detail',
  standalone: false,
  templateUrl: './admin-booking-detail.component.html',
  styleUrl: './admin-booking-detail.component.css'
})
export class AdminBookingDetailComponent {
    booking: Booking | undefined;
    bookingStatuses: BookingStatus[] = [];
  userId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingservice: BookingService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bookingservice.getBookingById(id).subscribe((booking) => {
        this.booking = booking;
        this.booking.bookingDate = this.booking.bookingDate.substring(0,10);
        this.booking.serviceDate = this.booking.serviceDate.substring(0,10);
        this.loadStatuses();
      });
    }
  }

  loadStatuses(): void {
    this.http.get<BookingStatus[]>('/api/BookingStatus').subscribe({
      next: (data) => (this.bookingStatuses = data),
      error: (err) => console.error('Failed to load booking statuses.', err)
    });
  }  
  back(): void {
    {
        this.router.navigate(['/admin-dashboard/admin-bookings']);
    };
    }
}

import { Component, OnInit } from '@angular/core';
import { Booking, BookingStatus } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookingStatusService } from '../../services/booking-status.service';
@Component({
  selector: 'app-admin-bookings',
  standalone: false,
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.css'
})
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  bookingStatuses: BookingStatus[] = [];

  isPaidFilter: string = '';
  statusIdFilter: string = '';
  fromDateFilter: string = '';
  toDateFilter: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private bookingservice: BookingService,
    private bookingstatusservice: BookingStatusService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    this.fromDateFilter = firstDayOfMonth.toISOString().substring(0, 10);
    this.toDateFilter = now.toISOString().substring(0, 10);
    this.loadStatuses();
    this.loadBookings();
  }

  loadStatuses(): void {
  this.bookingstatusservice.getBookingStatuses().subscribe({
    next: (data) => this.bookingStatuses = data,
    error: (err) => console.error('Failed to load booking statuses.', err)
  });
}

  loadBookings(): void {
    const params: any = {};
    if (this.isPaidFilter !== '') params.isPaid = this.isPaidFilter === 'true';
    if (this.statusIdFilter) params.statusId = this.statusIdFilter;
    if (this.fromDateFilter) params.fromDate = this.fromDateFilter;
    if (this.toDateFilter) params.toDate = this.toDateFilter;

    this.bookingservice.getBookingsWithFilters(params).subscribe({
      next: (data) => {
        this.bookings = data;
        this.filteredBookings = data;
      },
      error: (err) => console.error('Failed to load bookings.', err)
    });
  }

  applyFilters(): void {
    this.loadBookings();
  }

  clearFilters(): void {
    this.isPaidFilter = '';
    this.statusIdFilter = '';
    this.fromDateFilter = '';
    this.toDateFilter = '';
    this.loadBookings();
  }

  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredBookings.sort((a, b) =>
      this.sortDirection === 'asc' ? a.bookingID - b.bookingID : b.bookingID - a.bookingID
    );
  }

  sortByAddress(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredBookings.sort((a, b) =>
      this.sortDirection === 'asc'
        ? a.address.localeCompare(b.address)
        : b.address.localeCompare(a.address)
    );
  }

  viewBookingDetails(booking: Booking): void {
    this.router.navigate(['/admin-dashboard/admin-booking-detail', booking.bookingID]);
  }

  assignEmployee(bookingId: number): void {
    this.router.navigate(['/admin-dashboard/assign-employee', bookingId]);
  }

  removeEmployee(bookingId: number): void {
    this.router.navigate(['/admin-dashboard/remove-employee', bookingId]);
  }
}

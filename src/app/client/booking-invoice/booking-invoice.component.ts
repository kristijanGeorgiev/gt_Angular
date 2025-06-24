import { Component, OnInit } from '@angular/core';
import { Booking, Invoice } from '../../models/homeservices';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-booking-invoice',
  standalone: false,
  templateUrl: './booking-invoice.component.html',
  styleUrl: './booking-invoice.component.css'
})
export class BookingInvoiceComponent implements OnInit{
  bookings: Booking[] = [];
  invoices: Invoice[] = [];
  userID: number = Number(localStorage.getItem('userId'));
  fromDate: string = '';
  toDate: string = '';
  error: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private bookingService: BookingService, private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
     const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
    this.fromDate = firstDayOfYear.toISOString().substring(0, 10);
    this.toDate = now.toISOString().substring(0, 10);
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookingByUserId(this.userID, this.fromDate, this.toDate).subscribe({
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
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
    this.fromDate = firstDayOfYear.toISOString().substring(0, 10);
    this.toDate = now.toISOString().substring(0, 10);
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

invoice(booking: Booking): void {
  this.invoiceService.getInvoiceByBookingId(booking.bookingID).subscribe({
    next: (invoice) => {
      if (invoice) {
        this.router.navigate(['/client-dashboard/invoice-detail', booking.bookingID]);
      } else {
        alert('No invoice available for this booking.');
      }
    },
    error: () => {
      alert('No invoice available for this booking.');
    }
  });
}
}

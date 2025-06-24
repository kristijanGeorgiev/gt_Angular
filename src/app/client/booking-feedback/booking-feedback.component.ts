import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { Feedback } from '../../models/homeservices';
import { FeedbackService } from '../../services/feedback.service';
@Component({
  selector: 'app-booking-feedback',
  standalone: false,
  templateUrl: './booking-feedback.component.html',
  styleUrl: './booking-feedback.component.css'
})
export class BookingFeedbackComponent implements OnInit {
  bookings: Booking[] = [];
  feedbacks: Feedback[] = [];
  userID: number = Number(localStorage.getItem('userId'));
  fromDate: string = '';
  toDate: string = '';
  statusId: string = '6';
  error: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private bookingService: BookingService, private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    this.toDate = today.toISOString().substring(0, 10);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 3);
    this.fromDate = oneMonthAgo.toISOString().substring(0, 10);
    this.loadBookings();
    this.loadFeedbacks();
  }

  loadBookings(): void {
    this.bookingService.getBookingByUserId(this.userID, this.fromDate, this.toDate, this.statusId).subscribe({
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
  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
      },
      error: (err) => {
        console.error('Failed to load feedbacks:', err);
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

feedback(booking: Booking): void {
  this.feedbackService.getFeedbackByBookingId(booking.bookingID).subscribe({
    next: (feedback) => {
      if (feedback) {
        this.router.navigate(['/client-dashboard/feedback-edit', feedback.feedbackID]);
      } else {
        this.router.navigate(['/client-dashboard/feedback-add', booking.bookingID]);
      }
    },
    error: (error) => {
      console.warn('Feedback not found for booking:', booking.bookingID);
      this.router.navigate(['/client-dashboard/feedback-add', booking.bookingID]);
    }
  });
}
}
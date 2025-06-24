import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, Feedback } from '../../models/homeservices';
import { FeedbackService } from '../../services/feedback.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-feedback-add',
  standalone: false,
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.css']
})
export class FeedbackAddComponent implements OnInit {
  booking: Booking | undefined;
  newFeedback: Feedback = {
    feedbackID: 0,
    bookingID: 0,
    serviceID: 0,
    rating: 0,
    comment: '',
    serviceName: '',
    serviceDate: '',
    contactName: '',
    address: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const bookingIdParam = this.route.snapshot.paramMap.get('bookingId');
    const bookingId = bookingIdParam ? Number(bookingIdParam) : 0;

       this.bookingService.getBookingById(bookingId).subscribe((booking) => {
        this.booking = booking;
            if (bookingId > 0) {
      this.newFeedback.bookingID = bookingId;
      this.newFeedback.serviceID = booking.serviceID;
      this.newFeedback.serviceName = booking.serviceName;
      this.newFeedback.serviceDate = booking.serviceDate;
      this.newFeedback.contactName = booking.contactName;
      this.newFeedback.address = booking.address;
    } else {
      this.router.navigate(['/client-dashboard/bookings']);
    }

      });
  }

  submitFeedback(): void {
    this.feedbackService.addFeedback(this.newFeedback).subscribe({
      next: () => this.router.navigate(['/client-dashboard/booking-feedback']),
      error: () => alert('Failed to submit feedback.')
    });
  }

  cancel(): void {
    this.router.navigate(['/client-dashboard/booking-feedback']);
  }
}
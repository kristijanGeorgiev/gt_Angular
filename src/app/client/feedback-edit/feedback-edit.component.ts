import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from '../../models/homeservices';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback-edit',
  standalone: false,
  templateUrl: './feedback-edit.component.html',
  styleUrls: ['./feedback-edit.component.css']
})
export class FeedbackEditComponent implements OnInit {
  feedback: Feedback = {
    feedbackID: 0,
    bookingID: 0,
    serviceID: 0,
    rating: 1,
    comment: '',
    serviceName: '',
    serviceDate: '',
    contactName: '',
    address: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.feedbackService.getFeedbackById(id).subscribe({
        next: (data) => {
          this.feedback = { ...data };
        },
        error: () => {
          alert('Feedback not found for this booking.');
          this.router.navigate(['/client-dashboard/booking-feedback']);
        }
      });
    }
  }

  updateFeedback(): void {
    this.feedbackService.updateFeedback(this.feedback).subscribe({
      next: () => this.router.navigate(['/client-dashboard/booking-feedback']),
      error: () => alert('Failed to update feedback.')
    });
  }

  cancel(): void {
    this.router.navigate(['/client-dashboard/booking-feedback']);
  }
}
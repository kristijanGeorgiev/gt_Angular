import { Component } from '@angular/core';
import { Feedback } from '../../models/homeservices';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-admin-feedbacks-detail',
  standalone: false,
  templateUrl: './admin-feedbacks-detail.component.html',
  styleUrl: './admin-feedbacks-detail.component.css'
})
export class AdminFeedbacksDetailComponent {
   feedback: Feedback | undefined;
  userId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedbackservice: FeedbackService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.feedbackservice.getFeedbackByBookingId(id).subscribe((feedback) => {
        this.feedback = feedback;
        this.feedback.serviceDate = this.feedback.serviceDate.substring(0,10);
      });
    }
  }

  back(): void {
    {
        this.router.navigate(['/admin-dashboard/admin-feedbacks']);
    };
    }
}

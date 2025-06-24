import { Component } from '@angular/core';
import { Feedback, Service } from '../../models/homeservices';
import { FeedbackService } from '../../services/feedback.service';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-feedbacks',
  standalone: false,
  templateUrl: './admin-feedbacks.component.html',
  styleUrl: './admin-feedbacks.component.css'
})
export class AdminFeedbacksComponent {
  feedbacks: Feedback[] = [];
  services: Service[] = [];

  serviceIdFilter: string = '';
  fromDateFilter: string = '';
  toDateFilter: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private feedbackservice: FeedbackService,
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
    this.fromDateFilter = firstDayOfYear.toISOString().substring(0, 10);
    this.toDateFilter = now.toISOString().substring(0, 10);
    this.loadServices();
    this.loadFeedbacks();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (data) => (this.services = data),
      error: (err) => console.error('Failed to load services.', err)
    });
  }

  loadFeedbacks(): void {
    const params: any = {};

    if (this.serviceIdFilter) params.serviceId = this.serviceIdFilter;
    if (this.fromDateFilter) params.fromDate = this.fromDateFilter;
    if (this.toDateFilter) params.toDate = this.toDateFilter;

    this.feedbackservice.getFeedbacksWithFilters(params).subscribe({
      next: (data) => (this.feedbacks = data),
      error: (err) => console.error('Failed to load feedbacks.', err)
    });
  }

  applyFilters(): void {
    this.loadFeedbacks();
  }

  clearFilters(): void {
    this.serviceIdFilter = '';
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
    this.fromDateFilter = firstDayOfYear.toISOString().substring(0, 10);
    this.toDateFilter = now.toISOString().substring(0, 10);
    this.loadFeedbacks();
  }

  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.feedbacks.sort((a, b) =>
      this.sortDirection === 'asc' ? a.bookingID - b.bookingID : b.bookingID - a.bookingID
    );
  }

  sortByComment(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.feedbacks.sort((a, b) =>
      this.sortDirection === 'asc'
        ? a.comment.localeCompare(b.comment)
        : b.comment.localeCompare(a.comment)
    );
  }

  viewFeedbackDetails(feedback: Feedback): void {
    this.router.navigate(['/admin-dashboard/admin-feedbacks-detail', feedback.bookingID]);
  }
}
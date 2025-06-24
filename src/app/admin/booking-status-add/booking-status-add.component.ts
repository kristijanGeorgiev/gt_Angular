import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingStatusService } from '../../services/booking-status.service';

@Component({
  selector: 'app-booking-status-add',
  standalone: false,
  templateUrl: './booking-status-add.component.html',
  styleUrl: './booking-status-add.component.css'
})
export class BookingStatusAddComponent {
   status = {
    id: 0,
    statusName: ''
  };

  error = '';

  constructor(private router: Router, private bookingstatusservice: BookingStatusService) {}

  addStatus(): void {
    if (this.status) {
      this.bookingstatusservice.addBookingStatus(this.status).subscribe(() => {
        this.router.navigate(['/admin-dashboard/bookingStatus']);
      });
    }
  }
}

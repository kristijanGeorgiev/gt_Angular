import { Component } from '@angular/core';
import { BookingStatus } from '../../models/homeservices';
import { BookingStatusService } from '../../services/booking-status.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-status-edit',
  standalone: false,
  templateUrl: './booking-status-edit.component.html',
  styleUrl: './booking-status-edit.component.css'
})
export class BookingStatusEditComponent {
   status: BookingStatus| undefined;
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingstatuservice: BookingStatusService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    if (id) {
      this.bookingstatuservice.getBookingStatusById(id).subscribe((status) => {
        this.status = status;
      });
    }
  }

  saveChanges(): void {
    if (this.status) {
      this.bookingstatuservice.updateBookingStatus(this.id, this.status).subscribe(() => {
        this.router.navigate(['/admin-dashboard/bookingStatus']);
      });
    }
  }
  back(): void {
    {
        this.router.navigate(['/admin-dashboard/bookingStatus']);
    };
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, Service } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-booking-edit',
  standalone: false,
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit {
  booking: Booking | undefined;
  selectedService: Service | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bookingService.getBookingById(id).subscribe((booking) => {
        this.booking = booking;
        this.booking.bookingDate = this.booking.bookingDate.substring(0,10);
        this.booking.serviceDate = this.booking.serviceDate.substring(0,10);

        if (booking?.serviceID) {
          this.serviceService.getServiceById(booking.serviceID).subscribe(service => {
            this.selectedService = service;
          });
        }
      });
    }
  }

  saveChanges(): void {
    if (this.booking) {
      this.bookingService.updateBooking(this.booking).subscribe(() => {
        this.router.navigate(['/client-dashboard/bookings']);
      });
    }
  }
    back(): void {
    {
        this.router.navigate(['/client-dashboard/bookings']);
    };
    }
}
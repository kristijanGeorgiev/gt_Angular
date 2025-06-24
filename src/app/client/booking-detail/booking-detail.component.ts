import { Component } from '@angular/core';
import { Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-detail',
  standalone: false,
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent {
   booking: Booking| undefined
  constructor(private route: ActivatedRoute, private bookingService: BookingService) { }
  ngOnInit(): void {
    this.getBookingDetails();
  }
  getBookingDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.bookingService.getBookingById(+id).subscribe((booking: Booking| undefined) => {
        this.booking= booking;
      });
    }
  }
}

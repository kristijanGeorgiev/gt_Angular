import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, Service } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-booking-add',
  standalone: false,
  templateUrl: './booking-add.component.html',
  styleUrls: ['./booking-add.component.css']
})
export class BookingAddComponent implements OnInit {
  newBooking: Booking = {
    bookingID: 0,
    userID: 0,
    serviceID: 0,
    bookingDate: '',
    bookingStatusId: 1,
    serviceDate: '',
    contactName: '',
    address: '',
    description: '',
    price: 0,
    InvoiceID: 0,
    isPaid: false,
    paymentMethod: '',
    assignedEmployeeIds: [],
    serviceName: '',
    bookingStatusName: '',
    assignedEmployees: []
  };

  selectedService: Service | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
  const serviceId = Number(this.route.snapshot.paramMap.get('serviceId'));
  const userId = Number(localStorage.getItem('userId'));

  if (serviceId) {
    this.newBooking.serviceID = serviceId;
    this.serviceService.getServiceById(serviceId).subscribe(service => {
      this.selectedService = service;
    });
  }

  if (userId) {
    this.newBooking.userID = userId;
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    const address = localStorage.getItem('address') || '';
    this.newBooking.contactName = `${firstName} ${lastName}`.trim();
    this.newBooking.address = `${address}`.trim();
  }

  this.newBooking.bookingDate = new Date().toISOString().split('T')[0];
}

  addBooking(): void {
    this.bookingService.addBooking(this.newBooking).subscribe(() => {
      this.router.navigate(['/client-dashboard/dashboard']);
    });
  }

  goToBookingList(): void {
    this.router.navigate(['/client-dashboard/dashboard']);
  }
}
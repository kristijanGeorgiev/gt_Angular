import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/homeservices';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-create-invoice',
  standalone: false,
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent implements OnInit {
  booking: Booking | undefined;
  serviceName: string = '';
  description: string = '';
  clientName: string = '';
  clientAddress: string = '';
  clientPhoneNumber: string = '';
  invoice = {
    invoiceID: 0,
    bookingID: 0,
    amount: 0,
    tax: 0,
    issuedDate: '',
    dueDate: '',
    quantity: 0,
    isPaid: false,
    contactName: '',
    address: '',
    serviceName: ''
  };

  error = '';

  constructor(
    private bookingService: BookingService,
    private userService: UserService, 
    private router: Router,
    private route: ActivatedRoute,
    private invoiceservice: InvoiceService
  ) {}

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.paramMap.get('id'));
    if (!bookingId) {
      this.router.navigate(['/admin-dashboard/completed-bookings']);
      return;
    }

    this.bookingService.getBookingById(bookingId).subscribe({
      next: (data) => {
        this.booking = data;

        this.serviceName = data.serviceName ?? 'Unknown';
        this.description = data.description ?? 'No Description';
        this.invoice.issuedDate = this.booking.serviceDate;

      this.userService.getClientById(data.userID).subscribe({
      next: (user) => {
        this.clientName = `${user.firstName} ${user.lastName}`;
        this.clientAddress = user.address ?? '';
        this.clientPhoneNumber = user.phoneNumber ?? '';

        this.invoice.contactName = this.clientName;
        this.invoice.address = this.clientAddress;
      },
      error: () => {
        this.clientName = 'Unknown';
        this.clientAddress = '';
        this.clientPhoneNumber = '';
      }
    });
        this.invoice.bookingID = data.bookingID;
        this.invoice.amount = data.price;
        this.invoice.issuedDate = this.booking.serviceDate.substring(0,10);
        this.invoice.dueDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().substring(0, 10);
        this.invoice.quantity = 1;
        this.invoice.tax = 18;
      },
      error: () => {
        alert('Booking not found');
        this.router.navigate(['/admin-dashboard/completed-bookings']);
      }
    });
  }

  save(): void {
    this.invoiceservice.addInvoice(this.invoice).subscribe({
      next: () => {
        this.bookingService.getBookingById(this.invoice.bookingID).subscribe({
        next: (data) => {
            this.booking = data;
            this.booking.bookingStatusId = 6;
            this.bookingService.updateBooking(this.booking).subscribe({
              next: () => {
                this.router.navigate(['/admin-dashboard/completed-bookings']);
              }
            }) 
        }  
      })
      },
      error: (err) => {
        this.error = 'Failed to save invoice.';
        console.error(err);
      }
    });
  }
  back(): void {
    this.router.navigate(['/admin-dashboard/completed-bookings']);
  }
}
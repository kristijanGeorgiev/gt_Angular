import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, BookingStatus, Employee, WorkPosition } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pending-booking-detail',
  standalone: false,
  templateUrl: './pending-booking-detail.component.html',
  styleUrl: './pending-booking-detail.component.css'
})
export class PendingBookingDetailComponent implements OnInit {
  booking: Booking | undefined;
  bookingStatuses: BookingStatus[] = [];
  workpositions: WorkPosition[] = [];
  employees: Employee[] = [];
  clientName: string = '';
  clientAddress: string = '';
  clientPhoneNumber: string = '';
  workpositionFilter: number = 1;
  selectedEmployeeId: number | null = null;
  userId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private userservice: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getBookingDetails();
    this.loadStatuses();
    this.loadWorkPositions();
    this.loadAvailableEmployees();
  }

  getBookingDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.bookingService.getBookingById(id).subscribe({
      next: (data: Booking) => {
        if (data.bookingDate) data.bookingDate = data.bookingDate.substring(0, 10);
        if (data.serviceDate) data.serviceDate = data.serviceDate.substring(0,10);
        this.booking = data;
        this.userId = data.userID;
        this.GetUser(this.userId);
      },
      error: err => console.error('Error loading booking:', err)
    });
  }
  GetUser(userId: number): void {
    this.userservice.getClientById(userId).subscribe({
      next: (user) => {
        this.clientName = `${user.firstName} ${user.lastName}`;
        this.clientAddress = user.address ?? '';
        this.clientPhoneNumber = user.phoneNumber ?? '';
      },
      error: () => {
        this.clientName = 'Unknown';
        this.clientAddress = '';
        this.clientPhoneNumber = '';
      }
    });
  }
  loadStatuses(): void {
  this.http.get<BookingStatus[]>('https://localhost:7025/api/BookingStatus').subscribe({
    next: (data) => this.bookingStatuses = data,
    error: (err) => console.error('Failed to load statuses', err)
  });
}

loadWorkPositions(): void {
  this.http.get<WorkPosition[]>('https://localhost:7025/api/WorkPosition').subscribe({
    next: (data) => this.workpositions = data,
    error: (err) => console.error('Failed to load positions', err)
  });
}
loadAvailableEmployees(): void {
  const params: any = {};

  if (this.workpositionFilter) {
    params.workPositionId = this.workpositionFilter;
  }
  params.isAvailable = true;

  this.userservice.getAvailableEmployees(params).subscribe({
    next: (data) => this.employees = data,
    error: (err) => console.error('Failed to load available employees', err)
  });
}
  saveChanges(): void {
    if (!this.booking) return;
 this.booking.bookingStatusId = 2;
    this.bookingService.updateBooking(this.booking).subscribe({
      next: () => this.router.navigate(['/admin-dashboard/pending-bookings']),
      error: err => console.error('Update failed:', err)
    });
  }

saveEmployees(): void {
    if (!this.booking) return;
    this.bookingService.updateBooking(this.booking).subscribe({
      next: () => this.getBookingDetails(),
      error: err => console.error('Update failed:', err)
    });
  }


  back(): void {
    this.router.navigate(['/admin-dashboard/pending-bookings']);
  }

  assignEmployee(): void {
  if (!this.booking || !this.selectedEmployeeId) return;

  if (!this.booking.assignedEmployeeIds) {
    this.booking.assignedEmployeeIds = [];
  }

  const alreadyAssigned = this.booking.assignedEmployeeIds.includes(this.selectedEmployeeId);

  if (!alreadyAssigned) {
    this.booking.assignedEmployeeIds.push(this.selectedEmployeeId);
    const employee = this.employees.find(e => e.userId === this.selectedEmployeeId);
    if (employee) {
      if (!this.booking.assignedEmployees) {
        this.booking.assignedEmployees = [];
      }
      this.booking.assignedEmployees.push({
        ...employee
      });
    }
  }
  this.saveEmployees()
}
removeAssignedEmployee(employeeId: number): void {
  if (!this.booking) return;

  this.booking.assignedEmployeeIds = this.booking.assignedEmployeeIds?.filter(id => id !== employeeId) || [];

  this.booking.assignedEmployees = this.booking.assignedEmployees?.filter(emp => emp.userId !== employeeId) || [];
  this.saveEmployees()
}
cancelBooking(booking: Booking): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const updatedBooking: Booking = {
        ...booking,
        bookingStatusId: 5
      }
      this.saveChanges()
    }
    else {
      this.router.navigate(['/admin-dashboard/pending-bookings']);
    }
  }
}

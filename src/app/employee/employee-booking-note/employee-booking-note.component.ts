import { Component, OnInit } from '@angular/core';
import { Booking, Notes } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-employee-booking-note',
  standalone: false,
  templateUrl: './employee-booking-note.component.html',
  styleUrl: './employee-booking-note.component.css'
})
export class EmployeeBookingNoteComponent implements OnInit{
  bookings: Booking[] = [];
  note: Notes | undefined;
  userID: number = Number(localStorage.getItem('userId'));
  selectedStatus: string = '';
  error: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private bookingService: BookingService, private noteService: NoteService, private router: Router, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookingsByAssignedEmployee(this.userID, this.selectedStatus)
      .subscribe({
        next: (data) => {
          this.bookings = this.sortBookings(data);
          this.error = '';
        },
        error: (err) => {
          this.error = 'Failed to load bookings.';
          console.error(err);
        }
      });
  }

  filterByBookingStatus(): void {
    this.loadBookings();
  }

  clearFilter(): void {
    this.selectedStatus = '';
    this.loadBookings();
  }

  sortByBookingDate(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.bookings = this.sortBookings(this.bookings);
  }

  sortBookings(data: Booking[]): Booking[] {
    return data.sort((a, b) => {
      const dateA = new Date(a.bookingDate).getTime();
      const dateB = new Date(b.bookingDate).getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  checknote(booking: Booking): void {
  this.noteService.getNoteByBookingId(booking.bookingID).subscribe({
    next: (note) => {
      if (note) {
        this.router.navigate(['/employee-dashboard/note-edit', note.notesId]);
      } else {
        this.router.navigate(['/employee-dashboard/note-add', booking.bookingID]);
      }
    },
    error: (error) => {
      console.warn('Note not found for booking:', booking.bookingID);
      this.router.navigate(['/employee-dashboard/note-add', booking.bookingID]);
    }
  });
}
saveChanges(): void {
  if (this.note) {
    this.noteService.updateNote(this.note).subscribe(() => {
      this.location.back();
    });
  }
}
  back(): void {
    this.location.back();
  }
}


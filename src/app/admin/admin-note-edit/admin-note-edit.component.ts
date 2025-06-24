import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes, Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-admin-note-edit',
  standalone: false,
  templateUrl: './admin-note-edit.component.html',
  styleUrl: './admin-note-edit.component.css'
})
export class AdminNoteEditComponent {
  note: Notes | undefined;
  booking: Booking | undefined;
  assignedEmployees: { employeeId: number; firstName: string; lastName: string }[] = [];
  selectedEmployeeId: number = 0;
  employeeNotes: { [userId: number]: Notes } = {};

  servicedate: string = '';
  serviceName: string = '';
  clientAddress: string = '';
  clientName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private bookingservice: BookingService
  ) {}

  ngOnInit(): void {
    this.getNoteDetails();
  }

  getNoteDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.noteService.getNoteById(+id).subscribe((note) => {
        this.note = note;
        this.selectedEmployeeId = note.userId;
        this.getBooking(this.note.bookingId);
      });
    }
  }

  getBooking(bookingID: number): void {
  this.bookingservice.getBookingById(bookingID).subscribe((data) => {
    this.booking = data;
    this.serviceName = this.booking.serviceName;
    this.servicedate = this.booking.serviceDate.substring(0, 10);
    this.clientAddress = this.booking.address;
    this.clientName = this.booking.contactName;
    this.assignedEmployees = this.booking.assignedEmployees.map(e => ({
      employeeId: e.employeeId,
      firstName: e.firstName,
      lastName: e.lastName
    }));

    this.assignedEmployees.forEach((emp, index) => {
      this.noteService.getNoteByBookingId(this.booking!.bookingID, emp.employeeId).subscribe({
        next: (note) => {
          this.employeeNotes[emp.employeeId] = note;
          if (index === 0) {
            this.selectedEmployeeId = emp.employeeId;
          }
        },
        error: () => {
          this.employeeNotes[emp.employeeId] = {
            notesId: 0,
            bookingId: this.booking!.bookingID,
            userId: emp.employeeId,
            checkIn: '',
            checkOut: '',
            noteText: ''
          };
          if (index === 0) {
            this.selectedEmployeeId = emp.employeeId;
          }
        }
      });
    });
  });
}

onEmployeeChange(): void {
  console.log('Selected employee:', this.selectedEmployeeId);

  this.noteService.getNoteByBookingId(this.booking!.bookingID, this.selectedEmployeeId).subscribe({
    next: (note) => {
      this.employeeNotes[this.selectedEmployeeId] = note;
    },
    error: () => {
      this.employeeNotes[this.selectedEmployeeId] = {
        notesId: 0,
        bookingId: this.booking!.bookingID,
        userId: this.selectedEmployeeId,
        checkIn: '',
        checkOut: '',
        noteText: ''
      };
    }
  });
}

  saveChanges(): void {
    const noteToSave = this.employeeNotes[this.selectedEmployeeId];
    if (noteToSave) {

      const saveObservable = noteToSave.notesId === 0
        ? this.noteService.addNote(noteToSave)
        : this.noteService.updateNote(noteToSave);

      saveObservable.subscribe(() => {
        this.router.navigate(['/admin-dashboard/assigned-bookings']);
      }, err => {
        console.error('Failed to save note:', err);
        alert('Failed to save note.');
      });
    }
  }

  back(): void {
    this.router.navigate(['/admin-dashboard/assigned-bookings']);
  }
}
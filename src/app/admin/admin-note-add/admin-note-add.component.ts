import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes, Booking } from '../../models/homeservices';
import { BookingService } from '../../services/booking.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-admin-note-add',
  standalone: false,
  templateUrl: './admin-note-add.component.html',
  styleUrl: './admin-note-add.component.css'
})
export class AdminNoteAddComponent implements OnInit{
  newNote: Notes = {notesId: 0, bookingId: 0, userId: 0, checkIn: '',checkOut: '', noteText: ''}
  note: Notes | undefined;
  assignedEmployees: { employeeId: number; firstName: string; lastName: string }[] = [];
  booking: Booking | undefined;
  servicedate: string = '';
  serviceName: string = '';
  clientAddress: string = "";
  clientName: string = "";
  constructor(private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private bookingservice: BookingService
  ) {}
  ngOnInit(): void {
    this.getBooking();
  }
  getBooking(): void {
    const id = this.route.snapshot.paramMap.get('bookingId');
    if (id) {
      this.bookingservice.getBookingById(+id).subscribe((data) => {
      this.booking = data;
      this.serviceName = this.booking.serviceName;
      this.servicedate = this.booking.serviceDate.substring(0,10);
      this.clientAddress = this.booking.address;
      this.clientName = this.booking.contactName;
      this.newNote.bookingId = this.booking.bookingID;
      this.newNote.userId = Number(localStorage.getItem('userId'));
      this.assignedEmployees = this.booking.assignedEmployees;
      });
    }
  }

 addNotes(): void {
  const noteRequests = this.assignedEmployees.map((emp) => {
    const noteToAdd: Notes = {
      notesId: 0,
      bookingId: this.newNote.bookingId,
      userId: emp.employeeId, // one note per assigned employee
      checkIn: this.newNote.checkIn,
      checkOut: this.newNote.checkOut,
      noteText: this.newNote.noteText
    };

    return this.noteService.addNote(noteToAdd);
  });

  Promise.all(noteRequests.map(req => req.toPromise()))
    .then(() => {

      this.router.navigate(['/admin-dashboard/assigned-bookings']);
    })
    .catch((err) => {
      console.error('Failed to save notes for all employees', err);
      alert('An error occurred while saving notes.');
    });
}

  back(): void {
    this.router.navigate(['/admin-dashboard/assigned-bookings']);
  }
 goToNoteList(): void {
   this.router.navigate(['/admin-dashboard/assigned-bookings']);
 }
}

import { Component, OnInit } from '@angular/core';
import { Booking, Notes } from '../../models/homeservices';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-note-add',
  standalone: false,
  templateUrl: './note-add.component.html',
  styleUrl: './note-add.component.css'
})
export class NoteAddComponent implements OnInit{
   newNote: Notes = {notesId: 0, bookingId: 0, userId: 0, checkIn: '',checkOut: '', noteText: ''}
  note: Notes | undefined;
  booking: Booking | undefined;
  servicedate: string = '';
  serviceName: string = '';
  clientAddress: string = "";
  clientName: string = "";
  constructor(private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private bookingservice: BookingService,
    private location: Location,
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
      });
    }
  }

 addNotes(): void {
   this.noteService.addNote(this.newNote).subscribe(() => {
     this.location.back();
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
 goToNoteList(): void {
   this.router.navigate(['/employee-dashboard/employee-booking-note']);
 }
}

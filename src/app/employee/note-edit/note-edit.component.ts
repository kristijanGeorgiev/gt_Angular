import { Component } from '@angular/core';
import { Notes } from '../../models/homeservices';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/homeservices';
import { Location } from '@angular/common';
@Component({
  selector: 'app-note-edit',
  standalone: false,
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.css'
})
export class NoteEditComponent {
   note: Notes | undefined;
   booking: Booking | undefined;
   servicedate: string = '';
   serviceName: string = '';
   clientAddress: string = "";
   clientName: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private bookingservice: BookingService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getNoteDetails();
  }
  getNoteDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.noteService.getNoteById(+id).subscribe((note) => {
        this.note= note;
        this.getBooking(this.note.bookingId);
      });
    }
  }
  getBooking(bookingID: number) {
    this.bookingservice.getBookingById(bookingID).subscribe((data) => {
      this.booking = data;
      this.serviceName = this.booking.serviceName;
      this.servicedate = this.booking.serviceDate.substring(0,10);
      this.clientAddress = this.booking.address;
      this.clientName = this.booking.contactName;
    })
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

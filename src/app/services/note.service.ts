import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking, Notes } from '../models/homeservices';
import { Observable} from 'rxjs';
const BASE_URL = 'https://localhost:7025/api';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Notes[] = [];

    constructor(private http: HttpClient) { }

    getNotes(): Observable<Notes[]> {
        return this.http.get<Notes[]>(`${BASE_URL}/notes`);
    }

    updateNote(note: Notes): Observable<Notes> {
        return this.http.put<Notes>(`${BASE_URL}/notes/`, note);
    }

    deleteNote(notesID: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/notes/${notesID}`);
    }

   addNote(newNote: Notes): Observable<Notes> {
           const { notesId , ...NotesWithoutId } = newNote;
           return this.http.post<Notes>(`${BASE_URL}/notes`, NotesWithoutId);
     }
    getNoteById(id: number): Observable<Notes> {
      return this.http.get<Notes>(`${BASE_URL}/notes/${id}`);
    }
   getNoteByBookingId(bookingId: number, userId?: number): Observable<Notes> {
  let url = `${BASE_URL}/notes/booking/${bookingId}`;
  if (userId !== undefined) {
    url += `?userId=${userId}`;
  }
  return this.http.get<Notes>(url);
}

}
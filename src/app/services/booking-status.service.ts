import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { BookingStatus} from '../models/homeservices';
import { HttpClient } from '@angular/common/http';
const BASE_URL = 'https://localhost:7025/api';
@Injectable({
  providedIn: 'root'
})
export class BookingStatusService {
  apiUrl: any;
  bookings: BookingStatus[] = [];
  constructor(private http: HttpClient) { }

 getBookingStatuses(): Observable<BookingStatus[]> {
         return this.http.get<BookingStatus[]>(`${BASE_URL}/bookingStatus`);
     }
 
     updateBookingStatus(id: number, booking: BookingStatus): Observable<BookingStatus> {
         return this.http.put<BookingStatus>(`${BASE_URL}/bookingStatus`, booking);
     }
 
     deleteBookingStatus(bookingId: number): Observable<void> {
         return this.http.delete<void>(`${BASE_URL}/bookingStatus/${bookingId}`);
     }
 
    addBookingStatus(booking: BookingStatus): Observable<BookingStatus> {
            return this.http.post<BookingStatus>(`${BASE_URL}/bookingStatus`, booking);
      }
     getBookingStatusById(id: number): Observable<BookingStatus> {
       return this.http.get<BookingStatus>(`${BASE_URL}/bookingStatus/${id}`);
   }  
}

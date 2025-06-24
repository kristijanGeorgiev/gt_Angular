import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Booking} from '../models/homeservices';
import { Observable} from 'rxjs';
const BASE_URL = 'https://localhost:7025/api';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiUrl: any;
    bookings: Booking[] = [];

    constructor(private http: HttpClient) { }

    getBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${BASE_URL}/booking`);
    }

    updateBooking(Booking: Booking): Observable<Booking> {
        return this.http.put<Booking>(`${BASE_URL}/booking/${Booking.bookingID}`, Booking);
    }

    deleteBooking(BookingID: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/booking/${BookingID}`);
    }

    addBooking(newBooking: Booking): Observable<Booking> {
        const { bookingID, ...BookingWithoutID } = newBooking;
        return this.http.post<Booking>(`${BASE_URL}/booking`, BookingWithoutID);
    }

    getBookingById(BookingID: number): Observable<Booking> {
        return this.http.get<Booking>(`${BASE_URL}/booking/${BookingID}`);
    }
    getBookingByUserId(userId: number, fromDate?: string, toDate?: string, statusId?: string): Observable<Booking[]> {
       let params = new HttpParams();
       if (fromDate) params = params.set('fromDate', fromDate);
       if (toDate) params = params.set('toDate', toDate);
       if (statusId) params = params.set('statusId', statusId);
       return this.http.get<Booking[]>(`${BASE_URL}/booking/user/${userId}`, { params });
    }
      getBookingByStatusId(BookingStatusID: number): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${BASE_URL}/booking/status/${BookingStatusID}`);
    }
      getBookingsByAssignedEmployee(employeeId: number, status?: string): Observable<Booking[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Booking[]>(`${BASE_URL}/booking/employee/${employeeId}`, { params });
  }
  getBookingsWithFilters(params: any): Observable<Booking[]> {
  return this.http.get<Booking[]>('https://localhost:7025/api/booking', { params})

}

}
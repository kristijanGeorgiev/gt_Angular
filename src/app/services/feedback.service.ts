import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback} from '../models/homeservices';
import { Observable} from 'rxjs';
const BASE_URL = 'https://localhost:7025/api';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiUrl: any;
    feedbacks: Feedback[] = [];

    constructor(private http: HttpClient) { }

    getFeedbacks(): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(`${BASE_URL}/feedback`);
    }

    updateFeedback(Feedback: Feedback): Observable<Feedback> {
        return this.http.put<Feedback>(`${BASE_URL}/feedback/${Feedback.feedbackID}`, Feedback);
    }

    deleteFeedback(FeedbackId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/feedback/${FeedbackId}`);
    }

    addFeedback(newFeedback: Feedback): Observable<Feedback> {
        const { feedbackID, ...FeedbackWithoutId } = newFeedback;
        return this.http.post<Feedback>(`${BASE_URL}/feedback`, FeedbackWithoutId);
    }

    getFeedbackById(FeedbackId: number): Observable<Feedback> {
        return this.http.get<Feedback>(`${BASE_URL}/feedback/${FeedbackId}`);
    }
    getFeedbackByBookingId(bookingId: number): Observable<Feedback> {
  return this.http.get<Feedback>(`${BASE_URL}/feedback/booking/${bookingId}`);
}
getFeedbacksWithFilters(params: any): Observable<Feedback[]> {
  return this.http.get<Feedback[]>('https://localhost:7025/api/feedback', { params})

}
}
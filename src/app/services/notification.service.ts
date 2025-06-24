import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/homeservices';
import { Observable} from 'rxjs';
const BASE_URL = 'https://localhost:7025/api';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiUrl: any;
    notifications: Notification[] = [];

    constructor(private http: HttpClient) { }

    getNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${BASE_URL}/notification`);
    }

 getNotificationByUserID(userID: number, fromDate?: string, toDate?: string): Observable<Notification[]> {
  let url = `${BASE_URL}/notification/user/${userID}`;

  const params: string[] = [];
  if (fromDate) params.push(`fromDate=${encodeURIComponent(fromDate)}`);
  if (toDate) params.push(`toDate=${encodeURIComponent(toDate)}`);

  if (params.length > 0) {
    url += '?' + params.join('&');
  }

  return this.http.get<Notification[]>(url);
}

    updateNotification(Notification: Notification): Observable<Notification> {
        return this.http.put<Notification>(`${BASE_URL}/notification/${Notification.notificationID}`, Notification);
    }

    deleteNotification(NotificationId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/notification/${NotificationId}`);
    }

    addNotification(newNotification: Notification): Observable<Notification> {
        const { notificationID , ...NotificationWithoutId } = newNotification;
        return this.http.post<Notification>(`${BASE_URL}/notification`, NotificationWithoutId);
    }

    getNotificationById(NotificationId: number): Observable<Notification> {
        return this.http.get<Notification>(`${BASE_URL}/notification/${NotificationId}`);
    }
}
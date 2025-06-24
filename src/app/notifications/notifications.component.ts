import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/homeservices';
@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
    notifications: Notification[] = [];
     userID: number = Number(localStorage.getItem('userId'));
     fromDate: string = '';
     toDate: string = '';
     error: string = '';
   
     constructor(private notificationService: NotificationService) {}
   
     ngOnInit(): void {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      this.fromDate = firstDayOfMonth.toISOString().substring(0, 10);
      this.toDate = now.toISOString().substring(0, 10);
       this.loadNotifications();
     }
   
     loadNotifications(): void {
       this.notificationService.getNotificationByUserID(this.userID, this.fromDate, this.toDate)
         .subscribe({
           next: (data) => {
             this.notifications = data;
             this.error = '';
           },
           error: (err) => {
             this.error = 'Failed to load notifications.';
             console.error(err);
           }
         });
     }
   
     applyDateFilter(): void {
       this.loadNotifications();
     }
   
     clearFilter(): void {
       this.fromDate = '';
       this.toDate = '';
       this.loadNotifications();
     }
}

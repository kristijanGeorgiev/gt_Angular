import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStatistics } from '../models/homeservices';

@Injectable({
  providedIn: 'root'
})
export class DashboardStatisticsService {

  private readonly apiUrl = 'https://localhost:7025/api/AdminDashboard/dashboard-data';

  constructor(private http: HttpClient) {}

  getDashboardStatistics(): Observable<DashboardStatistics> {
    return this.http.get<DashboardStatistics>(`${this.apiUrl}`);
  }
}

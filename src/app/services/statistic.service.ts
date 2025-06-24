import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeStatistic } from '../models/homeservices';

const BASE_URL = 'https://localhost:7025/api';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getStatistics(employeeId: number): Observable<EmployeeStatistic> {
    return this.http.get<EmployeeStatistic>(`${BASE_URL}/statistics/employee/${employeeId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeCombinedReport } from '../models/homeservices';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeReportsService {

  private apiUrl = 'https://localhost:7025/api/EmployeeReports';

  constructor(private http: HttpClient) {}

  getEmployeeCombinedReport(): Observable<EmployeeCombinedReport[]> {
    return this.http.get<EmployeeCombinedReport[]>(`${this.apiUrl}/combined`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminStatistic } from '../models/homeservices';

const BASE_URL = 'https://localhost:7025/api';

@Injectable({
  providedIn: 'root'
})
export class AdminStatisticService {
  constructor(private http: HttpClient) {}

  getStatistics(): Observable<AdminStatistic> {
    return this.http.get<AdminStatistic>(`${BASE_URL}/AdminStatistic/summary`);
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkPosition } from '../models/homeservices';
const BASE_URL = 'https://localhost:7025/api';
@Injectable({
  providedIn: 'root'
})
export class WorkpositionService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<WorkPosition[]> {
    return this.http.get<WorkPosition[]>(`${BASE_URL}/WorkPosition`);
  }

  getById(id: number): Observable<WorkPosition> {
    return this.http.get<WorkPosition>(`${BASE_URL}/WorkPosition/${id}`);
  }

  add(position: WorkPosition): Observable<WorkPosition> {
    return this.http.post<WorkPosition>(`${BASE_URL}/WorkPosition`, position);
  }

  update(position: WorkPosition): Observable<WorkPosition> {
    return this.http.put<WorkPosition>(`${BASE_URL}/WorkPosition/${position.id}`, position);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/WorkPosition/${id}`);
  }
}

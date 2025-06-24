import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin, Client, CreateUser, Employee, UpdateUser } from '../models/homeservices';

const BASE_URL = 'https://localhost:7025/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(data: CreateUser): Observable<any> {
    return this.http.post(`${BASE_URL}/user`, data);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${BASE_URL}/user/clients`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${BASE_URL}/user/employees`);
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${BASE_URL}/user/admins`);
  }

  getClientById(userId: number): Observable<Client> {
    return this.http.get<Client>(`${BASE_URL}/user/clients/${userId}`);
  }

  getEmployeeById(userId: number): Observable<Employee> {
    return this.http.get<Employee>(`${BASE_URL}/user/employees/${userId}`);
  }
  getAdminById(userId: number): Observable<Admin> {
    return this.http.get<Admin>(`${BASE_URL}/user/admins/${userId}`);
  }

  updateClient(userID: number, clientData: UpdateUser): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(`${BASE_URL}/user/${userID}`, clientData);
  }
  getAvailableEmployees(params: any): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://localhost:7025/api/user/available-employees', {params})
  
  }
}
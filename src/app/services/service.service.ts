import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/homeservices';
import { Observable} from 'rxjs';
const BASE_URL = 'https://localhost:7025/api';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    services: Service[] = [];

    constructor(private http: HttpClient) { }

    getServices(): Observable<Service[]> {
        return this.http.get<Service[]>(`${BASE_URL}/service`);
    }

    updateService(Service: Service): Observable<Service> {
        return this.http.put<Service>(`${BASE_URL}/service/${Service.serviceID}`, Service);
    }

    deleteService(ServiceId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/service/${ServiceId}`);
    }

   addService(newService: Service): Observable<Service> {
           const { serviceID , ...ServiceWithoutId } = newService;
           return this.http.post<Service>(`${BASE_URL}/service`, ServiceService);
     }
    getServiceById(id: number): Observable<Service> {
      return this.http.get<Service>(`${BASE_URL}/service/${id}`);
  }  
}

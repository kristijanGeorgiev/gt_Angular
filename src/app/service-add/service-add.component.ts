import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Service } from '../models/homeservices';

@Component({
  selector: 'app-service-add',
  standalone: false,
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {
  newService: Service = {serviceID: 0, name: '', description: '', price: 0, isAvailable: true, image: '', unitOfMeasure: ''}
  service: Service[] = [];
  constructor(private serviceService: ServiceService, private router: Router) {}
 ngOnInit(): void {
   this.getServices();
 }
 addService(): void {
   this.serviceService.addService(this.newService).subscribe(() => {
     this.router.navigate(['/services']);
   });
 }
 goToServiceList(): void {
   this.router.navigate(['/services']);
 }
 getServices(): void {
  this.serviceService.getServices().subscribe((service) => {
    this.service = service;
  });
}
}
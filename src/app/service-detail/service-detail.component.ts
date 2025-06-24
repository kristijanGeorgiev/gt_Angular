import { Component } from '@angular/core';
import { Service } from '../models/homeservices';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-detail',
  standalone: false,
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent {
  service: Service | undefined
  constructor(private route: ActivatedRoute, private serviceService: ServiceService) { }
  ngOnInit(): void {
    this.getServiceDetails();
  }
  getServiceDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.serviceService.getServiceById(+id).subscribe((service: Service| undefined) => {
        this.service= service;
      });
    }
  }
}

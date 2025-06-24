import { Component } from '@angular/core';
import { Service } from '../models/homeservices';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-edit',
  standalone: false,
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.css'
})
export class ServiceEditComponent {
  service: Service | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.getServiceDetails();
    this.getServices();
  }
  getServiceDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.serviceService.getServiceById(+id).subscribe((service) => {
        this.service= service;
      });
    }
  }
  getServices(): void {
    this.serviceService.getServices().subscribe((service) => {
      this.service = this.service;
    });
  }
  saveChanges(): void {
    if (this.service) {
      this.serviceService.updateService(this.service).subscribe(() => {
        this.router.navigate(['/service-detail', this.service!.serviceID]);
      });
    }
  }
}

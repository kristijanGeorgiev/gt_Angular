import { Component, OnInit } from '@angular/core';
import { Service } from '../models/homeservices';
import { ServiceService } from '../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-service-list',
  standalone: false,
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent implements OnInit{
  services: Service[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  nameloaded: boolean = false;
  namefilter: string = '';
  constructor(private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getServices();
  }
  sortByServiceID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.services.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.serviceID- b.serviceID;
      } else {
        return b.serviceID - a.serviceID;
      }
    });
  }
  
  sortByName(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.services.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  getServices(): void {
    this.serviceService.getServices().subscribe((service) => {
      this.services= service;
      this.namefilter = '';
      this.nameloaded = true;
    });
  }

  applyFilters(): void {
    this.serviceService.getServices().subscribe((service) => {
      this.services= this.filterServices(service);
    });
  }

  filterServices(services: Service[]): Service[] {
    return services.filter(service =>
      this.filterByName(service)
    )
  }

  filterByName(service: Service): boolean {
    return this.namefilter === '' || service.name.toLowerCase().includes(this.namefilter.toLowerCase());
  }
  viewserviceDetails(service: Service): void {
    this.router.navigate(['/service-detail', service.serviceID]);
  }

  editservice(service: Service): void {
    this.router.navigate(['/service-edit', service.serviceID]);
  }

  deleteservice(service: Service): void {
    if (confirm('Do you want to delete the service')) {
      this.serviceService.deleteService(service.serviceID).subscribe(() => {
        this.getServices();
      });
    }
  }
}

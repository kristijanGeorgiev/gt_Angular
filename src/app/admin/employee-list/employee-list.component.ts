import { Component, OnInit } from '@angular/core';
import { Employee} from '../../models/homeservices';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  employees: Employee[] = [];
    filteredEmployees: Employee[] = [];
  
    emailFilter: string = '';
    firstNameFilter: string = '';
    lastNameFilter: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
  
    constructor(private userservice: UserService, private router: Router) {}
  
    ngOnInit(): void {
      this.loadEmployees();
    }
  
    loadEmployees(): void {
      this.userservice.getEmployees().subscribe({
        next: (data) => {
          this.employees = data;
          this.applyFilters();
        },
        error: (err) => {
          console.error('Failed to load employees.', err);
        }
      });
    }
  
  applyFilters(): void {
    this.filteredEmployees = this.employees.filter(employee =>
      (this.emailFilter === '' || employee.email.toLowerCase().includes(this.emailFilter.toLowerCase())) &&
      (this.firstNameFilter === '' || employee.firstName.toLowerCase().includes(this.firstNameFilter.toLowerCase())) &&
      (this.lastNameFilter === '' || employee.lastName.toLowerCase().includes(this.lastNameFilter.toLowerCase()))
    );
  }
  
  
    clearFilters(): void {
      this.emailFilter = '';
      this.firstNameFilter = '';
      this.lastNameFilter = '';
      this.applyFilters();
    }
  
    sortByID(): void {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.filteredEmployees.sort((a, b) =>
        this.sortDirection === 'asc' ? a.userId - b.userId : b.userId - a.userId
      );
    }
  
    sortByEmail(): void {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.filteredEmployees.sort((a, b) =>
        this.sortDirection === 'asc'
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email)
      );
    }
  
    viewEmployeeDetails(employee: Employee): void {
      this.router.navigate(['/admin-dashboard/employee-detail', employee.userId]);
    }
  
    editEmployee(userId: number): void {
      this.router.navigate(['/admin-dashboard/employee-edit', userId]);
    }
  
    addEmployee(): void {
      this.router.navigate(['/admin-dashboard/employee-add']);
    }
}

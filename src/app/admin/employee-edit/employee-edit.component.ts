import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUser, WorkPosition } from '../../models/homeservices';
import { UserService } from '../../services/user.service';
import { WorkpositionService } from '../../services/workposition.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-edit',
  standalone: false,
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{
  employee: UpdateUser | undefined;
  workPositions: WorkPosition[] = [];
  userId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private workservice: WorkpositionService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  this.userId = Number(this.route.snapshot.paramMap.get('id'));
  if (this.userId) {
    this.loadEmployee(this.userId);
  }
  this.loadWorkPositions();
}

loadEmployee(id: number): void {
  this.userService.getEmployeeById(id).subscribe({
    next: (employee) => {
      if (employee.dateOfBirth) {
        employee.dateOfBirth = employee.dateOfBirth.substring(0, 10);
      }
      this.employee = employee;
    },
    error: (err) => console.error('Failed to load employee', err)
  });
}

loadWorkPositions(): void {
  this.workservice.getAll().subscribe({
      next: (data) => this.workPositions = data,
      error: (err) => console.error('Failed to load work positions', err)
    });
  }
  saveChanges(): void {
    if (this.employee) {
      this.userService.updateClient(this.userId, this.employee).subscribe(() => {
        this.router.navigate(['/admin-dashboard/users/employees']);
      });
    }
  }
}

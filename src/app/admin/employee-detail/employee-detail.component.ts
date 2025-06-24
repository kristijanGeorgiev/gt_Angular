import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUser, WorkPosition } from '../../models/homeservices';
import { UserService } from '../../services/user.service';
import { WorkpositionService } from '../../services/workposition.service';
@Component({
  selector: 'app-employee-detail',
  standalone: false,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {
   employee: UpdateUser | undefined;
   workPositions: WorkPosition[] = [];
  userId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private workservice: WorkpositionService
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
getWorkPositionName(): string {
  if (!this.employee || !this.workPositions) return 'N/A';
  const match = this.workPositions.find(wp => wp.id === this.employee!.workPositionId);
  return match ? match.name : 'N/A';
}

  back(): void {
    {
        this.router.navigate(['/admin-dashboard/users/employees']);
    };
    }
}

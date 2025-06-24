import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../services/statistic.service';
import { EmployeeStatistic } from '../../models/homeservices';

@Component({
  selector: 'app-employee-dashboard',
  standalone: false,
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
  statistic?: EmployeeStatistic;
  userID: number = Number(localStorage.getItem('userId'));

  constructor(private statService: StatisticService) {}

  ngOnInit(): void {
    this.statService.getStatistics(this.userID).subscribe({
      next: data => this.statistic = data,
      error: err => console.error('Failed to fetch statistics:', err)
    });
  }
}

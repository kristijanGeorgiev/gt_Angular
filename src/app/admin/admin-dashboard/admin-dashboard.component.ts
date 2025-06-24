import { Component, OnInit } from '@angular/core';
import { DashboardStatistics } from '../../models/homeservices';
import { DashboardStatisticsService } from '../../services/dashboardstatistic.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  statistics!: DashboardStatistics;

  bookingsByServiceLabels: string[] = [];
  bookingsByServiceData: number[] = [];

  monthlyBookingLabels: string[] = [];
  monthlyBookingData: number[] = [];

  revenueLabels: string[] = [];
  revenueData: number[] = [];

  constructor(private dashboardService: DashboardStatisticsService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardStatistics().subscribe({
      next: (data) => {
        this.statistics = data;

        this.bookingsByServiceLabels = data.bookingsByServiceType.map(x => x.serviceName);
        this.bookingsByServiceData = data.bookingsByServiceType.map(x => x.totalBookings);

        this.monthlyBookingLabels = data.monthlyBookingTrends.map(x => x.month);
        this.monthlyBookingData = data.monthlyBookingTrends.map(x => x.totalBookings);

        this.revenueLabels = data.revenueByMonth.map(x => x.month);
        this.revenueData = data.revenueByMonth.map(x => x.totalRevenue);
      },
      error: (err) => console.error('Failed to load dashboard statistics', err)
    });
  }
}

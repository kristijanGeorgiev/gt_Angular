import { Component } from '@angular/core';
import { DashboardStatistics } from '../../models/homeservices';
import { DashboardStatisticsService } from '../../services/dashboardstatistic.service';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-reports-revenue',
  standalone: false,
  templateUrl: './reports-revenue.component.html',
  styleUrl: './reports-revenue.component.css'
})
export class ReportsRevenueComponent{
    revenueLabels: string[] = [];
    revenueData: number[] = [];
    statistics!: DashboardStatistics;
  
    constructor(
      private router: Router,
      private http: HttpClient,
      private dashboardService: DashboardStatisticsService
    ) {}
  
        ngOnInit(): void {
      this.dashboardService.getDashboardStatistics().subscribe({
        next: (data) => {
          this.statistics = data;
  
          this.revenueLabels = data.revenueByMonth.map(x => x.month);
          this.revenueData = data.revenueByMonth.map(x => x.totalRevenue);

        },
        error: (err) => console.error('Failed to load dashboard statistics', err)
      });
    }
      exportToPDF(): void {
        const element = document.getElementById('pdfTable');
        if (!element) {
          console.error('PDF element not found!');
          return;
        }
    
        const options = {
          margin: 10,
          filename: `RevenueByMonth.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
    
        html2pdf().from(element).set(options).save();
      }
      back(): void {
      this.router.navigate(['/admin-dashboard/reports']);
    }
}

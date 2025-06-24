import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { DashboardStatisticsService } from '../../services/dashboardstatistic.service';
import { DashboardStatistics } from '../../models/homeservices';
@Component({
  selector: 'app-reports-bst',
  standalone: false,
  templateUrl: './reports-bst.component.html',
  styleUrl: './reports-bst.component.css'
})
export class ReportsBstComponent{

    bookingsByServiceLabels: string[] = [];
    bookingsByServiceData: number[] = [];
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
  
          this.bookingsByServiceLabels = data.bookingsByServiceType.map(x => x.serviceName);
          this.bookingsByServiceData = data.bookingsByServiceType.map(x => x.totalBookings);

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
          filename: `BookingByServiceType.pdf`,
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

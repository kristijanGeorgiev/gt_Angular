import { Component, OnInit } from '@angular/core';
import { EmployeeCombinedReport } from '../../models/homeservices';
import { EmployeeReportsService } from '../../services/employeereports.service';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-reports-employee',
  standalone: false,
  templateUrl: './reports-employee.component.html',
  styleUrl: './reports-employee.component.css'
})
export class ReportsEmployeeComponent implements OnInit{
    combinedReport: EmployeeCombinedReport[] = [];
    
      constructor(private employeeReportsService: EmployeeReportsService, private router: Router) {}
    
      ngOnInit(): void {
        this.loadEmployeeCombinedReport();
      }
    
      loadEmployeeCombinedReport(): void {
        this.employeeReportsService.getEmployeeCombinedReport().subscribe({
          next: (data) => {
            this.combinedReport = data;
          },
          error: (err) => console.error('Failed to load combined report:', err)
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
              filename: `Employee_Performance.pdf`,
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

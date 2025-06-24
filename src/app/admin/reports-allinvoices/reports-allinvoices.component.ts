import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { Invoice } from '../../models/homeservices';
import { InvoiceService } from '../../services/invoice.service';
@Component({
  selector: 'app-reports-allinvoices',
  standalone: false,
  templateUrl: './reports-allinvoices.component.html',
  styleUrl: './reports-allinvoices.component.css'
})
export class ReportsAllinvoicesComponent {
   invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  fromDateFilter: string = '';
  toDateFilter: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private invoiceservice: InvoiceService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
    this.fromDateFilter = firstDayOfYear.toISOString().substring(0, 10);
    this.toDateFilter = now.toISOString().substring(0, 10);
    this.loadInvoices();
  }

  loadInvoices(): void {
  const params: any = {};

  if (this.fromDateFilter) params.fromDate = this.fromDateFilter;
  if (this.toDateFilter) params.toDate = this.toDateFilter;

  this.invoiceservice.getInvoicesWithFilters(params).subscribe({
    next: (data) => {
      this.invoices = data;
      this.filteredInvoices = data;
    },
    error: (err) => console.error('Failed to load invoices.', err)
  });
}

  applyFilters(): void {
    this.loadInvoices();
  }

  clearFilters(): void {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
    this.fromDateFilter = firstDayOfYear.toISOString().substring(0, 10);
    this.toDateFilter = now.toISOString().substring(0, 10);
    this.loadInvoices();
  }

  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredInvoices.sort((a, b) =>
      this.sortDirection === 'asc' ? a.invoiceID - b.invoiceID : b.invoiceID - a.invoiceID
    );
  }
    exportToPDF(): void {
      const element = document.getElementById('pdfTable');
      if (!element) {
        console.error('PDF element not found!');
        return;
      }
  
      const options = {
        margin: 10,
        filename: `Invoice_${this.fromDateFilter}.pdf`,
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

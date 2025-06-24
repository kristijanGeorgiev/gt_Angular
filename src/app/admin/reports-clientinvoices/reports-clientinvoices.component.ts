import { Component } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Invoice, Client } from '../../models/homeservices';
import { InvoiceService } from '../../services/invoice.service';
@Component({
  selector: 'app-reports-clientinvoices',
  standalone: false,
  templateUrl: './reports-clientinvoices.component.html',
  styleUrl: './reports-clientinvoices.component.css'
})
export class ReportsClientinvoicesComponent {
    invoices: Invoice[] = [];
    clients: Client[] = [];
    clientSearchTerm: string = '';
  filteredInvoices: Invoice[] = [];
  filteredClients: Client[] = [];
  clientFilter: string = '';
  fromDateFilter: string = '';
  toDateFilter: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private invoiceservice: InvoiceService,
    private userservice: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
    this.fromDateFilter = firstDayOfYear.toISOString().substring(0, 10);
    this.toDateFilter = now.toISOString().substring(0, 10);
    this.loadInvoices();
    this.loadClients();
  }

  loadInvoices(): void {
  const params: any = {};

  if (this.fromDateFilter) params.fromDate = this.fromDateFilter;
  if (this.toDateFilter) params.toDate = this.toDateFilter;
  if (this.clientFilter) params.userId = this.clientFilter;

  this.invoiceservice.getInvoicesWithFilters(params).subscribe({
    next: (data) => {
      this.invoices = data;
      this.filteredInvoices = data;
    },
    error: (err) => console.error('Failed to load invoices.', err)
  });
}

loadClients(): void {
  const params: any = {};

  if (this.clientFilter) params.userId = this.clientFilter;

  this.userservice.getClients().subscribe({
    next: (data) => {
      this.clients = data;
      this.filteredClients = data;
    },
    error: (err) => console.error('Failed to load clients.', err)
  });
}

  applyFilters(): void {
    this.loadInvoices();
    this.loadClients();
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
        filename: `ClientInvoice_${this.clientFilter}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
  
      html2pdf().from(element).set(options).save();
    }
    back(): void {
    this.router.navigate(['/admin-dashboard/reports']);
  }
  filterClients(): void {
  const searchTerm = this.clientSearchTerm.toLowerCase();

  this.filteredClients = this.clients.filter(client =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm)
  );
}
}

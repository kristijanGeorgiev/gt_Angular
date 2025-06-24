import { Component } from '@angular/core';
import { Client, Invoice } from '../../models/homeservices';
import { InvoiceService } from '../../services/invoice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-invoices',
  standalone: false,
  templateUrl: './admin-invoices.component.html',
  styleUrl: './admin-invoices.component.css'
})
export class AdminInvoicesComponent {
  invoices: Invoice[] = [];
  clientSearchTerm: string = '';
  filteredClients: any[] = [];
  filteredInvoices: Invoice[] = [];
  clients: Client[] = [];
  isPaidFilter: string = '';
  clientFilter: string = '';
  fromDateFilter: string = '';
  toDateFilter: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private invoiceservice: InvoiceService,
    private userservice: UserService,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.restoreFilters();
    this.loadInvoices();
    this.loadClients();
  }

  restoreFilters(): void {
    const savedFilters = sessionStorage.getItem('invoiceFilters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      this.isPaidFilter = filters.isPaidFilter || '';
      this.clientFilter = filters.clientFilter || '';
      this.fromDateFilter = filters.fromDateFilter || '';
      this.toDateFilter = filters.toDateFilter || '';
    } else {
      const now = new Date();
      const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
      this.fromDateFilter = firstDayOfYear.toISOString().substring(0, 10);
      this.toDateFilter = now.toISOString().substring(0, 10);
    }
  }

  saveFilters(): void {
    const filters = {
      isPaidFilter: this.isPaidFilter,
      clientFilter: this.clientFilter,
      fromDateFilter: this.fromDateFilter,
      toDateFilter: this.toDateFilter
    };
    sessionStorage.setItem('invoiceFilters', JSON.stringify(filters));
  }

  loadInvoices(): void {
    const params: any = {};
    if (this.isPaidFilter !== '') params.isPaid = this.isPaidFilter === 'true';
    if (this.fromDateFilter) params.fromDate = this.fromDateFilter;
    if (this.clientFilter) params.userId = this.clientFilter;
    if (this.toDateFilter) params.toDate = this.toDateFilter;

    this.invoiceservice.getInvoicesWithFilters(params).subscribe({
      next: (data) => {
        this.invoices = data;
        this.filteredInvoices = data;
      },
      error: (err) => console.error('Failed to load invoices.', err)
    });
  }

  loadClients(): void {
    this.userservice.getClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Failed to load clients.', err)
    });
  }

  applyFilters(): void {
    this.saveFilters();
    this.loadInvoices();
  }

  clearFilters(): void {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
    this.fromDateFilter = firstDayOfYear.toISOString().substring(0, 10);
    this.toDateFilter = now.toISOString().substring(0, 10);
    this.isPaidFilter = '';
    this.clientFilter = '';
    this.saveFilters();
    this.loadInvoices();
  }

  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredInvoices.sort((a, b) =>
      this.sortDirection === 'asc' ? a.invoiceID - b.invoiceID : b.invoiceID - a.invoiceID
    );
  }

  editInvoice(invoiceId: number): void {
  this.saveFilters();
  sessionStorage.setItem('returnFromDetail', 'true');
  this.router.navigate(['/admin-dashboard/admin-invoices-edit', invoiceId]);
}

viewInvoiceDetails(invoice: Invoice): void {
  this.saveFilters();
  sessionStorage.setItem('returnFromDetail', 'true');
  this.router.navigate(['/admin-dashboard/admin-invoices-detail', invoice.invoiceID]);
}

  filterClients(): void {
    const searchTerm = this.clientSearchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm)
    );
  }
}
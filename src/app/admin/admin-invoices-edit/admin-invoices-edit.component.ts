import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfo, Invoice } from '../../models/homeservices';
import { InvoiceService } from '../../services/invoice.service';
import { CompanyInfoService } from '../../services/companyinfo.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-invoices-edit',
  standalone: false,
  templateUrl: './admin-invoices-edit.component.html',
  styleUrl: './admin-invoices-edit.component.css'
})
export class AdminInvoicesEditComponent implements OnInit {
  invoice: Invoice | undefined;
  invoiceId: number = 0;
  companyInfo: CompanyInfo | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private companyInfoservice: CompanyInfoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadCompanyInfo()
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.invoiceId = id;

    if (id) {
      this.invoiceService.getInvoiceById(id).subscribe({
        next: (invoice) => {
          this.invoice = invoice;
          this.invoice.issuedDate = this.invoice.issuedDate.substring(0,10);
          this.invoice.dueDate = this.invoice.dueDate.substring(0,10);
        },
        error: (err) => {
          console.error('Failed to load invoice', err);
          this.router.navigate(['/admin-dashboard/admin-invoices']);
        }
      });
    }

    this.loadCompanyInfo();
  }

 loadCompanyInfo(): void {
  this.companyInfoservice.getCompanyInfo().subscribe({
    next: (data) => {
      this.companyInfo = Array.isArray(data) && data.length > 0 ? data[0] : undefined;
    },
    error: (err) => {
      console.error('Failed to load company info', err);
    }
  });
}


  saveChanges(): void {
    if (this.invoice) {
      this.invoiceService.updateInvoice(this.invoice).subscribe(() => {
        this.location.back();
      });
    }
  }

  back(): void {
    this.location.back();
  }
}

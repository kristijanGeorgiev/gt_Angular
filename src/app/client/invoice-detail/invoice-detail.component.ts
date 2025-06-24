import { Component, OnInit } from '@angular/core';
import { CompanyInfo, Invoice } from '../../models/homeservices';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { CompanyInfoService } from '../../services/companyinfo.service';
import { BookingService } from '../../services/booking.service';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-invoice-detail',
  standalone: false,
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  invoice: Invoice | undefined;
  companyInfo: CompanyInfo | undefined;
  serviceName: string = '';
  clientName: string = '';
  clientAddress: string = '';
  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private bookingService: BookingService,
    private router: Router,
    public companyInfoservice: CompanyInfoService
  ) {}

  ngOnInit(): void {
    this.loadCompanyInfo(1);
    const bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    if (bookingId) {
      this.invoiceService.getInvoiceByBookingId(bookingId).subscribe({
        next: (data) => {
          this.invoice = data;
          this.loadBookingDetails(bookingId);
        },
        error: () => {
          alert('Invoice not found for this booking.');
          this.router.navigate(['/client-dashboard/booking-invoice']);
        }
      });
    } else {
      this.router.navigate(['/client-dashboard/booking-invoice']);
    }
  }
  
loadBookingDetails(bookingId: number): void {
  this.bookingService.getBookingById(bookingId).subscribe({
    next: (booking) => {
      this.serviceName = booking.serviceName;
      this.clientName = booking.contactName;
      this.clientAddress = booking.address;
    },
    error: () => {
      this.serviceName = 'Unknown';
      this.clientName = 'Unknown';
      this.clientAddress = '';
    }
  });
}
loadCompanyInfo(companyId: number): void {
    this.companyInfoservice.getCompanyInfoById(companyId).subscribe({
      next: (data) => {
        this.companyInfo = data;
      }
    });
  }

  back(): void {
    this.router.navigate(['/client-dashboard/booking-invoice']);
  }

  exportToPDF(): void {
    const element = document.getElementById('pdfTable');
    if (!element) {
      console.error('PDF element not found!');
      return;
    }

    const options = {
      margin: 10,
      filename: `Invoice_${this.invoice?.invoiceID}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
  }
}

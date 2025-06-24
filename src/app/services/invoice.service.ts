import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/homeservices';
import { Observable} from 'rxjs';
const BASE_URL = 'https://localhost:7025/api';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  apiUrl: any;
    invoices: Invoice[] = [];

    constructor(private http: HttpClient) { }

    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(`${BASE_URL}/invoice`);
    }

    updateInvoice(invoice: Invoice): Observable<void> {
    return this.http.put<void>(`${BASE_URL}/invoice/${invoice.invoiceID}`, invoice);
}

    deleteInvoice(invoiceID: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/invoice/${invoiceID}`);
    }

    addInvoice(newInvoice: Invoice): Observable<Invoice> {
        const { invoiceID, ...InvoiceWithoutId } = newInvoice;
        return this.http.post<Invoice>(`${BASE_URL}/invoice`, InvoiceWithoutId);
    }

    getInvoiceById(invoiceID: number): Observable<Invoice> {
        return this.http.get<Invoice>(`${BASE_URL}/invoice/${invoiceID}`);
    }
    getInvoiceByBookingId(bookingId: number): Observable<Invoice> {
      return this.http.get<Invoice>(`${BASE_URL}/invoice/booking/${bookingId}`);
    }
    getInvoicesWithFilters(params: any): Observable<Invoice[]> {
      return this.http.get<Invoice[]>('https://localhost:7025/api/invoice', { params})
    
    }
}
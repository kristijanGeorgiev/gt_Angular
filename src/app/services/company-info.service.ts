import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CompanyInfoService {
  companyName = 'EuroCist';
  address = '123 Main Street, Skopje, North Macedonia';
  phoneNumber = '+389 70 123 456';
  taxNumber = '123456789';
  bank = 'Komercijalna Banka';
  bankAccount = 'MK07250120000012345';
}
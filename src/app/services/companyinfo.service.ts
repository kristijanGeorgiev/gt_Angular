import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyInfo } from '../models/homeservices';

const BASE_URL = 'https://localhost:7025/api/CompanyInfo';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(private http: HttpClient) {}

  getCompanyInfo(): Observable<CompanyInfo[]> {
    return this.http.get<CompanyInfo[]>(BASE_URL);
  }

  getCompanyInfoById(id: number): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(`${BASE_URL}/${id}`);
  }

  addCompanyInfo(companyInfo: CompanyInfo): Observable<CompanyInfo> {
    return this.http.post<CompanyInfo>(BASE_URL, companyInfo);
  }

  updateCompanyInfo(id: number, companyInfo: CompanyInfo): Observable<CompanyInfo> {
    return this.http.put<CompanyInfo>(`${BASE_URL}/${id}`, companyInfo);
  }

  deleteCompanyInfo(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}

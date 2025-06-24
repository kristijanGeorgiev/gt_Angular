import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfo } from '../../models/homeservices';
import { CompanyInfoService } from '../../services/companyinfo.service';

@Component({
  selector: 'app-company-info',
  standalone: false,
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css'
})
export class CompanyInfoComponent implements OnInit {
  companyInfo: CompanyInfo | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyInfoService: CompanyInfoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.companyInfoService.getCompanyInfoById(id).subscribe({
        next: (data) => this.companyInfo = data,
        error: () => {
          alert('Company Info not found');
          this.router.navigate(['/admin-dashboard/company-info']);
        }
      });
    } else {
      this.router.navigate(['/admin-dashboard/company-info']);
    }
  }

  save(): void {
    if (!this.companyInfo) return;

    this.companyInfoService.updateCompanyInfo(this.companyInfo.companyId, this.companyInfo).subscribe({
      next: () => this.router.navigate(['/admin-dashboard/dashboard']),
      error: err => console.error('Update failed:', err)
    });
  }

  back(): void {
    this.router.navigate(['/admin-dashboard/dashboard']);
  }
}

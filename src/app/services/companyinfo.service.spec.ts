import { TestBed } from '@angular/core/testing';

import { CompanyInfoService } from '../services/companyinfo.service';

describe('CompanyinfoService', () => {
  let service: CompanyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

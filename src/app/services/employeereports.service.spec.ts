import { TestBed } from '@angular/core/testing';

import { EmployeereportsService } from './employeereports.service';

describe('EmployeereportsService', () => {
  let service: EmployeereportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeereportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

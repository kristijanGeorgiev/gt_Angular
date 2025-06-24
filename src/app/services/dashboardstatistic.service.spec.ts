import { TestBed } from '@angular/core/testing';

import { DashboardstatisticService } from './dashboardstatistic.service';

describe('DashboardstatisticService', () => {
  let service: DashboardstatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardstatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

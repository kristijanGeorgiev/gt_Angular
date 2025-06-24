import { TestBed } from '@angular/core/testing';

import { AdminstatisticService } from './adminstatistic.service';

describe('AdminstatisticService', () => {
  let service: AdminstatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminstatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

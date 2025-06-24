import { TestBed } from '@angular/core/testing';

import { WorkpositionService } from './workposition.service';

describe('WorkpositionService', () => {
  let service: WorkpositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkpositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

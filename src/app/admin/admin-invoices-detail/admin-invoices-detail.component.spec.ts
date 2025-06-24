import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvoicesDetailComponent } from './admin-invoices-detail.component';

describe('AdminInvoicesDetailComponent', () => {
  let component: AdminInvoicesDetailComponent;
  let fixture: ComponentFixture<AdminInvoicesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminInvoicesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInvoicesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

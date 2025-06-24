import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInvoiceComponent } from './reports-invoice.component';

describe('ReportsInvoiceComponent', () => {
  let component: ReportsInvoiceComponent;
  let fixture: ComponentFixture<ReportsInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

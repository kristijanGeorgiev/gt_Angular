import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvoicesEditComponent } from './admin-invoices-edit.component';

describe('AdminInvoicesEditComponent', () => {
  let component: AdminInvoicesEditComponent;
  let fixture: ComponentFixture<AdminInvoicesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminInvoicesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInvoicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

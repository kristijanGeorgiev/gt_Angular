import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoteEditComponent } from './admin-note-edit.component';

describe('AdminNoteEditComponent', () => {
  let component: AdminNoteEditComponent;
  let fixture: ComponentFixture<AdminNoteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNoteEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoteAddComponent } from './admin-note-add.component';

describe('AdminNoteAddComponent', () => {
  let component: AdminNoteAddComponent;
  let fixture: ComponentFixture<AdminNoteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNoteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNoteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

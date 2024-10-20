import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUserDialogComponent } from './create-edit-user-dialog.component';

describe('EditAddUserDialogComponent', () => {
  let component: CreateEditUserDialogComponent;
  let fixture: ComponentFixture<CreateEditUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditUserDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

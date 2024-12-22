import { Component, inject, Inject, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-user-dialog.component.',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, ReactiveFormsModule],
  templateUrl: './create-edit-user-dialog.component.html',
  styleUrl: './create-edit-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditUserDialogComponent implements OnInit{
  
  id = Date.now();
  readonly dialogRef = inject(MatDialogRef<CreateEditUserDialogComponent>);
  
  form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    address: this.fb.control('', [Validators.required]),
    email: this.fb.control(''),
    id: this.fb.control(this.id),
    phone: this.fb.control(''),
    username: this.fb.control(''),
    website: this.fb.control('')
  });

  //* =========================================================================================

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder
  ) {}

  //* =========================================================================================

  public ngOnInit(): void {
    if (this.data.user) {
      this.form.patchValue(this.data.user);
    }
  }

  //* =========================================================================================

  applyChanges(): void {
    this.dialogRef.close(this.form.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

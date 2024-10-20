import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-create-edit-user-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatCard
  ],
  templateUrl: './create-edit-user-dialog.component.html',
  styleUrl: './create-edit-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    website: this.fb.control(''),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    if(this.data.user) {
      this.form.patchValue(this.data.user)
    }
  }

  applyChanges(): void {
    this.dialogRef.close(this.form.value)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { User } from '../../services/users-api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormField,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatInput,
    MatDialogActions,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  isEdit = false;

  userForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User;
      isEdit: boolean;
    }
  ) {
    if (data.isEdit) {
      this.isEdit = true;
      this.userForm.patchValue(data.user);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addUser() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
  submit() {
    console.log('submit clicked');
  }

  get name() {
    return this.userForm.controls.name as FormControl;
  }
}

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
    NgIf
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent implements OnInit {
 
  //userForm: FormGroup;
  //user: User
  isEdit: boolean ;
  userForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User, isEdit: boolean
    }
  ) {
   

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    console.log('submit clicked');
  }
  ngOnInit(): void {
    //console.log(this.data.user)
  }
  get name() {
    return this.userForm.controls.name as FormControl;
  }
}

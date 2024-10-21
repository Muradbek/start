import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../data/interfaces/users.interface';


  @Component({
    selector: 'app-create-edit-user',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './create-edit-user.component.html',
    styleUrl: './create-edit-user.component.scss',
  })
  export class CreateEditUserComponent {
    createEditUserForm: FormGroup;
    isEdit = false;

    constructor(
      private builder: FormBuilder, 
      private dialogRef: MatDialogRef<CreateEditUserComponent>,
      @Inject(MAT_DIALOG_DATA) private data: User
    ) {
      const userid = Date.now()

      this.createEditUserForm = this.builder.group({
        id: userid,
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        website: ['', Validators.required],
      });

      if (data) {
        this.isEdit = true; 
        this.createEditUserForm.patchValue(data);
      }
    }
  
    addUser() {
      if (this.createEditUserForm.valid) {
        this.dialogRef.close(this.createEditUserForm.value);
      }
    }
  
    cancel() {
      if(this.isEdit){
        this.dialogRef.close(this.data);
      } else {
        this.dialogRef.close();
      }
    }
  }


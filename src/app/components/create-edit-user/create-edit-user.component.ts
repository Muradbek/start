import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MaterialModule } from '../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from '../../data/interfaces/users.interface';
import { P } from '@angular/cdk/keycodes';

  @Component({
    selector: 'app-create-edit-user',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './create-edit-user.component.html',
    styleUrl: './create-edit-user.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CreateEditUserComponent {
    createEditUserForm: FormGroup;
    isEdit = false;

    constructor(
      private builder: FormBuilder, 
      private dialogRef: MatDialogRef<CreateEditUserComponent>,
      @Inject(MAT_DIALOG_DATA) private data: Users
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


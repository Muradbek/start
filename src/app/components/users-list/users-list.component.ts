import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersApiService } from '../../data/services/users-api.service';
import { UsersService } from '../../data/services/users.service';
import { User } from '../../data/interfaces/users.interface';
import { UserCardComponent } from '../user-card/user-card.component';
import { MaterialModule } from '../../Material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterControlComponent } from '../filter-control/filter-control.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    MaterialModule,
    CreateEditUserComponent,
    FilterControlComponent,
    ReactiveFormsModule
],
  providers: [UsersService],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})

export class UsersListComponent implements OnInit{

  filterControl = new FormControl('');
  users$: Observable<User[]> = this.usersService.getUsers$();

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.filterControl.valueChanges.subscribe(filterName => {
      this.usersService.getUsers$(filterName ?? '');
    })
  }

  onUserDelete(userId: number) {
    this.usersService.deleteUser(userId);
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: null,
    });

    dialogRef.componentInstance.isEdit = false;
    
    dialogRef.afterClosed().subscribe((newUser) => {
      if(dialogRef.componentInstance.createEditUserForm.valid){
        this.usersService.addUser(newUser)
      }
    });
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user,
    });

    dialogRef.componentInstance.isEdit = true;

    dialogRef.afterClosed().subscribe((userСhanged) => {
      this.usersService.editUser(userСhanged)
    });
  }
}

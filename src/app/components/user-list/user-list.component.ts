import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { User, UsersApiService } from '../../services/users-api.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserCardComponent,
    NgFor,
    MatGridList,
    MatGridTile,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    UsersFilterComponent,
  ],
  providers: [UsersApiService, UsersService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  users$: Observable<User[]> = this.usersService.getUsers();

  filterControl = new FormControl('');

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.filterControl.valueChanges.subscribe((filterValue) => {
      this.usersService.getUsers(filterValue ?? '');
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
    this.cdr.markForCheck();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '350px',
      height: '380px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.usersService.newUser(result);
      this.cdr.markForCheck();
    });
  }

  openUpdateDialog(user: User): void {
    let isEdit = user ? true : false;

    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '350px',
      height: '380px',
      data: { user, isEdit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      user.name = result.name;
      user.email = result.email;
      this.usersService.editUser(user);
      this.cdr.markForCheck();
    });
  }
}

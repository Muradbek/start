import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersApiService } from '../../data/services/users-api.service';
import { UsersService } from '../../data/services/users.service';
import { Users } from '../../data/interfaces/users.interface';
import { UserCardComponent } from '../user-card/user-card.component';
import { MaterialModule } from '../../Material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, MaterialModule, CreateEditUserComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  users: Users[] = [];

  constructor(
    private usersApiService: UsersApiService,
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.usersApiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onUserDelete(userId: number) {
    this.usersService.deleteUser(userId);
    this.users = this.usersService.users;
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: null 
    });

    dialogRef.componentInstance.isEdit = false;
  
    dialogRef.afterClosed().subscribe(newUser => {
      this.users.push(newUser)
    });
  }

  openEditDialog(user: Users) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user
    });
  
    dialogRef.componentInstance.isEdit = true;
  
    dialogRef.afterClosed().subscribe(userСhanged => {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
          this.users[index] = userСhanged; 
      }
    });
  }

}

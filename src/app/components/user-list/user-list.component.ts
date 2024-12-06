import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { NgFor } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, NgFor, MatGridList, MatGridTile, MatButtonModule],
  providers: [UsersApiService, UsersService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  private usersApiService = inject(UsersApiService);
  public usersService = inject(UsersService);

  //@Output() deleteUserEvent = new EventEmitter<any>();

  // deleteUser(value: any) {
  //   this.deleteUserEvent.emit(value);
  //   console.log(`deleted ${value} user`);
  // }

  //users: User[] = [];

  userData(name: string, email: string) {
    let usrData = {
      id: Date.now(),
      name: name,
      username: 'Bret',
      email: email,
      address: 'Dagestan',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: 'Romaguera-Crona',
    };
    return usrData;
  }

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {
    this.usersApiService.getUsers().subscribe((e) => {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.usersService.users = JSON.parse(storedUsers);
      } else {
        this.usersService.users = this.usersService.users = e
      }
      this.cdr.markForCheck()

      
    });
    this.usersApiService.printLog();
  }

  ngOnInit(): void {
     this.usersService.getUsers();
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
    this.usersService.users = this.usersService.getUsers();
    this.cdr.markForCheck()
  }
  // updateUser(id: number) {
  //   this.usersService.editUser(id);
  //   this.cdr.markForCheck()
  // }
  openDialog(id?: number): void {
    const getUsr = this.usersService.getUsersById(id);
    let isEdit: boolean;

    function isEditFunc() {
      if (id) {
        return true;
      } else {
        return false;
      }
    }

    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '350px',
      height: '380px',
      data: { user: getUsr, isEdit: isEditFunc() },
    });

    dialogRef.beforeClosed().subscribe((result) => {
      if (result && isEditFunc() == false) {
  
        this.usersService.addUser(this.userData(result.name, result.email));
        this.cdr.markForCheck()
      }
      if(result && isEditFunc() == true) {
        this.usersService.editUser(id);
        this.cdr.markForCheck()
      }
     
    });

    //here update user logic..
  }
}

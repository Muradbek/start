import { Component, inject} from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UsersService } from "../users.service";
import { NgForOf } from "@angular/common";
import { CreateEditUserDialogComponent } from "../create-edit-user-dialog/create-edit-user-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { UserCardComponent } from "../user-card/user-card.component";
import { User } from "../users-api.service";
import { ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    NgForOf
  ],
  providers: [UsersApiService, UsersService],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
    private UsersApiService = inject(UsersApiService);
    public UsersService = inject(UsersService);
    
    constructor(
      private readonly dialog: MatDialog,
      private readonly cdr: ChangeDetectorRef
    ) {
      const users = localStorage.getItem('users');
      users
           ? this.UsersService.users = JSON.parse(users) 
           : this.UsersApiService.getUsers().subscribe(users => {
              this.UsersService.users = users;
              this.UsersService.updateLocalStorage(users);
              this.cdr.markForCheck();
            });
    }

    deleteUser (userId: number) {
      this.UsersService.deleteUser (userId); // Вызываем метод удаления
    }

    editCreateUser(userToEdit?: User): void {
      this.dialog.open(CreateEditUserDialogComponent, {
        data: {
          user: userToEdit ?? null
        }
      }).afterClosed().subscribe(user => {
        if(!user) return;
        userToEdit ? this.UsersService.editUser(user) : this.UsersService.addUser(user);

        this.cdr.markForCheck();
      }); 
    }
}

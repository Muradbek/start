import {
  AfterContentChecked, AfterContentInit, AfterRenderOptions, AfterRenderRef, AfterViewChecked, AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges, SimpleChanges
} from '@angular/core';
import {User, UsersApiService} from "../users-api.service";
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersService} from "../users.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateEditUserDialogComponent} from "../create-edit-user-dialog/create-edit-user-dialog.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    NgForOf,
    AsyncPipe
  ],
  providers: [UsersApiService, UsersService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UsersListComponent {
  private usersApiService = inject(UsersApiService);
  public usersService = inject(UsersService);

  constructor(
    private readonly dialog: MatDialog,
  ) {
    setInterval( ()=> {
      console.log("interval")
    }, 500)
    const users = localStorage.getItem('users');
    users
      ? this.usersService.users$.next(JSON.parse(users))
      : this.usersApiService.getUsers().subscribe( users => {
      this.usersService.users$.next(users);
    });
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId)
  }

  editCreateUser(userToEdit?: User): void {
    this.dialog.open(CreateEditUserDialogComponent, {
      data: {
        user: userToEdit ?? null
      }
    }).afterClosed().subscribe(user => {
      if(!user) return;
      userToEdit
        ? this.usersService.editUser(user)
        : this.usersService.addUser(user)
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges");
  }
  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
  }
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }

}

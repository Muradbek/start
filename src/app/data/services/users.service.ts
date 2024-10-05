import { Injectable, inject } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { Users } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersApiService = inject(UsersApiService);
  users: Users[] = [];

  constructor() {
    this.usersApiService.getUsers().subscribe((user) => {
      this.users = user;
    });
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

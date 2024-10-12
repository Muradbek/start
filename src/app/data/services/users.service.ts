import { Injectable, inject } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { Users } from '../interfaces/users.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersApiService = inject(UsersApiService);
  users = new BehaviorSubject<Users[]>([])
  
  constructor() {
    const storedUsers = localStorage.getItem('users');
  
    if (!storedUsers){
      this.usersApiService.getUsers().subscribe((user) => {
        this.users.next(user)
        localStorage.setItem('users', JSON.stringify(user));
      });
    } else {
      this.users.next(JSON.parse(storedUsers))
    }
  }
  
  deleteUser(id: number) {
    const filteredUsers = [...this.users.value.filter(user => user.id !== id)];
    this.users.next(filteredUsers);
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    if (JSON.parse(localStorage["users"]).length < 1){
      localStorage.removeItem('users')
    }
  }
}

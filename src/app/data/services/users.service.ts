import { Injectable, inject } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { User } from '../interfaces/users.interface';
import { BehaviorSubject, Observable } from 'rxjs';

export class UsersService {
  usersApiService = inject(UsersApiService);
  private users$ = new BehaviorSubject<User[]>([])

  constructor() {
  }
  
  getUsers$(filterName: string = '') {
    const storedUsers = localStorage.getItem('users');

    if (!storedUsers) {
      this.usersApiService.getUsers().subscribe((users) => {
        const filteredUsers = users.filter(user => 
          user.name.toLowerCase().includes(filterName.toLowerCase())
        );

        this.users$.next(filteredUsers);
        localStorage.setItem('users', JSON.stringify(users)); 
      });
    } else {
      const users = JSON.parse(storedUsers);

      const filteredUsers = users.filter((user: { name: string; }) => 
        user.name.toLowerCase().includes(filterName.toLowerCase())
      );
      this.users$.next(filteredUsers);
    }

  return this.users$.asObservable();
  }

  deleteUser(id: number) {
    const filteredUsers = [...this.users$.value.filter(user => user.id !== id)];
    this.users$.next(filteredUsers);
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    if (JSON.parse(localStorage["users"]).length < 1){
      localStorage.removeItem('users')
    }
  }

  addUser(newUser: User){
    this.users$.value.push(newUser)
    localStorage.setItem('users', JSON.stringify(this.users$.value))
  }

  editUser(userСhanged: User){
    const index = this.users$.value.findIndex((index) => index.id === userСhanged.id)
    if (index !== -1) {
      this.users$.value[index] = userСhanged;
      localStorage.setItem('users', JSON.stringify(this.users$.value))
    }
  }
}

import { Injectable } from '@angular/core';
import { User } from './users-api.service';

@Injectable()
export class UsersService {
  users: User[] = [];

  constructor() {
    this.loadUsers()
  }


  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private loadUsers(): void {
    const storedUsers = localStorage.getItem('users');
    if(storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  getUsers(): any[] {
    return this.users
  }

  addUser(newUser: any) {
    this.users.push(newUser);
    this.saveUsers();
  }


  getUsersById(userId: any) {
    return this.users.find((x) => x.id === userId);
  }

  deleteUser(userId: number) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.saveUsers()
  }

  editUser(userId: any) {
    console.log('edited user ID' + userId);
    this.saveUsers()
  }
}

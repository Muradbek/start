import { inject, Injectable } from '@angular/core';
import { User, UsersApiService } from './users-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
  private usersApiService = inject(UsersApiService);
  //users: User[] = [];
  users = new BehaviorSubject<User[]>([]);

  //usr$ = this.usersSubject.asObservable()

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users.next(JSON.parse(storedUsers));
    } else {
      this.usersApiService.getUsers().subscribe((e) => {
        this.users.next(e);
        localStorage.setItem('users', JSON.stringify(e));
      });
      this.usersApiService.printLog();
    }
  }

  getUsers(): User[] {
    return this.users.getValue();
  }

  getUsersById(userId: any) {
    return this.users.value.find((x) => x.id === userId);
  }

  deleteUser(userId: number) {
    const filtredUsers = [
      ...this.users.value.filter((user) => user.id !== userId),
    ];
    this.users.next(filtredUsers);
    localStorage.setItem('users', JSON.stringify(filtredUsers));
  }

  editUser(updatedUser: User): void {
    const usersArr = this.getUsers();
    const index = usersArr.findIndex((e) => e.id === updatedUser.id);
    if (index !== -1) {
      usersArr[index] = updatedUser;
      this.users.next([...usersArr]);
    }
  }
}

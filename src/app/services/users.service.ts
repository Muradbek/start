import { inject, Injectable } from '@angular/core';
import { User, UsersApiService } from './users-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
  private usersApiService = inject(UsersApiService);
  users$ = new BehaviorSubject<User[]>([]);

  constructor() {
   
  }
  mockUserData(name: string, email: string) {
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
  getUsers(filterValue: string = '') {
    const storedUsers = localStorage.getItem('users');
    
    if (!storedUsers) {
      this.usersApiService.getUsers().subscribe((e) => {
        const filteredUsers = e.filter(usr => 
          usr.name.toLowerCase().includes(filterValue.toLowerCase())
        );
       
        this.users$.next(filteredUsers);
        localStorage.setItem('users', JSON.stringify(e));
      });
      this.usersApiService.printLog();
      
    } else {
      const users = JSON.parse(storedUsers);

      const filteredUsers = users.filter((user: { name: string; }) => 
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
      this.users$.next(filteredUsers);
    }
    return this.users$.asObservable()
  }

  newUser(result: any) {
    this.users$.value.push(this.mockUserData(result.name, result.email));
    localStorage.setItem('users', JSON.stringify(this.users$.value));
  } 
  getUsersMet(): User[] {
    return this.users$.getValue();
  }

  getUserById(userId: any) {
    return this.users$.value.find((x) => x.id === userId);
  }

  deleteUser(userId: number) {
    const filtredUsers = [
      ...this.users$.value.filter((user) => user.id !== userId),
    ];
    this.users$.next(filtredUsers);
    localStorage.setItem('users', JSON.stringify(filtredUsers));
  }

  editUser(updatedUser: any): void {
    const usersArr = this.getUsersMet();
    const index = this.users$.value.findIndex((e) => e.id === updatedUser.id);
    console.log(updatedUser)
    if (index !== -1) {
      
      usersArr[index] = updatedUser;
      this.users$.next(usersArr);
      localStorage.setItem('users', JSON.stringify(usersArr));
  
    }
  }
}

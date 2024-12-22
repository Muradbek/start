import { Injectable } from "@angular/core";
import { User } from "./users-api.service";
import { Subject } from "rxjs";

@Injectable()
export class UsersService {

    private usersSubject = new Subject<User[]>();

    // Поток пользователей
    users$ = this.usersSubject.asObservable();
    
    users: User[] = [];

    addUser(user: User) : void {
        this.users = [...this.users, user];
        this.updateLocalStorage(this.users);
    }

    deleteUser(userId: number) : void {
        this.users = this.users.filter(user => user.id !== userId);
        this.updateLocalStorage(this.users);
    }
    

    editUser(user: User) : void {
        this.users = [...this.users.map( userItem => {
            if (user.id === userItem.id) {
                return user;
            }
            return userItem;
        })];
        this.updateLocalStorage(this.users);
    }

    updateLocalStorage(user: User[]) : void {
        localStorage.setItem('users', JSON.stringify(user));
    }
}
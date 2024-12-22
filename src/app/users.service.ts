import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "./users-api.service";

@Injectable()
export class UsersService {
    public usersSubject = new Subject<User[]>();

    // Поток пользователей
    users$ = this.usersSubject.asObservable();

    public users: User[] = [];

    constructor() {
        // Пытаемся загрузить пользователей из localStorage, если они есть
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
            this.usersSubject.next(this.users); // Эмитируем начальное значение
        }
    }

    addUser(user: User): void {
        this.users = [...this.users, user];
        this.updateLocalStorage(this.users);
        this.usersSubject.next(this.users); // Эмитируем новое состояние
    }

    deleteUser(userId: number): void {
        this.users = this.users.filter(user => user.id !== userId);
        this.updateLocalStorage(this.users);
        this.usersSubject.next(this.users); // Эмитируем новое состояние
    }

    editUser(user: User): void {
        this.users = this.users.map(userItem => {
            if (user.id === userItem.id) {
                return user;
            }
            return userItem;
        });
        this.updateLocalStorage(this.users);
        this.usersSubject.next(this.users); // Эмитируем новое состояние
    }

    public updateLocalStorage(users: User[]): void {
        localStorage.setItem('users', JSON.stringify(users));
    }
}

import {ChangeDetectorRef, inject, Injectable} from "@angular/core";
import {User} from "./users-api.service";
import {BehaviorSubject, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable()
export class UsersService {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  addUser(user: User) {
    this.users$.next([user, ...this.users$.value])
  }

  deleteUser(userId: number) {
    this.users$.next([...this.users$.value.filter(user => user.id !== userId)])
  }

  editUser(user: User) {
    this.users$.next([...this.users$.value.map( userItem => {
      if(user.id === userItem.id) {
        return user;
      }
      return userItem;
    })]);
  }

  updateLocalStorage() {
    this.users$.pipe(
      takeUntilDestroyed(),
      tap( users => localStorage.setItem('users', JSON.stringify(users)))
    ).subscribe()
  }
}

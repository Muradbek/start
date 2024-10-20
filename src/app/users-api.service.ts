import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface User {
  name: string;
  id: number,
  email?: string,
  phone?: string,
  username?: string,
  website?: string,
}

@Injectable()
export class UsersApiService {

  private http = inject(HttpClient);

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>('https://jsonplaceholder.typicode.com/users');
  }

  deleteUsers(): void {}
}

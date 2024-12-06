import { inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { UsersService } from "./users.service";

export interface User {
    address: string;
    company: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
}

@Injectable()
export class UsersApiService {
   // private usersService = inject(UsersService)
    public printLog():void{
        console.log('Alif-service');
    }

    private http: HttpClient = inject(HttpClient); 

    getUsers(): Observable<Array<User>> {
        return this.http.get<Array<User>>('https://jsonplaceholder.typicode.com/users');
    }

    

}
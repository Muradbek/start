import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path:"users", component: UserListComponent
    },
    {
        path:"http://localhost:4200/", component:AppComponent
    }

];

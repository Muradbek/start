import { Routes } from '@angular/router';
import { UsersListComponent } from "./users-list/users-list.component";

export const routes: Routes = [
  {
    path: '**',
    redirectTo: 'users'
  },
  {
    path: 'users',
    component: UsersListComponent,
  }
];

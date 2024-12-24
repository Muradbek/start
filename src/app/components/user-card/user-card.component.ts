import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../services/users-api.service';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import {  MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    MatChipSet,
    MatChip,
    MatButtonModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user: User | null = null;
  @Input() userMail: string | null = null;
  @Output() deleteUserEvent = new EventEmitter<any>();
  @Output() updateUserEvent = new EventEmitter<any>();

  deleteUser(id: any): void {
    this.deleteUserEvent.emit(id);
  }
  updateUser(): void {
    this.updateUserEvent.emit(this.user);
  }

  constructor() {}
}

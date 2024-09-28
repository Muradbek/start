import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Users } from '../../data/interfaces/users.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: Users;
  @Output() deleteUser = new EventEmitter<number>();

  onDelete() {
    this.deleteUser.emit(this.user.id);
  }
}

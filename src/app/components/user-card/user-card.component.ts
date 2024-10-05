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
  @Output() editUser = new EventEmitter<Users>();

  onDelete() {
    this.deleteUser.emit(this.user.id);
  }

  onEdit() {
    this.editUser.emit(this.user);
    // console.log("🚀 ~ UserCardComponent ~ onEdit ~ this.user:", this.user)
  }
}

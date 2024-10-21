import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../data/interfaces/users.interface';
import { MaterialModule } from '../../Material.module';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})

export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<User>();

  onDelete() {
    this.deleteUser.emit(this.user.id);
  }

  onEdit() {
    this.editUser.emit(this.user);
  }
}

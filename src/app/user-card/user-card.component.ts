import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { User } from '../users-api.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user: User | null = null;
  @Output() delete = new EventEmitter<number>(); // Событие удаления
  @Output() editUser = new EventEmitter();

  public onDelete() {
    if (this.user) {
      this.delete.emit(this.user.id); // Отправляем ID пользователя
    }
  }

  public onEditUser() {
    this.editUser.emit();
  }
}


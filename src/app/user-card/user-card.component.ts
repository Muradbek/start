import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../users-api.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserCardComponent {
  @Input() user: User | null = null;

  @Output() deleteUser = new EventEmitter();
  @Output() editUser = new EventEmitter();

  public onDeleteUser(): void {
    this.deleteUser.emit();
  }
  public onEditUser(): void {
    this.editUser.emit();
  }
}

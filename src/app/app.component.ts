import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MaterialModule } from './Material.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    UsersListComponent, 
    RouterModule, 
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}

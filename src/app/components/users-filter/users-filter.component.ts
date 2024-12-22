import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsersFilterComponent),
      multi: true,
    },
  ],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements ControlValueAccessor {
  filterControl = new FormControl('');

  private onChange: (value: string) => void;
  private onTouched: () => void;

  writeValue(value: string): void {
    this.filterControl.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.filterControl.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onBlur(): void {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}

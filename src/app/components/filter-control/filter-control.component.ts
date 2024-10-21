import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../Material.module';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-control',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterControlComponent),
      multi: true,
    }
  ],
  templateUrl: './filter-control.component.html',
  styleUrl: './filter-control.component.scss'
})
export class FilterControlComponent implements ControlValueAccessor, OnInit{
  filterControl = new FormControl('');

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    this.subscribeToValueChanges()
  }

  writeValue(value: any): void {
    this.filterControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private subscribeToValueChanges(): void {
    this.filterControl.valueChanges.pipe(debounceTime(300))
      .subscribe(value => {
        this.onChange(value);
      });
  }
}

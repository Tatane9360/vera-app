import { Component, forwardRef, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="w-full">
      @if (label()) {
        <label [for]="id()" class="block text-sm font-medium text-gray-300 mb-1">{{ label() }}</label>
      }
      <div class="relative">
        <input
          [id]="id()"
          [type]="inputType()"
          [placeholder]="placeholder()"
          [value]="value()"
          (input)="onInput($event)"
          (blur)="onTouched()"
          [disabled]="disabled()"
          class="appearance-none block w-full px-4 py-3 border border-transparent bg-[#333333] placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vera-green focus:border-transparent sm:text-sm"
          [ngClass]="{'pr-10': type() === 'password'}"
        />
        @if (type() === 'password') {
          <button
            type="button"
            (click)="togglePasswordVisibility()"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
          >
            <app-icon [icon]="showPassword() ? 'eyeOff' : 'eye'"></app-icon>
          </button>
        }
      </div>
      @if (error()) {
        <div class="text-red-400 text-xs mt-1">
          {{ error() }}
        </div>
      }
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('');
  type = input('text');
  id = input('');
  error = input<string | null>(null);

  value = signal('');
  disabled = signal(false);
  showPassword = signal(false);

  inputType = computed(() => {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  onChange: (value: string) => void = () => {}; 
  onTouched: () => void = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }
}

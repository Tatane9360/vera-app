import {
  Component,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-[#1E1E1E] rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition-colors"
    >
      <h3 class="text-gray-400 text-xs md:text-sm font-medium mb-3 md:mb-4">
        {{ title() }}
      </h3>

      <div class="flex items-end justify-between">
        <div>
          <div class="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
            {{ value() }}
          </div>
          <div
            class="flex items-center gap-1 text-vera-green text-xs md:text-sm font-medium"
          >
            <span class="material-icons-outlined text-sm md:text-base"
              >north_east</span
            >
            <span>{{ percentage() }}%</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StatCardComponent {
  title = input.required<string>();
  value = input.required<string>();
  percentage = input.required<number>();
  data = input<number[]>([]);
}

import {
  Component,
  computed,
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

        <div class="w-20 h-10 md:w-24 md:h-12 text-vera-green">
          <!-- Simple Sparkline SVG -->
          <svg viewBox="0 0 100 50" class="w-full h-full overflow-visible">
            <path
              [attr.d]="sparklinePath()"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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

  sparklinePath = computed(() => {
    const data = this.data();
    if (!data || data.length === 0) {
      return 'M0 40 Q 20 40, 30 30 T 60 20 T 100 5'; 
    }

    const width = 100;
    const height = 50;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height * 0.8 - 5;
      return `${x},${y}`;
    });

    // Simple line connecting points
    return `M ${points.join(' L ')}`;
  });
}

import { Component, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg h-full flex flex-col border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h3 class="font-display font-bold text-lg mb-6 text-primary dark:text-vera-cream border-b border-gray-100 dark:border-gray-700 pb-4 min-h-[4rem] flex items-center leading-tight">{{ title() }}</h3>
      <div class="flex-grow flex items-center justify-center relative min-h-[250px]">
        <canvas baseChart
          [data]="chartData"
          [type]="'line'"
          [options]="chartOptions"
        >
        </canvas>
      </div>
    </div>
  `,
  styles: []
})
export class AnalyticsChartComponent {
  title = input('');
  labels = input<string[]>([]);
  data = input<number[]>([]);
  label = input('');
  color = input('#DBF9BE'); // Default vera-green

  public chartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        tension: 0.4 // Smooth curves
      },
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  constructor() {
    effect(() => {
      const currentLabels = this.labels();
      const currentData = this.data();
      const currentLabel = this.label();
      const currentColor = this.color();

      if (currentLabels && currentData) {
        this.updateChart(currentLabels, currentData, currentLabel, currentColor);
      }
    });
  }

  updateChart(labels: string[], data: number[], label: string, color: string) {
    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: label,
          borderColor: color,
          backgroundColor: color + '20', // Transparent fill
          fill: true,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }
      ]
    };
  }
}

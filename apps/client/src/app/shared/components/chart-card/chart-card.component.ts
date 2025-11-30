import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h3 class="font-bold text-lg mb-4 text-gray-800 border-b pb-2 min-h-[3.5rem] flex items-center">{{ title }}</h3>
      <div class="flex-grow flex items-center justify-center relative min-h-[250px]">
        <canvas baseChart
          [data]="chartData"
          [type]="chartType"
          [options]="chartOptions"
        >
        </canvas>
      </div>
    </div>
  `,
  styles: []
})
export class ChartCardComponent implements OnChanges {
  @Input() title = '';
  @Input() data: Record<string, number> = {};

  public chartType: ChartType = 'doughnut';
  public chartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FEF2E4', // vera-cream
          '#DBF9BE', // vera-green
          '#FFDEE0', // vera-pink
          '#B4D2FF', // vera-blue
          '#E2E8F0', // slate-200 (fallback)
          '#FED7AA', // orange-200 (fallback)
          '#BBF7D0', // green-200 (fallback)
        ],
        hoverBackgroundColor: [
          '#FDE6D0',
          '#C8F2A0',
          '#FFC0C4',
          '#96C0FF',
          '#CBD5E1',
          '#FDBA74',
          '#86EFAC',
        ],
        hoverBorderColor: '#ffffff',
      }
    ]
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4
      }
    },
    layout: {
      padding: 10
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  updateChart() {
    const labels = Object.keys(this.data);
    const values = Object.values(this.data);

    this.chartData = {
      ...this.chartData,
      labels: labels,
      datasets: [{
        ...this.chartData.datasets[0],
        data: values
      }]
    };
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metric-card">
      <h3>{{ title }}</h3>
      <div class="value">{{ value | number:'1.0-1' }}{{ unit }}</div>
      <div class="progress-bar">
        <div 
          class="progress" 
          [style.width.%]="value"
          [style.background-color]="getColor(value)">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .metric-card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    .value {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .progress-bar {
      background: #eee;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
    }
    .progress {
      height: 100%;
      transition: width 0.3s ease;
    }
  `]
})
export class MetricCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() unit: string = '';

  getColor(value: number): string {
    if (value < 60) return '#4caf50';
    if (value < 80) return '#ff9800';
    return '#f44336';
  }
}
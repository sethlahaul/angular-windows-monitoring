import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { MetricCardComponent } from './app/components/metric-card.component';
import { MetricsService } from './app/services/metrics.service';
import { SystemMetrics } from './app/models/system-metrics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MetricCardComponent],
  template: `
    <div class="dashboard">
      <h1>System Metrics Dashboard</h1>
      <div class="metrics-grid">
        <app-metric-card
          title="CPU Usage"
          [value]="metrics?.cpuUsage || 0"
          unit="%">
        </app-metric-card>
        <app-metric-card
          title="Memory Usage"
          [value]="metrics?.memoryUsage || 0"
          unit="%">
        </app-metric-card>
        <app-metric-card
          title="Disk Usage"
          [value]="metrics?.diskUsage || 0"
          unit="%">
        </app-metric-card>
        <app-metric-card
          title="Network Speed"
          [value]="metrics?.networkSpeed || 0"
          unit=" Mbps">
        </app-metric-card>
      </div>
      <div class="update-time" *ngIf="metrics">
        Last updated: {{ metrics.timestamp | date:'medium' }}
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    h1 {
      color: #333;
      margin-bottom: 2rem;
      text-align: center;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .update-time {
      text-align: center;
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class App implements OnInit, OnDestroy {
  metrics?: SystemMetrics;
  private subscription?: Subscription;

  constructor(private metricsService: MetricsService) {}

  ngOnInit() {
    this.subscription = this.metricsService.getMetrics()
      .subscribe(metrics => this.metrics = metrics);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

bootstrapApplication(App, {
  providers: [MetricsService]
});
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { SystemMetrics, MetricHistory } from '../models/system-metrics';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private history: SystemMetrics[] = [];
  private maxHistoryLength = 10;

  getMetrics(): Observable<SystemMetrics> {
    return interval(2000).pipe(
      map(() => this.generateMockMetrics())
    );
  }

  private generateMockMetrics(): SystemMetrics {
    const metrics = {
      cpuUsage: Math.random() * 100,
      memoryUsage: 40 + Math.random() * 40,
      diskUsage: 50 + Math.random() * 30,
      networkSpeed: Math.random() * 1000,
      timestamp: new Date()
    };

    this.history.push(metrics);
    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    }

    return metrics;
  }

  getHistory(metric: keyof SystemMetrics): MetricHistory {
    return {
      labels: this.history.map(h => h.timestamp.toLocaleTimeString()),
      values: this.history.map(h => h[metric] as number)
    };
  }
}
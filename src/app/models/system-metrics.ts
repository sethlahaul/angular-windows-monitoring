export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkSpeed: number;
  timestamp: Date;
}

export interface MetricHistory {
  labels: string[];
  values: number[];
}
export interface IAnalyticsData {
  labels: string[];
  datasets: {
    activeUsers: number[];
    pageViews: number[];
    sessions: number[];
  };
}

export interface IAnalyticsResponse {
  rows?: Array<{
    dimensionValues: Array<{ value: string }>;
    metricValues: Array<{ value: string }>;
  }>;
}

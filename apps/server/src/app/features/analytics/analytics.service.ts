import { Injectable } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { IAnalyticsData, IAnalyticsResponse } from '@compet-website/shared-types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnalyticsService {
  private analyticsDataClient: BetaAnalyticsDataClient;
  private propertyId: string | undefined;

  constructor(private configService: ConfigService) {
    this.analyticsDataClient = new BetaAnalyticsDataClient();
    this.propertyId = this.configService.get<string>('GA_PROPERTY_ID');
  }

  async getBasicStats(startDate = '7daysAgo', endDate = 'today'): Promise<IAnalyticsData> {
    if (!this.propertyId) {
      throw new Error('GA_PROPERTY_ID is not configured');
    }

    try {
      const [response] = await this.analyticsDataClient.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: startDate,
            endDate: endDate,
          },
        ],
        dimensions: [
          {
            name: 'date',
          },
        ],
        metrics: [
          {
            name: 'activeUsers',
          },
          {
            name: 'screenPageViews',
          },
          {
            name: 'sessions',
          },
        ],
      });

      return this.processReport(response as IAnalyticsResponse);
    } catch (error) {
      console.error('GA Error:', error);
      throw error;
    }
  }

  private processReport(response: IAnalyticsResponse): IAnalyticsData {
    const labels: string[] = [];
    const activeUsers: number[] = [];
    const pageViews: number[] = [];
    const sessions: number[] = [];

    response.rows?.forEach((row) => {
      const dateStr = row.dimensionValues[0].value;
      const formattedDate = `${dateStr.substring(6, 8)}/${dateStr.substring(4, 6)}`;
      
      labels.push(formattedDate);
      activeUsers.push(Number(row.metricValues[0].value));
      pageViews.push(Number(row.metricValues[1].value));
      sessions.push(Number(row.metricValues[2].value));
    });

    return {
      labels,
      datasets: {
        activeUsers,
        pageViews,
        sessions
      }
    };
  }
}

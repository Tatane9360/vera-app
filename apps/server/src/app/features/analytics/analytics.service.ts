import { Injectable } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import {
  IAnalyticsData,
  IAnalyticsResponse,
} from '@compet-website/shared-types';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class AnalyticsService {
  private analyticsDataClient: BetaAnalyticsDataClient;
  private propertyId: string | undefined;

  constructor(private configService: ConfigService) {
    const googleCredentialsJson = this.configService.get<string>(
      'GOOGLE_CREDENTIALS_JSON'
    );
    let authOptions: any = {};

    if (googleCredentialsJson) {
      try {
        authOptions.credentials = JSON.parse(googleCredentialsJson);
      } catch (e) {
        console.error('Failed to parse GOOGLE_CREDENTIALS_JSON', e);
      }
    } else {
      // Fallback to local file for development
      authOptions.keyFilename = path.join(
        process.cwd(),
        'apps/server/google-credentials.json'
      );
    }

    this.analyticsDataClient = new BetaAnalyticsDataClient(authOptions);
    this.propertyId = this.configService.get<string>('GA_PROPERTY_ID');
  }

  async getBasicStats(
    startDate = '7daysAgo',
    endDate = 'today'
  ): Promise<IAnalyticsData> {
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
        orderBys: [
          {
            dimension: {
              orderType: 'ALPHANUMERIC',
              dimensionName: 'date',
            },
          },
        ],
      });

      // Fetch Geo Data
      const [geoResponse] = await this.analyticsDataClient.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: startDate,
            endDate: endDate,
          },
        ],
        dimensions: [
          {
            name: 'country',
          },
        ],
        metrics: [
          {
            name: 'activeUsers',
          },
        ],
      });

      const basicStats = this.processReport(response as IAnalyticsResponse);

      // Process Geo Data
      const geoData =
        geoResponse.rows
          ?.map((row) => {
            const country = row.dimensionValues?.[0]?.value || 'Non défini';
            return {
              country: country === '(not set)' ? 'Non défini' : country,
              activeUsers: Number(row.metricValues?.[0]?.value || 0),
            };
          })
          .sort((a, b) => b.activeUsers - a.activeUsers) || [];

      return {
        ...basicStats,
        geoData,
      };
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
      const formattedDate = `${dateStr.substring(6, 8)}/${dateStr.substring(
        4,
        6
      )}`;

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
        sessions,
      },
    };
  }
}

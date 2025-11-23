import { Injectable } from '@nestjs/common';
import { IApiResponse, IUser, IStats } from '@compet-website/shared-types';

@Injectable()
export class AppService {
  getData(): IApiResponse {
    const users: IUser[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ];

    const stats: IStats = {
      totalUsers: users.length,
      activeUsers: 2,
      serverUptime: '24h 32m',
    };

    return {
      message: '✅ Connexion établie avec le serveur NestJS!',
      timestamp: new Date().toISOString(),
      data: {
        users,
        stats,
      },
    };
  }
}

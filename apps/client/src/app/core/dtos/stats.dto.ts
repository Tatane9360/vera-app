import { IStats } from '@compet-website/shared-types';

export class StatsDto implements IStats {
  totalUsers: number;
  activeUsers: number;
  serverUptime: string;

  constructor(data: IStats) {
    this.totalUsers = data.totalUsers;
    this.activeUsers = data.activeUsers;
    this.serverUptime = data.serverUptime;
  }

  getActiveUserPercentage(): number {
    return this.totalUsers > 0 ? (this.activeUsers / this.totalUsers) * 100 : 0;
  }
}

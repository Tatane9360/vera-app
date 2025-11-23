import { IUser } from '../interfaces/user.interface';
import { IStats } from '../interfaces/stats.interface';
import { IApiData } from '../interfaces/api.interface';

export class ApiDataDto implements IApiData {
  users: IUser[];
  stats: IStats;

  constructor(users: IUser[], stats: IStats) {
    this.users = users;
    this.stats = stats;
  }
}

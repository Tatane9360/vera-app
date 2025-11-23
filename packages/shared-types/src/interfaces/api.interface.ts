import { IUser } from './user.interface';
import { IStats } from './stats.interface';

export interface IApiData {
  users: IUser[];
  stats: IStats;
}

export interface IApiResponse {
  message: string;
  timestamp: string;
  data: IApiData;
}

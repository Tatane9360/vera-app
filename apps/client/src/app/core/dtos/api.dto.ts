import { UserDto } from './user.dto';
import { StatsDto } from './stats.dto';
import { IApiResponse, IApiData } from '@compet-website/shared-types';

export class ApiResponseDto implements IApiResponse {
  message: string;
  timestamp: string;
  data: ApiDataDto;

  constructor(data: IApiResponse) {
    this.message = data.message;
    this.timestamp = data.timestamp;
    this.data = new ApiDataDto(data.data);
  }
}

export class ApiDataDto implements IApiData {
  users: UserDto[];
  stats: StatsDto;

  constructor(data: IApiData) {
    this.users = data.users.map((user) => new UserDto(user));
    this.stats = new StatsDto(data.stats);
  }
}

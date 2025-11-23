import { IApiResponse } from '../interfaces/api.interface';
import { IApiData } from '../interfaces/api.interface';

export class ApiResponseDto implements IApiResponse {
  message: string;
  timestamp: string;
  data: IApiData;

  constructor(message: string, data: IApiData) {
    this.message = message;
    this.timestamp = new Date().toISOString();
    this.data = data;
  }
}

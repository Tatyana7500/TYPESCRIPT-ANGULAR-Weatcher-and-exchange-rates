import { Injectable } from '@nestjs/common';
import {ApiConfigService} from "../config/api-config.service";

@Injectable()
export class ExchangeRatesService {
  constructor(private apiConfigService: ApiConfigService) {
  }

  getHello(): string {
    return this.apiConfigService.exchangeRatesUrl;
  }
}

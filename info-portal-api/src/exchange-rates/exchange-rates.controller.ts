import { Controller, Get } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';

@Controller()
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  getHello(): string {
    return this.exchangeRatesService.getHello();
  }
}

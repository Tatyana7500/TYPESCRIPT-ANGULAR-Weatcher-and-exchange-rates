import { Module } from '@nestjs/common';
import { ExchangeRatesController } from './exchange-rates/exchange-rates.controller';
import { ExchangeRatesService } from './exchange-rates/exchange-rates.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import {ApiConfigService} from "./config/api-config.service";

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [ExchangeRatesController],
  providers: [
    ExchangeRatesService,
    ApiConfigService,
  ],
})
export class AppModule {}

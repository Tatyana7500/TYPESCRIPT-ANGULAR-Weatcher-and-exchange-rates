import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) {
    }

    get exchangeRatesUrl(): string {
        return this.configService.get('EXCHANGE_RATES_URL');
    }
}

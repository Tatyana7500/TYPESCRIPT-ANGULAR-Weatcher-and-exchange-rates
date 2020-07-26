export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    exchangeRatesApiUrl: process.env.EXCHANGE_RATES_URL,
});

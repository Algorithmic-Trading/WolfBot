import * as utils from "@ekliptor/apputils";
const logger = utils.logger
    , nconf = utils.nconf;
import {MarketOrder, Ticker, Trade, TradeHistory, Currency} from "@ekliptor/bit-models";
import {CcxtExchange} from "./CcxtExchange";
import {ExOptions, OpenOrders, OrderParameters} from "./AbstractExchange";
import * as ccxt from "ccxt";
import {OrderResult} from "../structs/OrderResult";


export default class KrakenCcxt extends CcxtExchange {
    constructor(options: ExOptions) {
        super(options);
        this.exchangeLabel = Currency.Exchange.KRAKEN;
        this.minTradingValue = 0.001;
        this.fee = 0.0026; // https://www.kraken.com/en-us/features/fee-schedule
        this.currencies.setSwitchCurrencyPair(true);
        let opts = this.getExchangeConfig();
        opts.enableRateLimit = true;
        //opts.fetchMinOrderAmounts = true; https://github.com/ccxt/ccxt/issues/6700
        this.apiClient = new ccxt.kraken(opts);
        this.apiClient.loadMarkets().then(() => {
            this.onExchangeReady();
        }).catch((err) => {
            logger.error("Error loading %s markets", this.className, err);
        });
    }

    // ################################################################
    // ###################### PRIVATE FUNCTIONS #######################

}

import { ServerRespond } from './DataStreamer';

export interface Row {

  price_abc: number
  price_def:number
  ratio: number
  trigger_alert: number | undefined ,
  upp_bound: number,
  low_bound: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = priceABC / priceDEF;
    const up_bound = 1 + 0.01;
    const lw_bound = 1 - 0.01;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upp_bound: up_bound,
      low_bound: lw_bound,
      trigger_alert: (ratio > up_bound || ratio < lw_bound ) ? ratio : undefined,

      };
  }
}
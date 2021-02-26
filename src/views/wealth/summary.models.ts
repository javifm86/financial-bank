import { PointOptionsObject } from 'highcharts';

export interface ProductDistribution {
  name: string;
  value: string;
  percentage: string;
}

interface OperatingLimitItem {
  name: string;
  value: string;
}

export interface OperatingLimitSummary {
  exchange: OperatingLimitItem;
  cfds: OperatingLimitItem;
  derivatives: OperatingLimitItem;
  forex: OperatingLimitItem;
  funds: OperatingLimitItem;
  plans: OperatingLimitItem;
  transfers: OperatingLimitItem;
}

export interface CustomPointOptionsObject extends PointOptionsObject {
  patrimonio: number;
  currency: string;
}

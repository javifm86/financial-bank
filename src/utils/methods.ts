type DateTimeStyle = 'full' | 'long' | 'medium' | 'short';

interface DateOptions {
  dateStyle?: DateTimeStyle;
  timeStyle?: DateTimeStyle;
}

interface FormatDateOptions {
  dateStyle: DateTimeStyle;
  timeStyle?: DateTimeStyle;
  hour12: boolean;
}

export interface Methods {
  formatCurrency(num: number, currency: string, decimals?: number): string;
  formatNumber(num: number, decimals?: number): string;
  formatPercent(num: number, decimals?: number): string;
  formatDate(str: string | number, options?: DateOptions): string;
}

class GlobalMethods implements Methods {
  formatCurrency(num: number, currency: string, decimals = 2) {
    const precision = Math.pow(10, decimals);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    }).format(num / precision);
  }
  formatNumber(num: number, decimals = 2) {
    const precision = Math.pow(10, decimals);
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    }).format(num / precision);
  }
  formatPercent(num: number, decimals = 2) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    }).format(num / 100);
  }
  formatDate(input: string | number, options?: DateOptions) {
    const dateStyle: DateTimeStyle = options != null && options.dateStyle != null ? options.dateStyle : 'medium';
    const optionsDate: FormatDateOptions = {
      dateStyle: dateStyle,
      hour12: false
    };
    if (options != null && options.timeStyle != null) {
      optionsDate.timeStyle = options.timeStyle;
    }
    // return new Date(str).toLocaleTimeString('en-US');
    // @ts-ignore
    return new Intl.DateTimeFormat('en-US', optionsDate).format(new Date(input));
  }
}

export default new GlobalMethods();

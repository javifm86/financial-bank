export interface Methods {
  formatCurrency(num: number, currency: string, decimals?: number): string;
  formatNumber(num: number, decimals?: number): string;
  formatPercent(num: number, decimals?: number): string;
  formatDate(str: string): string;
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
  formatDate(str: string) {
    // return new Date(str).toLocaleTimeString('en-US');
    // @ts-ignore
    return new Intl.DateTimeFormat('en-US', { timeStyle: 'short', dateStyle: 'medium', hour12: false }).format(
      new Date(str)
    );
  }
}

export default new GlobalMethods();

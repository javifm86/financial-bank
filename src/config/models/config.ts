interface Api {
  readonly baseUrl: string;
  readonly timeout: number;
}

export interface Config {
  api: Api;
}

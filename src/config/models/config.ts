interface Api {
  baseUrl: string;
  timeout: number;
}

export interface Config {
  api: Api;
}

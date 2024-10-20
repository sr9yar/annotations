import { InjectionToken } from "@angular/core";

export interface ApiConfig {
  url: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('api.config');

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: 'http://localhost:3000',
};

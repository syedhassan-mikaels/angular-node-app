import { environment } from '../../environments/environment';
import { InjectionToken } from '@angular/core';

export const APP_CONFIG_TOKEN = new InjectionToken('app-setting.config');

export const AppSetting = {
  title: 'Product Demo',
  apiUrl: environment.apiUrl
};

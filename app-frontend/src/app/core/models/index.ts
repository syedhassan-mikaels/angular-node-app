export * from './product';

export interface IHttpResponse {
  status: boolean;
  data: any[] | Object;
  message?: string;
}

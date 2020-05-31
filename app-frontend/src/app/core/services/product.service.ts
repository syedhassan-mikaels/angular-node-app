import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IProduct } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  save(data: IProduct) {
    // if (data.course.id) {
    //   return this.update(data);
    // }
    return this.apiService.post('product/save', data);
  }

  getProducts(params) {
    const paramsFilteredList = Object.keys(params)
      .filter((itemKey) => (params[itemKey] ? true : false))
      .map((itemKey) => ({ key: itemKey, value: params[itemKey] }));

    const querParams = {};
    paramsFilteredList.forEach(
      (item) => (querParams[item.key] = item.value)
    );

    return this.apiService.get('product/list', querParams);
  }
}

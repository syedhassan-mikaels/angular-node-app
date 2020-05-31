import { Routes } from '@angular/router';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: 'create',
    component: ProductItemComponent
  },
  {
    path: 'edit/:id',
    component: ProductItemComponent
  },
  {
    path: 'manage',
    component: ProductListComponent
  }
];

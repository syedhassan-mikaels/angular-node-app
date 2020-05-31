import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';

import { PRODUCT_ROUTES } from './product.route';

const MODULES = [RouterModule.forChild(PRODUCT_ROUTES), SharedModule];

const COMPONENTS = [ProductItemComponent, ProductListComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...MODULES],
})
export class ProductModule {}

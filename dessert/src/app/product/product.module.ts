import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDescriptionComponent } from './product-description/product-description.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }

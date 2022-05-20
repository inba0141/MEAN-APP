import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductprofileRoutingModule } from './productprofile-routing.module';
import { ProductprofileComponent } from './productprofile.component';


@NgModule({
  declarations: [
    ProductprofileComponent
  ],
  imports: [
    CommonModule,
    ProductprofileRoutingModule
  ]
})
export class ProductprofileModule { }

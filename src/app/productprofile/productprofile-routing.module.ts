import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductprofileComponent } from './productprofile.component';

const routes: Routes = [{ path: '', component: ProductprofileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductprofileRoutingModule { }

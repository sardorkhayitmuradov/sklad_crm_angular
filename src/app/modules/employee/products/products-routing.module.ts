import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddEditProductsComponent } from './add-edit-products/add-edit-products.component';
import { ProductsResolver } from './services/products.resolver';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'add',
    component: AddEditProductsComponent,
    data: {
      breadcrumbWithTranslate: 'actions.add',
    },
  },
  {
    path: 'edit/:id',
    component: AddEditProductsComponent,
    resolve: {
      data: ProductsResolver,
    },
    data: {
      breadcrumbWithTranslate: 'actions.edit',
    },
  },
  {
    path: 'product/:id',
    component: UpdateProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

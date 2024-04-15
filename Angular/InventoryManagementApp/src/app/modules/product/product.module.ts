import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from 'src/app/core/services/product/product.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    SharedModule,
  ],
  providers: [ProductService],
  exports: [ProductListComponent],
})
export class ProductModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductsGridComponent } from "./products-grid.component";
import { ProductsService } from "./products.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ProductsGridComponent
  ],
  exports: [
    ProductsGridComponent
  ],
  providers: [
    ProductsService
  ]
})

export class ProductsModule { }

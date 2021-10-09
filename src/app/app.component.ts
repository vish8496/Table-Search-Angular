import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProductsService } from "./products/products.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit,OnDestroy{
  title = "ir-dev-test";
  BrandList: string[]=[];
  ProductList: any;
  name = new FormControl('');
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private productService:ProductsService)
  {
    this.name.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(val => {
      setTimeout(() => {
        this.productService.product.next(val);
      }, 400);
      
    })
  }
  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }

  onChangeofSelect(brand:string)
  {
    this.productService.brand.next(brand);
  }

  onItemChangeofRadio(stock:string)
  {
    this.productService.stock.next(stock);
  }
  
  getProducts()
  {
    this.productService.getProducts().subscribe((data:any)=>
    {
   this.ProductList = data;
   this.getBrands();
    });
  }

  getBrands()
  {
   let data =  this.ProductList.filter((product, index, self) =>
    index === self.findIndex((t) => (
      t.brand === product.brand && t.brand === product.brand
    ))
  );

  data.forEach(product => {
    this.BrandList.push(product.brand);
  });
  }
}

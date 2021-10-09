import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductsService } from "./products.service";

@Component({
  selector: "products-table",
  templateUrl: "products-grid.component.html",
  styleUrls: [],
  providers: []
})
export class ProductsGridComponent implements OnInit, OnDestroy{

  Products: any[];
  ProductList: any[];
  BrandList:string[];
  brand:string;
  stock:string;
  search:string;
  constructor(private productService:ProductsService)
  {
    this.productService.brand.subscribe((brand:string)=>{
      this.brand = brand;
      this.searchProducts();
    });
    this.productService.stock.subscribe((stock:string)=>{
      this.stock = stock;
      this.searchProducts();
    });
    this.productService.product.subscribe((search:string)=>{
      this.search = search.toLowerCase();
      this.searchProducts();
    });
  }
  
  ngOnInit(): void {
   this.getProducts();
  }

  ngOnDestroy(): void {
    this.productService.brand.unsubscribe();
    this.productService.stock.unsubscribe();
    this.productService.product.unsubscribe();
  }

  getProducts()
  {
    this.productService.getProducts().subscribe((data:any)=>
    {
      this.ProductList = data;
      this.Products = data;
    });
  }

  searchProducts()
  {
    this.ProductList = this.Products;
    if(this.brand != null && this.brand != 'all')
    {
      this.ProductList = this.ProductList.filter(product=> product.brand == this.brand);
    }
    if(this.stock != null)
    {
      if(this.stock == 'in-stock')
      {
      this.ProductList = this.ProductList.filter(product=> product.quantity>0);
      }
      else if(this.stock == 'out-of-stock')
      {
        this.ProductList = this.ProductList.filter(product=> product.quantity<1);
      }
    }
    if(this.search != null && this.search.length>2)
    {
      this.ProductList = this.ProductList.filter(product=> product.name.toLowerCase().includes(this.search) || product.name.toLowerCase().includes(this.search) || product.name.includes(this.search));
    }
  }
  
}

import { Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductsService } from './products.service';
import { elementAt } from 'rxjs';
import { Product } from './product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'topsellerproducts';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['ID', 'productName', 'eCode', 'sku', 'salesRank'];
  datasource = new MatTableDataSource<Product>([]);
  formSearch = new FormGroup({
    productId: new FormControl('', Validators.required)
  });

  showSection: boolean = false

  isTopSellerProduct: boolean = true;

  productService = inject(ProductsService);

  constructor() {

    this.productService.getAllProducts().subscribe((listProducts: any) => {
      this.datasource = new MatTableDataSource<Product>(listProducts);
    });
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }

  isTopSeller() {
    if (this.formSearch.value.productId) {
      this.productService.getIsTopSeller(this.formSearch.value.productId).subscribe(
        result => {
          this.showSection = true;
          this.isTopSellerProduct = true;
          console.log(this.isTopSellerProduct);
        },
        error => {
          this.showSection = true;
          this.isTopSellerProduct = false;
          console.log(this.isTopSellerProduct);
        }
      );
    }
  }


}

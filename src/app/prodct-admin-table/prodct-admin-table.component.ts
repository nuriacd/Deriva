import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { DishModel } from '../models/dish.model';

@Component({
  selector: 'app-prodct-admin-table',
  templateUrl: './prodct-admin-table.component.html',
  styleUrl: './prodct-admin-table.component.css'
})
export class ProdctAdminTableComponent {
  productColumns:string[] = ['id', 'name', 'actions'];
  productSource!: MatTableDataSource<ProductModel>;
  @ViewChild('productPaginator') productPaginator!: MatPaginator;
  @ViewChild('productSort') productSort!: MatSort;

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const subscripcion = this._productService.getProducts().subscribe({
      next:(products) =>{
        this.productSource = new MatTableDataSource(products);
        this.productSource.sort = this.productSort;
        this.productSource.paginator = this.productPaginator;
      },
      complete: () => {
        subscripcion.unsubscribe()
      },
      error: console.log
    })

  }

  applyFilter(event: Event, table: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productSource.filter = filterValue.trim().toLowerCase();

    if (table == 'products' && this.productSource.paginator) 
    {
      this.productSource.paginator.firstPage();
    } 
  }

  isDish(object: any): boolean {
    return object instanceof DishModel;
  }

}

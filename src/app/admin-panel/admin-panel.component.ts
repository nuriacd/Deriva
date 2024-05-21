import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { DishModel } from '../models/dish.model';
import { DrinkModel } from '../models/drink.model';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  selectedTab = 'clients';

  clientColumns:string[] = ['id', 'email', 'phone', 'actions'];
  clientSource!: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator) clientPaginator!:MatPaginator;
  @ViewChild(MatSort) clientSort!: MatSort;

  employeeColumns:string[] = ['id', 'email', 'phone', 'restaurant', 'actions'];
  employeeSource!: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator) employeePaginator!:MatPaginator;
  @ViewChild(MatSort) employeeSort!: MatSort;

  productColumns:string[] = ['id', 'name', 'type', 'actions'];
  productSource!: MatTableDataSource<ProductModel>;
  @ViewChild(MatPaginator) productPaginator!:MatPaginator;
  @ViewChild(MatSort) productSort!: MatSort;
  
  constructor(
    private _userService: UserService,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadClients();
    this.loadEmployees();
    this.loadProducts();
  }

  loadClients(): void {
    const subscripcion = this._userService.getClients().subscribe({
      next:(clients) =>{
        this.clientSource = new MatTableDataSource(clients);
        this.clientSource.sort = this.clientSort;
        this.clientSource.paginator = this.clientPaginator;
      },
      complete: () => {
        subscripcion.unsubscribe()
      },
      error: console.log
    })
  }

  loadEmployees(): void {
    const subscripcion = this._userService.getEmployees().subscribe({
      next:(employees) =>{
        this.employeeSource = new MatTableDataSource(employees);
        this.employeeSource.sort = this.employeeSort;
        this.employeeSource.paginator = this.employeePaginator;
      },
      complete: () => {
        subscripcion.unsubscribe()
      },
      error: console.log
    })
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
    this.clientSource.filter = filterValue.trim().toLowerCase();

    if (table == 'clients' && this.clientSource.paginator) 
    {
      this.clientSource.paginator.firstPage();
    } 
    else if (table == 'employees' && this.employeeSource.paginator) 
    {
      this.employeeSource.paginator.firstPage();
    } 
    else if (table == 'products' && this.productSource.paginator) 
    {
      this.productSource.paginator.firstPage();
    } 
  }

  resetTable() {
    this.clientSource.filter = '';
    this.employeeSource.filter = '';
    this.productSource.filter = '';
  }

  openClientModal(client: any): void {
    // Aquí va tu código para abrir el modal de usuario
  }

  editClient(client: any): void {
    // Aquí va tu código para editar un usuario
  }

  deleteUser(user: any): void {
    // Aquí va tu código para eliminar un usuario
  }

}

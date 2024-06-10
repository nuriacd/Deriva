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
import { EmployeeModel } from '../models/employee.model';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  selectedTab = 'clients';

  constructor() { }


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

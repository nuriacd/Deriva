import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-employee-admin-table',
  templateUrl: './employee-admin-table.component.html',
  styleUrl: './employee-admin-table.component.css'
})
export class EmployeeAdminTableComponent {
  employeeColumns:string[] = ['id', 'email', 'phone', 'restaurant', 'actions'];
  employeeSource!: MatTableDataSource<EmployeeModel>;
  @ViewChild('employeePaginator') employeePaginator!: MatPaginator;
  @ViewChild('employeeSort') employeeSort!: MatSort;

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
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

  applyFilter(event: Event, table: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeSource.filter = filterValue.trim().toLowerCase();

    if (table == 'employees' && this.employeeSource.paginator) {
      this.employeeSource.paginator.firstPage();
    }
  }



}

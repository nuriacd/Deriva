import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-admin-table',
  templateUrl: './user-admin-table.component.html',
  styleUrl: './user-admin-table.component.css'
})
export class UserAdminTableComponent {
  clientColumns:string[] = ['id', 'email', 'phone', 'actions'];
  clientSource!: MatTableDataSource<UserModel>;
  @ViewChild('clientPaginator') clientPaginator!: MatPaginator;
  @ViewChild('clientSort') clientSort!: MatSort;

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadClients();
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

  applyFilter(event: Event, table: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientSource.filter = filterValue.trim().toLowerCase();

    if (table == 'clients' && this.clientSource.paginator) 
    {
      this.clientSource.paginator.firstPage();
    } 
  }
}

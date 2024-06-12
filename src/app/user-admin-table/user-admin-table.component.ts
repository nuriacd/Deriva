import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyDataComponent } from '../my-data/my-data.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../services/snack-bar.service';

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
    private _snackBar: SnackBarService,
    private _dialog: MatDialog,
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

  editUser(user?: UserModel) {
    let dialogRef;

    if (user) {
      let id = user.id;
      dialogRef = this._dialog.open(MyDataComponent, { data: { id: id, pwd: false, employee: false } });
    } else{
      dialogRef = this._dialog.open(MyDataComponent, { data: { pwd: false, employee: false } });

    }

    dialogRef.afterClosed().subscribe({   
      next: (val) => {
        if (val)
          this.loadClients();    
      }
    });
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        this._snackBar.openSnackBar("Usuario borrado")
        this.loadClients();
      },
      error: console.log
    })
  }
}

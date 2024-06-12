import { UserModel } from '../models/user.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EmployeeModel } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrl: './product-data.component.css'
})
export class ProductDataComponent {

  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<ProductDataComponent>,
    private _dialog: MatDialog, 

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}

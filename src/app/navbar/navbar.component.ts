import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { MyDataComponent } from '../my-data/my-data.component';
import * as jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor(
    private _cookieService: CookieService,
    private _authService: AuthService,
    private _dialog: MatDialog, 
    private _router: Router

  ) {}

  isLogged() {
    return this._cookieService.get("derivaUserToken") ? true: false;
  }

  isAdmin() {
    let admin = this._authService.hasRole("ROLE_ADMIN");

    return admin;
  }

  isEmployee() {
    let employee = this._authService.hasRole("ROLE_EMPLOYEE");
    let admin = this._authService.hasRole("ROLE_ADMIN");

    return employee || admin;
  }

  logOut() {
    this._cookieService.delete("derivaUserToken");

    if (sessionStorage.getItem("cart"))
      sessionStorage.removeItem("cart");

    if (sessionStorage.getItem("city"))
      sessionStorage.removeItem("city");

    if (sessionStorage.getItem("province"))
      sessionStorage.removeItem("province");

    if (sessionStorage.getItem("derivaRestaurant"))
      sessionStorage.removeItem("derivaRestaurant");

    this._router.navigate(['/home'])
  }

  showData() {
    let dialogRef;
    let token: any = jwt_decode.jwtDecode(this._cookieService.get('derivaUserToken'));
    let id = token.id;

    if(id)
      dialogRef = this._dialog.open(MyDataComponent, { data: { id: id } });
    else
      dialogRef = this._dialog.open(MyDataComponent);

  }
}

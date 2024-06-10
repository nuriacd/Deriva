import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { MyDataComponent } from '../my-data/my-data.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  pwdForm: FormGroup;

  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ChangePasswordComponent>,
    private _cookieService: CookieService,
    private _dialog: MatDialog, 

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pwdForm = this.formBuilder.group({
      previousPassword: ['', [Validators.required]],
      password: ['', [Validators.required, this.passwordComplexityValidator]],
      password2: ['', [Validators.required, this.passwordComplexityValidator]]
    }, {validator: this.checkPasswords});

  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const password2 = group.get('password2')?.value;
  
    return password === password2 ? null : { mustMatch: true };
  }

  passwordComplexityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) {
      return null;
    }
  
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%!?*.]/.test(password);
    const hasMinLength = password.length >= 8;
  
    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && hasMinLength;
  
    return isValid ? null : { 'complexity': true };
  }

  sendPwdForm() 
  {
    let token: any = jwt_decode.jwtDecode(this._cookieService.get('derivaUserToken'));
    let id = token.id;

    let current: string = this.pwdForm.value.current;
    let newPwd: string = this.pwdForm.value.password;
    let newPwd2: string = this.pwdForm.value.password2;

    const sub = this._userService.checkPassword(id, current).subscribe(
      {
        next: result => {
          if (result) 
          {
            this.changePwd(id, newPwd, newPwd2);
            this._dialogRef.close();
          }
          else 
          {
            console.log("contraseña incorrecta")
          }
        },
        complete: () => {
          sub.unsubscribe();
        },
        error: console.log
      });
  }
  
  changePwd(id: string, newPwd: string, newPwd2: string)
  {
    const sub = this._userService.changePassword(id, newPwd, newPwd2).subscribe(
      {
        next: result => {
          if (result) 
          {
            console.log("contraseña cambiada correctamente")
            this._dialogRef.close();
          }
        },
        complete: () => {
          sub.unsubscribe();
        },
        error: console.log
      });
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

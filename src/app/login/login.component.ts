import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;

  registerSubmitted = false;
  loginError: string | null = null;
  registerError: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private _userService: UserService,
    private _cookieService: CookieService,
    private _router: Router,
    private _authService: AuthService
  ) 
  { 
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[9867][0-9]{8}$')]],
      password: ['', [Validators.required, this.passwordComplexityValidator]],
      password2: ['', [Validators.required, this.passwordComplexityValidator]],
      terms: [false, Validators.requiredTrue]
    }, {validator: this.checkPasswords});

    this.loginForm = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', Validators.required]
    });
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

  onRegister(): void 
  {
    this.loginError = null;
    this.registerError = null;
    this.registerSubmitted = true;
    
    if (this.registerForm.valid) {
      let subscription = this._userService.createUser(this.registerForm.value).subscribe({
        next: response => {
          this._cookieService.set('derivaUserToken', response["token"]);
        },
        complete: () => {
          subscription.unsubscribe();
          this._router.navigate(['/menu/order']);
        },
        error: () => {
          this.registerError = "El email ya está en uso"
        }
      });
    } else {
      console.log(this.registerForm.errors);
    }
  }

  onLogin(): void 
  {
    this.registerSubmitted = false;
    this.registerError = null;
    this.loginError = null;

    if (this.loginForm.value.loginEmail == "" || this.loginForm.value.loginPassword == "") {
      this.loginError = "Debe rellenar los campos de email y contraseña";
    } else {
    if (this.loginForm.valid) {
      let subscription = this._userService.login(this.loginForm.value).subscribe({
        next: response => {
          this._cookieService.set('derivaUserToken', response["token"]);
        },
        complete: () => {
          this.loginError = null;
          subscription.unsubscribe();

          if (this._authService.hasRole("ROLE_EMPLOYEE") || this._authService.hasRole("ROLE_ADMIN")) {
            let tokenPayload: any = jwt_decode.jwtDecode(this._cookieService.get('derivaUserToken'));
            const id = tokenPayload.id;

            let subscription = this._userService.getUser(id).subscribe({
              next: (response: EmployeeModel) => {
                sessionStorage.setItem("derivaRestaurant", JSON.stringify(response.restaurant));
              },
              complete: () => {
                subscription.unsubscribe();
                this._router.navigate(['/home']);
              },
              error: console.log
            });
          } else {
            this._router.navigate(['/menu/order']);
          }

        },
        error: () => {
          this.loginError = "Credenciales incorrectas";
        }
      });
    } else {
      this.loginError = "Credenciales incorrectas";
    }
    }

  }
}
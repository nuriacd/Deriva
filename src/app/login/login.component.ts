import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private _userService: UserService,
    private _cookieService: CookieService
  ) 
  { 
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[9867][0-9]{8}$')]],
      password: ['', [Validators.required, Validators.pattern('/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/')]],
      password2: ['', [Validators.required, Validators.pattern('/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/')]]
    }, {
      validator: this.match('password', 'password2')
    });

    this.loginForm = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', Validators.required]
    });
  }

  private match(controlName: string, matchingControlName: string) 
  {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      
      if (matchingControl.errors && !matchingControl.errors["mustMatch"]) {
        return;
      }
      
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ "mustMatch": true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onRegister(): void 
  {
    if (this.registerForm.valid) {
      let subscription = this._userService.createUser(this.registerForm.value).subscribe({
        next: response => {
          console.log(response);
        },
        complete: () => {
          subscription.unsubscribe();
        },
        error: console.log
      });
    } else {
      console.log(this.registerForm.errors);
    }
  }

  onLogin(): void 
  {
    if (this.loginForm.valid) {
      let subscription = this._userService.login(this.loginForm.value).subscribe({
        next: response => {
          this._cookieService.set('derivaRestaurantToken', response["token"]);
        },
        complete: () => {
          subscription.unsubscribe();
        },
        error: console.log
      });
    }
  }
}
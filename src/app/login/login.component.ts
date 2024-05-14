import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

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
    private userService: UserService) 
    { 
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required]
      });
  
      this.loginForm = this.formBuilder.group({
        loginEmail: ['', [Validators.required, Validators.email]],
        loginPassword: ['', Validators.required]
      });
    }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe(
        response => {
          console.log(response);
          // Aquí puedes manejar la respuesta del servidor
        },
        error => {
          console.log(error);
          // Aquí puedes manejar los errores
        }
      );
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        response => {
          console.log(response);
          // Aquí puedes manejar la respuesta del servidor
        },
        error => {
          console.log(error);
          // Aquí puedes manejar los errores
        }
      );
    }
  }
}